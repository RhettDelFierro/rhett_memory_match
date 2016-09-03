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
)

var store = sessions.NewCookieStore([]byte(os.Getenv("G_SESSION")))

//gloabl variable that will contain credentials, httpClient and credentials.
var (
	authClient AuthUser
	client SpotifyClient
	ch = make(chan *SpotifyClient)

	Endpoint = oauth2.Endpoint{
		AuthURL: "https://accounts.spotify.com/authorize",
		TokenURL: "https://accounts.spotify.com/api/token",
	}
)

//setup a SpotifyClient and generates a random string for redirect_uri state:
func setup() (string, string) {
	if client.Token != nil {
		return "", ""
	}

	id := os.Getenv("SPOTIFY_ID")
	secret := os.Getenv("SPOTIFY_SECRET")
	credentials := Credentials{id, secret}

	redirectURL := "http://localhost:8000/callback"
	scopes := []string{"user-read-private", "user-read-email", "user-library-read", "user-top-read", "streaming"}
	state := RandomString(30)

	return NewAuthedClient(credentials, redirectURL, scopes, state), state
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
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
	result := make([]byte, strlen)
	for i := 0; i < strlen; i++ {
		result[i] = chars[rand.Intn(len(chars))]
	}
	return string(result)
}

//sets up AuthUser struct which is our request to spotify accounts service in /authLogin:
func NewAuthedClient(credentials Credentials, redirectURL string, scopes []string, state string) string {
	authClient = AuthUser{
		config: &oauth2.Config{
			ClientID: credentials.Id,
			ClientSecret: credentials.Secret,
			Endpoint: Endpoint,
			RedirectURL: redirectURL,
			Scopes: scopes,
		},
	}

	//.AuthCodeURL generates the url the user visits to authorize access to our app:
	return authClient.config.AuthCodeURL(state)
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

	//runs setup() -> NewAuthedClient():
	url, state := setup()

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

	user, err := client.GetCurrentProfile()
	if err != nil {
		common.DisplayAppError(w, err, "Error after User auth", 500)
	}
	if j, err := json.Marshal(AuthedUserInfo{Profile: user}); err != nil {
		common.DisplayAppError(w, err, "error in controllers.SpotifyAuthorization json.Marshal AuthedUserInfo", 500)
		return
	} else {
		http.Redirect(w,r,"http://localhost:8080/",302)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}

	//also clear the cookie.
}