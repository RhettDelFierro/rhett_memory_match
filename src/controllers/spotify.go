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
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	"net/url"
	//"strings"
	"database/sql"
	"github.com/RhettDelFierro/rhett_memory_match/src/data"
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
	ch = make(chan *SpotifyClient)

	Endpoint = oauth2.Endpoint{
		AuthURL: "https://accounts.spotify.com/authorize",
		TokenURL: "https://accounts.spotify.com/api/token",
	}
)

//setup a SpotifyClient and generates a random string for redirect_uri state:
func setup() (authURL string, state string) {
	if client.Token != nil {
		return
	}

	id := os.Getenv("SPOTIFY_ID")
	secret := os.Getenv("SPOTIFY_SECRET")
	credentials := Credentials{id, secret}

	redirectURL := "http://localhost:8000/callback"
	scopes := []string{"user-read-private", "user-read-email", "user-library-read", "user-top-read", "streaming"}

	state = RandomString(30)
	authURL = NewAuthedClient(credentials, redirectURL, scopes, state)

	return
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
	fmt.Println(r.URL.Host)
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

func spotifyTokenStorage(encryptToken common.EncryptToken, user *models.SpotifyAuthedUserProfile) (error) {
	var err error
	var executeQuery string

	context := NewContext();
	context.Spotify_id = user.ID

	//encrypt the token with it's methods.
	dbToken, err := encryptToken.EncryptAccessToken()
	if err != nil {
		return err
	}

	query := "SELECT spotify_id FROM spotify_tokens WHERE spotify_id=?"
	spotify_id, err := context.DbSpotifyTokenTable(query)
	if err != nil {
		return err
	}
	if spotify_id != "" {
		executeQuery = "UPDATE spotify_tokens SET access_token=?, refresh_token=?, token_type=?, expiry=? WHERE spotify_id=?"
	} else {
		executeQuery = "INSERT INTO spotify_tokens(spotify_id,access_token,refresh_token,token_type=?,expiry=?) VALUES(?,?,?,?,?)"
	}

	stmt,err := context.Prepare(executeQuery)
	defer stmt.Close()
	if err != nil {
		return err
	}

	repo := &data.TokenRepository{S: stmt}
	if spotify_id != "" {
		err = repo.UpdateToken(dbToken,spotify_id)
	} else {
		err = repo.StoreNewToken(dbToken,spotify_id)
	}

	return err
}

//look into Transactions for sql. Knock down the amount of prepare statements.
func spotifyUserStorage(user *models.SpotifyAuthedUserProfile) (err error) {
	var spotifyUser string
	context := NewContext();
	context.Spotify_id = user.ID
	query := "SELECT spotify_id FROM spotify_users WHERE spotify_id=?"
	stmt, err := context.Prepare(query)
	if err != nil {
		return
	}

	stmt.QueryRow(context.Spotify_id).Scan(&spotifyUser)
	if err != nil && err != sql.ErrNoRows {
		return
	}

	//new user through spotify:
	if err == sql.ErrNoRows {
		//save as new user:
		query := "INSERT INTO spotify_users(spotify_id,display_name) VALUES(?,?)"
		stmt, err = context.Prepare(query)
		defer stmt.Close()
		if err != nil {
			return
		}

		repo := &data.UserRepository{S: stmt}
		err = repo.CreateSpotifyUser(user)
		if err != nil {
			return
		}

		query = "INSERT INTO users(username,email) VALUES(?,?)"
		stmt, err = context.Prepare(query)
		defer stmt.Close()
		if err != nil {
			return
		}
		repo.S = stmt
		err = repo.InsertSpotifyUser(user)
		if err != nil {
			return
		}
	}

	return
}

func queryMaker(user *models.SpotifyAuthedUserProfile, sessionToken string) (backToReact string) {
	backToReact = "http://localhost:8080/oauthfinished"
	v := url.Values{}
	v.Set("display_name", user.Display_name)
	v.Set("id", user.ID)
	v.Set("token", sessionToken)
	if params := v.Encode(); params != "" {
		backToReact += "?" + params
		return
	}
	return ""
}

func SpotifyGetKeys(w http.ResponseWriter, r *http.Request) {
	fmt.Println("we in SpotifyGetKeys Handler")
	//var songs []string
	//if notes := r.URL.Query().Get("notesChosen"); notes == "" {
	//	fmt.Println("no notes missed")
	//	return
	//} else {
	//	notesChosen := strings.Split(notes, ",")
	//	songs, _ = GetSongsByKey(notesChosen...)
	//}
	//fmt.Println(songs)
}