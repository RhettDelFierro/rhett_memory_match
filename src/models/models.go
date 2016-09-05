package models

import (
	"time"
)

type (
	User struct {
		User_ID      int64          `json:"user_id"`
		Username     string         `json:"username"`
		Email        string         `json:"email"`
		Password     string         `json:"password,omitempty"`
		HashPassword []byte         `json:"hashpassword,omitempty"`
	}
	Score struct {
		Score_ID      int64         `json:"score_id"`
		User_ID       int64
		Round_ID      int64
		Game_mode     string        `json:"gamemode"`
		Round         int           `json:"round"`
		Score         string        `json:"score"`
		Date_Complete time.Time     `json:"date_completed"`
		Contact_date  time.Time     `json:"contact_date,omitempty"`
		Attempts      int           `json:"rounds_completed"`
	}

	Token struct {
		Access  string
		Refresh string
		Type    string
		Expiry  time.Time
	}

	SpotifyAuthedUserProfile struct {
		ID           string        `json:"id"`
		Display_name string        `json:"display_name"`
		Email        string        `json:"email"`
		Avatar       string        `json:"images.url"`
	}

	Keys struct {
		Notes []string        `json:"notesChosen"`
	}


)
