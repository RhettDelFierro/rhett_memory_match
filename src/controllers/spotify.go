package controllers

import (
	"net/http"
	"os"
	"golang.org/x/oauth2"
	//"encoding/json"
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
var authClient AuthUser
var client SpotifyClient
var ch = make(chan *SpotifyClient)


var Endpoint = oauth2.Endpoint{
	AuthURL: "https://accounts.spotify.com/authorize",
	TokenURL: "https://accounts.spotify.com/api/token",
}

type AuthUser struct {
	config *oauth2.Config
}

//the response
type Test struct {
	Uri string        `json:"uri"`
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

func (a *AuthUser) FinalAuth(token *oauth2.Token) SpotifyClient {
	return SpotifyClient{
		http: a.config.Client(oauth2.NoContext, token),
		Token: token,
	}
}

func SpotifyAuthorization(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "spotify_auth_state")
	if err != nil {
		common.DisplayAppError(w, err, "Error getting session in SpotifyAuthorization", 500)
		return
	}

	//run setup
	url, state := setup()

	session.Values["state_key"] = state
	session.Save(r, w)
	if j, err := json.Marshal(Test{Uri: url}); err != nil {
		fmt.Println("error in controllers.SpotifyAuthorization json.Marshal")
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)


		go func() {
			client := <-ch
			fmt.Println("client is here:", *client)
		}()
	}
}

func SpotifyCallback(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "spotify_auth_state")
	if err != nil {
		common.DisplayAppError(w, err, "Error getting session in SpotifyCallback", 500)
		return
	}

	checkState := session.Values["state_key"]

	fmt.Println("here's checkState:", checkState)

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
	ch <- &client
	session.Save(r, w)

	//also clear the cookie.
}