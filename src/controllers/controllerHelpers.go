package controllers

import (
	"github.com/RhettDelFierro/rhett_memory_match/src/data"
	"database/sql"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	"net/url"
	reqcontext "github.com/gorilla/context"
	"net/http"
	"errors"
	"golang.org/x/oauth2"
	"time"
	"fmt"
	"os"
	"math/rand"
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


func spotifyTokenStorage(encryptToken common.EncryptToken, user *models.SpotifyAuthedUserProfile, env *Env) (error) {
	var err error
	var executeQuery string


	//encrypt the token with it's methods.
	dbToken, err := encryptToken.EncryptAccessToken()
	if err != nil {
		return err
	}

	query := "SELECT spotify_id FROM spotify_tokens WHERE spotify_id=?"
	id, err := env.Db.Search(query,user.ID)
	if err != nil && err != sql.ErrNoRows {
		return err
	}

	if id == nil || err == sql.ErrNoRows {
		executeQuery = "INSERT INTO spotify_tokens(spotify_id,access_token,refresh_token,token_type,expiry) VALUES(?,?,?,?,?)"
	} else {
		executeQuery = "UPDATE spotify_tokens SET access_token=?, refresh_token=?, token_type=?, expiry=? WHERE spotify_id=?"
	}

	stmt, err := env.Db.PrepareQuery(executeQuery)
	defer stmt.Close()
	if err != nil {
		return err
	}

	repo := &data.TokenRepository{S: stmt}
	if id != nil {
		//no idea why id is being stored/pull as []uint8
		byte_id,_ := id.([]uint8)
		spotify_id := string(byte_id)
		err = repo.UpdateToken(dbToken, spotify_id)
	} else {
		err = repo.StoreNewToken(dbToken, user.ID)
	}

	return err
}

//look into Transactions for sql. Knock down the amount of prepare statements.
func spotifyUserStorage(user *models.SpotifyAuthedUserProfile, env *Env) (err error) {

	query := "SELECT spotify_id FROM spotify_users WHERE spotify_id=?"
	_, err = env.Db.Search(query,user.ID)
	if err != nil && err != sql.ErrNoRows {
		return
	}

	//new user through spotify:
	if err == sql.ErrNoRows {
		//save as new user:
		query := "INSERT INTO spotify_users(spotify_id,display_name,email) VALUES(?,?,?)"
		stmt, err := env.Db.PrepareQuery(query)
		defer stmt.Close()
		if err != nil {
			return err
		}

		repo := &data.UserRepository{S: stmt}
		err = repo.CreateSpotifyUser(user)
		if err != nil {
			return err
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

func pullToken(r *http.Request, env *Env) (token *oauth2.Token, err error) {
	var decryptToken string
	var mToken models.Token
	var spotify_id string

	if id, ok := reqcontext.GetOk(r, "UserID"); ok {
		spotify_id = id.(string)
	} else {
		err = errors.New("can not get gorilla context variable UserID")
	}

	if tokenKey, ok := reqcontext.GetOk(r, "DecryptedKey"); ok {
		decryptToken = tokenKey.(string)
	} else {
		err = errors.New("can not get gorilla context variable DecryptedKey")
		return
	}

	//now make a call to the database and get the tokens.
	query := "SELECT access_token,refresh_token,token_type,expiry FROM spotify_tokens WHERE spotify_id=?"
	mToken, err = env.Db.DbSpotifyGetToken(query,spotify_id)
	if err != nil {
		return
	}
	//mToken is a models.Token with it's fields encrypted.

	//get *oauth.Token and return it to handler.
	token,err = getUserToken(decryptToken,mToken)
	if err != nil {
		return
	}

	//verify the token:
	if  !token.Valid() {
		// if user token is expired
		token = &oauth2.Token{ RefreshToken: token.RefreshToken }
	}

	return token, err
}

//put loops through this function instead of brute force:
func getUserToken(decryptToken string,mToken models.Token ) (*oauth2.Token, error){
	var err error
	token := new(oauth2.Token)
	token.AccessToken, err = common.Decrypt([]byte(decryptToken), mToken.Access)
	if err != nil {
		return token, err
	}
	token.RefreshToken, err = common.Decrypt([]byte(decryptToken), mToken.Refresh)
	if err != nil {
		return token, err
	}
	token.TokenType, err = common.Decrypt([]byte(decryptToken), mToken.Type)
	if err != nil {
		return token, err
	}
	timeString, err := common.Decrypt([]byte(decryptToken), mToken.Expiry)
	if err != nil {
		return token, err
	}
	token.Expiry, err = time.Parse("2006-01-02 15:04:05.0000000 -0700 MST", timeString)
	if err != nil {
		return token, err
	}

	return token, err
}