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
)

func spotifyTokenStorage(encryptToken common.EncryptToken, user *models.SpotifyAuthedUserProfile) (error) {
	var err error
	var executeQuery string
	var spotify_id string

	context := NewContext();
	context.Spotify_id = user.ID

	//encrypt the token with it's methods.
	dbToken, err := encryptToken.EncryptAccessToken()
	if err != nil {
		return err
	}

	query := "SELECT spotify_id FROM spotify_tokens WHERE spotify_id=?"
	spotify_id, err = context.DbSpotifyTokenTable(query)
	if err != nil && err != sql.ErrNoRows {
		return err
	}

	if err == sql.ErrNoRows {
		executeQuery = "INSERT INTO spotify_tokens(spotify_id,access_token,refresh_token,token_type,expiry) VALUES(?,?,?,?,?)"
	} else {
		executeQuery = "UPDATE spotify_tokens SET access_token=?, refresh_token=?, token_type=?, expiry=? WHERE spotify_id=?"
	}

	stmt, err := context.Prepare(executeQuery)
	defer stmt.Close()
	if err != nil {
		return err
	}

	repo := &data.TokenRepository{S: stmt}
	if spotify_id != "" {
		err = repo.UpdateToken(dbToken, spotify_id)
	} else {
		err = repo.StoreNewToken(dbToken, context.Spotify_id)
	}

	return err
}

//look into Transactions for sql. Knock down the amount of prepare statements.
func spotifyUserStorage(user *models.SpotifyAuthedUserProfile) (err error) {
	context := NewContext();
	context.Spotify_id = user.ID
	//query := "SELECT spotify_id FROM spotify_users WHERE spotify_id=?"
	//stmt, err := context.Prepare(query)
	//defer stmt.Close()
	//if err != nil {
	//	return
	//}

	query := "SELECT spotify_id FROM spotify_users WHERE spotify_id=?"
	_, err = context.DbSpotifyUserTable(query)
	if err != nil && err != sql.ErrNoRows {
		return
	}

	//new user through spotify:
	if err == sql.ErrNoRows {
		//save as new user:
		query := "INSERT INTO spotify_users(spotify_id,display_name) VALUES(?,?)"
		stmt, err := context.Prepare(query)
		defer stmt.Close()
		if err != nil {
			return err
		}

		repo := &data.UserRepository{S: stmt}
		err = repo.CreateSpotifyUser(user)
		if err != nil {
			return err
		}

		query = "INSERT INTO users(username,email) VALUES(?,?)"
		stmt, err = context.Prepare(query)
		defer stmt.Close()
		if err != nil {
			return err
		}
		repo.S = stmt
		err = repo.InsertSpotifyIntoUsers(user)
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

func pullToken(r *http.Request) (token *oauth2.Token, err error) {
	var decryptToken string
	var mToken models.Token
	context := NewContext()

	if id, ok := reqcontext.GetOk(r, "UserID"); ok {
		context.Spotify_id = id.(string)
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
	mToken, err = context.DbSpotifyGetToken(query)
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