package controllers

import (
	"net/http"
	"os"
	"golang.org/x/oauth2"
	"fmt"
	"time"
	"math/rand"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"errors"
	"github.com/gorilla/sessions"
	"encoding/json"
	reqcontext "github.com/gorilla/context"
)

var store = sessions.NewCookieStore([]byte(os.Getenv("G_SESSION")))

type EncryptToken struct {
	Key   string
	Token *oauth2.Token
}

//gloabl variable that will contain credentials, httpClient and credentials.
var (
	authClient AuthUser
	client SpotifyClient
	regularClient RegularClient

	Endpoint = oauth2.Endpoint{
		AuthURL: "https://accounts.spotify.com/authorize",
		TokenURL: "https://accounts.spotify.com/api/token",
	}
)

func setup() AuthUser {
	if client.Token != nil {
		fmt.Println("there is a client.Token")
		return AuthUser{}
	}

	id := os.Getenv("SPOTIFY_ID")
	secret := os.Getenv("SPOTIFY_SECRET")
	credentials := Credentials{id, secret}

	redirectURL := "http://localhost:8000/callback"
	scopes := []string{"user-read-private", "user-read-email", "user-library-read", "user-top-read", "streaming"}

	return AuthUser{
		config: &oauth2.Config{
			ClientID: credentials.Id,
			ClientSecret: credentials.Secret,
			Endpoint: Endpoint,
			RedirectURL: redirectURL,
			Scopes: scopes,
		},
	}
}

func createCookie(state string) http.Cookie {
	//expireCookie := time.Now().Add(time.Minute * 30)
	expireCookie := time.Now().AddDate(-1, -2, -3)

	return http.Cookie{Name: "Spotify_auth_state",
		Value: state,
		Expires: expireCookie,
		HttpOnly: true,
		MaxAge: -100,
	}
}

func RandomString(strlen int) string {
	rand.Seed(time.Now().UTC().UnixNano())
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	result := make([]byte, strlen)
	for i := 0; i < strlen; i++ {
		result[i] = chars[rand.Intn(len(chars))]
	}
	return string(result)
}

//sets up AuthUser struct which is our request to spotify accounts service in /authLogin:
func GetURL(authUser AuthUser) (string, string) {
	state := RandomString(30)

	//.AuthCodeURL generates the url the user visits to authorize access to our app:
	return authUser.config.AuthCodeURL(state), state
}

func (a *AuthUser) Token(state string, r *http.Request) (*oauth2.Token, error) {

	code := r.FormValue("code")
	if code == "" {
		err := errors.New("spotify: didn't get access code")
		return nil, err
	}

	if err := r.URL.Query().Get("error"); err != "" {
		err := errors.New("'error' query parameter sent back in SpotifyCallback")
		return nil, err
	}

	return a.config.Exchange(oauth2.NoContext, code)
}

//complete Auth process. Gets an *http.Client and sets on SpotifyClien.
func (a *AuthUser) FinalAuth(token *oauth2.Token) SpotifyClient {
	return SpotifyClient{
		http: a.config.Client(oauth2.NoContext, token),
		Token: token,
	}
}

//handler for /authLogin
func SpotifyAuthorization(w http.ResponseWriter, r *http.Request) {

	//setup the cookie:
	session, err := store.Get(r, "spotify_auth_state")
	if err != nil {
		common.DisplayAppError(w, err, "Error getting session in SpotifyAuthorization", 500)
		return
	}
	store.Options = &sessions.Options{
		MaxAge:     60 * 2,
	}

	//gets an AuthUser struct.
	authClient = setup()
	//uses AuthUser struct to get an auth url:
	url, state := GetURL(authClient)

	session.Values["state_key"] = state
	session.Save(r, w)

	if j, err := json.Marshal(AuthURI{Uri: url}); err != nil {
		fmt.Println("error in controllers.SpotifyAuthorization json.Marshal")
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}
}

//handler for /callback
func SpotifyCallback(w http.ResponseWriter, r *http.Request) {
	//check cookie:
	session, err := store.Get(r, "spotify_auth_state")
	if err != nil {
		common.DisplayAppError(w, err, "Error getting session in SpotifyCallback", 500)
		return
	}
	checkState := session.Values["state_key"]

	// get state query parameter and check it it matches cookie:
	state := r.FormValue("state")
	if (checkState == "" || checkState != state || state == "") {
		common.DisplayAppError(w, err, "Not valid Oauth state in SpotifyCallback. Browser identification issue.", 500)
		return
	}

	//will return a token
	token, err := authClient.Token(state, r)
	if err != nil {
		common.DisplayAppError(w, err, "Error getting token", http.StatusForbidden)
		return
	}

	client := authClient.FinalAuth(token)
	//clear state:
	session.Values["state_key"] = ""
	session.Save(r, w)

	encryptToken := common.EncryptToken{
		Key: RandomString(16),
		Token: client.Token,
	}

	user, err := client.GetCurrentProfile()
	if err != nil {
		common.DisplayAppError(w, err, "Error after User auth", 500)
		return
	}
	//check and register if new:
	err = spotifyUserStorage(user)
	if err != nil {
		common.DisplayAppError(w, err, "Error in spotifyUserStorage", 500)
		return
	}
	//store token in DB
	err = spotifyTokenStorage(encryptToken, user)
	if err != nil {
		common.DisplayAppError(w, err, "Error in spotifyTokenStorage", 500)
		return
	}

	//write cookie:
	cookie, err := encryptToken.GenerateSpotifyCookieToken(user.ID)
	if err != nil {
		common.DisplayAppError(w, err, "Error Generating spotify jwt token", 500)
		return
	}

	sessionToken, err := encryptToken.GenerateSpotifySessionToken(user.ID)
	if err != nil {
		common.DisplayAppError(w, err, "Error Generating spotify jwt token", 500)
		return
	}


	http.SetCookie(w, &cookie)
	queryURL := queryMaker(user, sessionToken)
	http.Redirect(w, r, queryURL, 302)
	//also clear the cookie.
}

func SpotifyGetKeys(w http.ResponseWriter, r *http.Request) {
	authClient = setup()
	token, err := pullToken(r)
	if err != nil {
		common.DisplayAppError(w,err,"error with pulling token, may need to re-auth",500)
		return
	}

	//have our SpotifyClient here:
	client := authClient.FinalAuth(token)

	var keys IncomingKeys

	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&keys)
		if err != nil {
			common.DisplayAppError(w, err, "Invalid Keys data", 500)
			return
		}
	}

	notesChosen := keys.Data.Keys
	fmt.Println("notesChosen:", notesChosen)
	//notesChosen := strings.Split(keyArray, ",")
	//if notes := r.URL.Query().Get("notesChosen"); notes == "" {
	//	fmt.Println("no notes missed")
	//	return
	//} else {
	//	notesChosen := strings.Split(notes, ",")
	//	songs, _ = GetSongsByKey(notesChosen,client)
	//}
	songs, _ := GetSongsByKey(notesChosen,client)

	reqcontext.Clear(r)
	if j, err := json.Marshal(SongKeysResource{Data: songs}); err != nil {
		fmt.Println("error in controllers.SpotifyGetKeys json.Marshal")
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}
}