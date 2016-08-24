package models

import (
	"time"
)

type (
	User struct {
		User_ID      int64           `json:"user_id"`
		Username     string        `json:"username"`
		Email        string        `json:"email"`
		Password     string        `json:"password,omitempty"`
		HashPassword []byte        `json:"hashpassword,omitempty"`
	}
	Score struct {
		Score_ID      int64           `json:"score_id"`
		User_ID       int64        `json:"user_id"`
		Round_ID      int64
		Game_mode     string        `json:"gamemode"`
		Round         int            `json:"round"`
		Score         int            `json:"score"`
		Date_Complete time.Time     `json:"date_completed,omitempty"`
		Contact_date  time.Time     `json:"contact_date,omitempty"`
		Attempts      int            `json:"rounds_completed"`
	}
)
