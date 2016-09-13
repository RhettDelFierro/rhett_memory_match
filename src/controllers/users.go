package controllers

import (
	"net/http"
	"fmt"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/data"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

func(env *Env) RegisterUser(w http.ResponseWriter, r *http.Request) {

	var usr UserResource
	var token string
	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&usr)
		if err != nil {
			common.DisplayAppError(w, err, "Invalid User data", 500)
			return
		}
	}

	user := &usr.Data

	err := RegisterUserDB(user,env)
	//DB error
	if err != nil{
		//maybe make an error stuct to tell whether it was the username or email duplicate.
		common.DisplayAppError(w,err,"User could not be registered.",500)
		return
	}

	cookie, err := common.GenerateCookieToken(user.Username, "user", user.User_ID)
	if err != nil {
		common.DisplayAppError(w, err, "Error while generating the access token for cookie", 500)
		return
	}

	//generate token for response:
	token, err = common.GenerateToken(user.Username, "user", user.User_ID)
	if err != nil {
		common.DisplayAppError(w, err, "Error while generating the access token for sessions", 500)
		return
	}

	//set the responseUser data:
	responseUser := RegisterAuthUserModel{User: user, Token: token}

	if j, err := json.Marshal(RegisterAuthUserResource{Data: responseUser}); err != nil {
		fmt.Println("error in controllers.RegisterUser json.Marshal")
		return
	} else {
		http.SetCookie(w, &cookie)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}
}

func(env *Env) LoginUser(w http.ResponseWriter, r *http.Request) {

	var usr LoginResource
	var token string

	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&usr)
		if err != nil {
			common.DisplayAppError(w, err, "Invalid Login data", 500)
			return
		}
	}

	user := &usr.Data
	loginUser := models.User{
		Email:    user.Email,
		Password: user.Password,
	}

	query := "SELECT user_id,username,email,password FROM users WHERE email = ?"
	stmt, err := env.Db.PrepareQuery(query)
	defer stmt.Close()
	if err != nil {
		common.DisplayAppError(w, err, "Error in database query", 500)
		return
	}
	repo := &data.UserRepository{S: stmt}
	userInfo, err := repo.Login(loginUser)
	if err != nil {
		common.DisplayAppError(w, err, "Invalid login credentials", 401)
	}

	//getting jwt for cookie:
	cookie, err := common.GenerateCookieToken(userInfo.Username, "user", userInfo.User_ID)
	if err != nil {
		common.DisplayAppError(w, err, "Error while generating the access token for cookie", 500)
		return
	}

	//generate token for response:
	token, err = common.GenerateToken(userInfo.Username, "user", userInfo.User_ID)
	if err != nil {
		common.DisplayAppError(w, err, "Error while generating the access token for sessions", 500)
		return
	}
	//set the responseUser data:
	responseUser := AuthUserModel{User: userInfo, Token: token}

	if j, err := json.Marshal(AuthUserResource{Data: responseUser}); err != nil {
		common.DisplayAppError(w, err, "An unexpected error has occurred", 500)
		return
	} else {
		http.SetCookie(w, &cookie)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}
}

func LogOut(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("Auth")
	if err != nil {
		common.DisplayAppError(w, err, "Error logging out", 500)
	}
	cookie.MaxAge = -100

	http.SetCookie(w, cookie)
	w.Header().Set("Content-Type", "application/json")
}
