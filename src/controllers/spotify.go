package controllers

import (

)
import (
	"net/http"
	"os"
	"golang.org/x/oauth2"
	"encoding/json"
	"fmt"
	"time"
	"math/rand"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"strings"
	"errors"
)

//gloabl variable that will contain credentials, httpClient and credentials.
var authClient AuthUser
var client SpotifyClient

var Endpoint = oauth2.Endpoint{
	AuthURL: "https://accounts.spotify.com/authorize",
	TokenURL: "https://accounts.spotify.com/api/token",
}

type AuthUser struct {
	config *oauth2.Config
}

//the response
type Test struct {
	Uri 	string	`json:"uri"`
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

func setup() (string, http.Cookie) {
	if client.Token != nil {
		return "", http.Cookie{}
	}

	id := os.Getenv("SPOTIFY_ID")
	secret := os.Getenv("SPOTIFY_SECRET")
	credentials := Credentials{id, secret}

	redirectURL := "http://localhost:8000/callback"
	scopes := []string{"user-read-private", "user-read-email", "user-library-read", "user-top-read", "streaming"}
	state := RandomString(30)

	return NewAuthedClient(credentials,redirectURL,scopes,state), createCookie(state)
}

func createCookie(state string) http.Cookie {
	expireCookie := time.Now().Add(time.Minute * 1)

	return http.Cookie{Name: "Spotify_auth_state",
		Value: state,
		Expires: expireCookie,
		HttpOnly: true,
		Path: "/",
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

func(a *AuthUser) Token(state string, r *http.Request) (*oauth2.Token, error) {


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

	//run setup
	url, cookie := setup()

	//splitString := "https:"
	//splitUrl := strings.Split(url, splitString)
	if j, err := json.Marshal(Test{Uri: url}); err != nil {
		fmt.Println("error in controllers.SpotifyAuth json.Marshal")
		return
	} else {
		http.SetCookie(w, &cookie)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}
}

func SpotifyCallback(w http.ResponseWriter, r *http.Request) {
	state := r.FormValue("state")


	cookie, err := r.Cookie("Spotify_auth_user")
	if err!= nil {
		common.DisplayAppError(w, err, "Error getting cookie", 500)
		return
	}

	splitString := "Spotify_auth_user="
	splitCookie := strings.Split(cookie.String(), splitString)
	fmt.Println("splitcookie:", splitCookie[1])
	storedState := splitCookie[1]

	if (storedState == "" || storedState != state || state == "") {
		common.DisplayAppError(w, err, "Not valid Oauth in SpotifyCallback. The cookie doesn't match.", 500)
		return
	}

	//will return a token
	token, err := authClient.Token(state,r)
	if err != nil {
		common.DisplayAppError(w, err, "Error getting token", http.StatusForbidden)
		return
	}
	
	return authClient.FinalAuth(token)
}