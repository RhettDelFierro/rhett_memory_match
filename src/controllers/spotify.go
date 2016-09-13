package controllers

import (
	"net/http"
	"os"
	"golang.org/x/oauth2"
	"fmt"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
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
func(env *Env) SpotifyCallback(w http.ResponseWriter, r *http.Request) {
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
	err = spotifyUserStorage(user, env)
	if err != nil {
		common.DisplayAppError(w, err, "Error in spotifyUserStorage", 500)
		return
	}
	//store token in DB
	err = spotifyTokenStorage(encryptToken, user, env)
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

func(env *Env) SpotifyGetKeys(w http.ResponseWriter, r *http.Request) {
	authClient = setup()
	token, err := pullToken(r,env)
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