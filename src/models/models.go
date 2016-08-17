package models

import (
	"time"
)

type (
	User struct {
		User_ID      int           `json:"user_id"`
		Username     string        `json:"username"`
		Email        string        `json:"email"`
		Password     string        `json:"password"`
		HashPassword []byte        `json:"hashpassword,omitempty"`
	}
	Score struct {
		Score_ID    int           `json:"score_id"`
		CreatedBy   string        `json:"createdby"`
		Name        string        `json:"name"`
		Description string        `json:"description"`
		CreatedOn   time.Time     `json:"createdon,omitempty"`
		Due         time.Time     `json:"due,omitempty"`
		Status      string        `json:"status,omitempty"`
		Tags        []string      `json:"tags,omitempty"`
	}
)
