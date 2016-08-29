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
	Credentials struct {
		Id     string
		Secret string
	}

	SpotifyClient struct {
		credentials Credentials
		client      *http.Client
		Token       *oauth2.Token
	}
)
