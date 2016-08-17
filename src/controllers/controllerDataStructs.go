package controllers

type (
	//For Post - /user/register
	UserControllerStruct struct {
		Username	string `json:"username"`
		Email		string	`json:"email"`
		Password	string	`json:"password"`
	}
)
