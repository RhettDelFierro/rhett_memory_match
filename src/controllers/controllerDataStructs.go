package controllers

import (
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	"golang.org/x/oauth2"
	"net/http"
)

type (
	//For Post - /user/register
	UserResource struct {
		Data models.User `json:"data"`
	}
	//For Post - /user/login
	LoginResource struct {
		Data LoginModel `json:"data"`
	}
	//Response for authorized user Post - /user/login
	AuthUserResource struct {
		Data AuthUserModel `json:"data"`
	}
	//Response for authorized user after Register
	RegisterAuthUserResource struct {
		Data RegisterAuthUserModel `json:"data"`
	}
	// For Post/Put - /Scores
	// For Get - /Scores/id
	ScoreResource struct {
		Data models.Score `json:"data"`
	}
	// For Get - /Scores
	ScoresResource struct {
		Data []models.Score `json:"data"`
	}
	// For Post/Put - /notes
	NoteResource struct {
		Data NoteModel `json:"data"`
	}
	// For Get - /notes
	// For /notes/Scores/id
	//NotesResource struct {
	//	Data []models.ScoreNote `json:"data"`
	//}
	//Model for authentication
	LoginModel struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	//Model for authorized user with access token
	AuthUserModel struct {
		User  models.User `json:"user"`
		Token string      `json:"token,omitempty"`
	}
	//Model for authorized user after registration:
	RegisterAuthUserModel struct {
		User  *models.User `json:"user"`
		Token string      `json:"token,omitempty"`
	}
	//Model for a ScoreNote
	NoteModel struct {
		ScoreId     string `json:"Scoreid"`
		Description string `json:"description"`
	}

	//these are for spotify

	//for the environment variables:
	Credentials struct {
		Id     string
		Secret string
	}

	//setup to get Token
	AuthUser struct {
		config *oauth2.Config
	}

	//authorize access uri to be sent to front end:
	AuthURI struct {
		Uri string `json:"uri"`
	}

	//Authenticated client to make Spotify API requests:
	SpotifyClient struct {
		http  *http.Client
		Token *oauth2.Token
	}

	//Information on authed User
	AuthedUserInfo struct {
		Profile *models.SpotifyAuthedUserProfile `json:"data"`
	}

	//used for non-auth requests to spotify
	RegularClient struct {
		http *http.Client
	}

	//keys
	SongKeysResource struct {
		Data models.Keys `json:"data"`
	}
)
