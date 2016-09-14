package controllers

import (
	"net/http"
	"fmt"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	"github.com/RhettDelFierro/rhett_memory_match/src/data"
	"errors"
	"time"
)

func (env *Env) RegisterUser(w http.ResponseWriter, r *http.Request) {

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

	err := RegisterUserDB(user, env)
	//DB error
	if err != nil {
		//maybe make an error stuct to tell whether it was the username or email duplicate.
		common.DisplayAppError(w, err, "User could not be registered.", 500)
		return
	}

	cookie, err := common.GenerateCookieToken(user.Username, "app", user.User_ID)
	if err != nil {
		common.DisplayAppError(w, err, "Error while generating the access token for cookie", 500)
		return
	}

	//generate token for response:
	token, err = common.GenerateToken(user.Username, "app", user.User_ID)
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

func (env *Env) LoginUser(w http.ResponseWriter, r *http.Request) {

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

	//login logic robust enough to be done inline:
	query := "SELECT passwords.password,users.user_id FROM passwords INNER JOIN users ON passwords.user_id = users.user_id WHERE users.email=?"
	stmt, err := env.Db.PrepareQuery(query)
	if err != nil {
		common.DisplayAppError(w, err, "Error in database query", 500)
		return
	}
	defer stmt.Close()

	repo := &data.UserRepository{S: stmt}
	userInfo, err := repo.Login(loginUser)
	if err != nil {
		common.DisplayAppError(w, err, "Invalid login credentials", 401)
		return
	}

	//getting jwt for cookie:
	cookie, err := common.GenerateCookieToken(userInfo.Username, "app", userInfo.User_ID)
	if err != nil {
		common.DisplayAppError(w, err, "Error while generating the access token for cookie", 500)
		return
	}

	//generate token for response:
	token, err = common.GenerateToken(userInfo.Username, "app", userInfo.User_ID)
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
		err := errors.New("Error logging out (Auth)")
		common.DisplayAppError(w, err, "Error logging out", 500)
	}
	if err == nil {
		cookie.Expires,_ = time.Parse("2006-01-02 15:04:05.0000000 -0700 MST", "2006-01-02 15:04:05.0000000 -0700 MST")
		cookie.MaxAge = -1
		http.SetCookie(w, cookie)
	}

	spotifyCookie, err := r.Cookie("Spotify_Auth")
	if err != nil {
		err := errors.New("Error logging out (Spotify_Auth)")
		common.DisplayAppError(w, err, "Error logging out", 500)
	}
	if err == nil {
		spotifyCookie.MaxAge = -1
		http.SetCookie(w, spotifyCookie)
	}

	w.Header().Set("Content-Type", "application/json")
}
