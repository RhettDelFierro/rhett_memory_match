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
	//"github.com/gorilla/mux"
	"net/url"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"strings"
)

//gloabl variable that will contain credentials, httpClient and credentials.
var client SpotifyClient

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
	state := r.FormValue("state")

	code := r.FormValue("code")
	if code == "" {
		err := error{"spotify: didn't get access code"}
		common.DisplayAppError(w, err, "No code in OAuth process", 500)
	}

	if err := r.URL.Query().Get("error"); err != "" {
		common.DisplayAppError(w, err, "Sent back error in OAuth process", 500)
	}

	cookie, err := r.Cookie("Spotify_auth_user")
	if err!= nil {
		common.DisplayAppError(w, err, "Error logging out", 500)
	}

	splitString := "Spotify_auth_user="
	splitCookie := strings.Split(cookie.String(), splitString)
	storedState := splitCookie[1]

	if (storedState == nil || storedState != state || state == "") {
		common.DisplayAppError(w, err, "Not valid Oauth in SpotifyCallback. The cookie doesn't match.", 500)
	}

	//all checks are accounted for. What's next?


	//vars := mux.Vars(r)
	//code := vars["code"]
	//state := vars["state"]
	//error := vars("error")

	//check cookie to match the state from vars.
}