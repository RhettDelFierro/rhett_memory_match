package controllers

import (
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

type (
	//For Post - /user/register
	UserResource struct {
		Data models.User `json:"data"`
	}
	AuthUserModel struct {
		User  models.User `json:"user"`
		Token string      `json:"token"`
	}
)