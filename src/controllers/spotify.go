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
var client SpotifyClient
//ch := make(chan *oauth2.Config)

var Endpoint = oauth2.Endpoint{
	AuthURL: "https://accounts.spotify.com/authorize",
	TokenURL: "https://accounts.spotify.com/api/token",
}

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

	return AuthorizationURL(credentials,redirectURL,scopes,state), createCookie(state)

	//going to fill this in when the token comes in from Auth.
	//token := &oauth2.Token{}
}

func createCookie(state string) http.Cookie {
	expireCookie := time.Now().Add(time.Minute * 1)

	return http.Cookie{Name: "Spotify_auth_state",
		Value: state,
		Expires: expireCookie,
	}
}

func AuthorizationURL(credentials Credentials, redirectURL string, scopes []string, state string) string {
	config := oauth2.Config{
		ClientID: credentials.Id,
		ClientSecret: credentials.Secret,
		Endpoint: Endpoint,
		RedirectURL: redirectURL,
		Scopes: scopes,
	}

	return config.AuthCodeURL(state, oauth2.AccessTypeOffline)
}

func SpotifyAuthorization(w http.ResponseWriter, r *http.Request) {

	//run setup
	url, cookie := setup()
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
	fmt.Println(r.URL.Path)
	state := r.FormValue("state")

	code := r.FormValue("code")
	if code == "" {
		err := errors.New("spotify: didn't get access code")
		common.DisplayAppError(w, err, "No code in OAuth process", 500)
		return
	}

	if err := r.URL.Query().Get("error"); err != "" {
		err := errors.New("'error' query parameter sent back in SpotifyCallback")
		common.DisplayAppError(w, err, "Sent back error in OAuth process", 500)
		return
	}

	cookie, err := r.Cookie("Spotify_auth_user")
	if err!= nil {
		common.DisplayAppError(w, err, "Error logging out", 500)
		return
	}

	splitString := "Spotify_auth_user="
	splitCookie := strings.Split(cookie.String(), splitString)
	storedState := splitCookie[1]

	if (storedState == "" || storedState != state || state == "") {
		common.DisplayAppError(w, err, "Not valid Oauth in SpotifyCallback. The cookie doesn't match.", 500)
		return
	}

	//all checks are accounted for. What's next?
	//open new window with url on client (after /authLogin runs).
	//when that closes, store the replaced url (localhost:8000/callback...) on the client and make an axios request here (which brings us to the start of this function).
	//the functions runs and we get to here:

	//we want that config variable of type oauth2.Config so we could use the .Exchange method on it and pass in "code" to get a token back.

}