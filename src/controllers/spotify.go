package controllers

import (

)
import (
	"net/http"
	"os"
	"golang.org/x/oauth2"
	"fmt"
	"encoding/json"
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


func setup() string {
	if client.Token != nil {
		return ""
	}

	id := os.Getenv("SPOTIFY_ID")
	secret := os.Getenv("SPOTIFY_SECRET")
	credentials := Credentials{id, secret}

	redirectURL := "http://localhost:8000/callback"
	scopes := []string{"user-read-private", "user-read-email", "user-library-read", "user-top-read", "stremaing"}
	state := "kjsadhflkjdsahfkjhdsalkfjhdsaljkfh"

	return AuthorizationURL(credentials,redirectURL,scopes,state)

	//going to fill this in when the token comes in from Auth.
	//token := &oauth2.Token{}
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

func SpotifyAuth(w http.ResponseWriter, r *http.Request) {

	//run setup
	url := setup()
	if j, err := json.Marshal(Test{Uri: url}); err != nil {
		fmt.Println("error in controllers.SpotifyAuth json.Marshal")
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}
}