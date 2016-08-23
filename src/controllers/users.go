package controllers

import (
	"net/http"
	"fmt"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/data"
	"log"
	"database/sql"
	"time"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {

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

	context := NewContext();
	//defer context.Close()

	match, err := context.DbUserTable(user.Username, user.Email)

	//DB error
	if err != nil && err != sql.ErrNoRows {
		fmt.Println(err)
		fmt.Println("error in registering student")
		return
	}

	//entry is not duplicate:
	if err == sql.ErrNoRows {
		stmt, err := context.PrepareRegisterUser()
		defer stmt.Close()
		if err != nil {
			fmt.Println("error context.PrepareRegisterStudent()")
			log.Fatal(err)
		}

		//Store then Execute Prepare statement and update DB.
		repo := &data.UserRepository{S: stmt}
		user_id, err := repo.CreateUser(user)
		if err != nil {
			fmt.Println("error context.CreateUser")
			log.Fatal(err)
		}
		user.User_ID = user_id
		user.HashPassword = nil
	} else {
		//write that it's a duplicate. Do not add to db.
		fmt.Println("this already exists:", match)
		return
	}

	//double checking the password the user entered is not sent:
	user.Password = ""

	//now generate the jwt token
	token, err = common.GenerateToken(user.Username, "user")
	if err != nil {
		fmt.Println("error in controllers.RegisterUser > common.GenerateToken")
		return
	}
	//set jwt to Cookie:
	cookie := http.Cookie{
		Name: "Auth",
		Value: token,
		Expires: time.Now().Add(time.Minute * 20),
		HttpOnly: true,
	}

	//set the responseUser data:
	responseUser := RegisterAuthUserModel{User: user}

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

func LoginUser(w http.ResponseWriter, r *http.Request) {
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
	context := NewContext();
	stmt, err := context.PrepareLoginUser()
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

	//getting jwt:
	token, err = common.GenerateToken(userInfo.Username, "user")
	if err != nil {
		common.DisplayAppError(w, err, "Error while generating the access token", 500)
		return
	}
	cookie := http.Cookie{
		Name: "Auth",
		Value: token,
		Expires: time.Now().Add(time.Minute * 20),
		HttpOnly: true,
	}

	//set the responseUser data:
	responseUser := AuthUserModel{User: userInfo}
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