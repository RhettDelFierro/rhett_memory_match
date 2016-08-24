package models

import (
	"time"
)

type (
	User struct {
		User_ID      int64           `json:"user_id"`
		Username     string        `json:"username"`
		Email        string        `json:"email"`
		Password     string        `json:"password"`
		HashPassword []byte        `json:"hashpassword,omitempty"`
	}
	Score struct {
		Score_ID      int64           `json:"score_id"`
		User_ID       int64        `json:"user_id"`
		Game_mode     string        `json:"mode"`
		Date_Complete time.Time     `json:"date_completed,omitempty"`
		Due           time.Time     `json:"due,omitempty"`
		Attempts      int            `json:"rounds_completed"`
	}
)
