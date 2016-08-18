package controllers

import (
	"net/http"
	"fmt"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/data"
	"log"
	"database/sql"
)


func RegisterUser(w http.ResponseWriter, r *http.Request) {

	var usr UserResource
	var token string
	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&usr)
		if err != nil {
			fmt.Println("error in jsonDecode in controllers.RegisterUser")
			return
		}
	}

	user := &usr.Data

	context := NewContext();
	defer context.Close()
	_, err := context.DbTable("users", user.Username, user.Email)

	if err !=nil && err != sql.ErrNoRows{
		fmt.Println("error in registering student")
		return
	}

	if err == sql.ErrNoRows {
		//prepare statement:
		stmt, err := context.PrepareRegisterStudent()
		if err != nil {
			fmt.Println("error context.PrepareRegisterStudent()")
			log.Fatal(err)
		}
		//Execute statement and insert the rows.
		repo := &data.UserRepository{S: stmt}
		//repo := &data.UserRepository{R: rows}
		user_id, err := repo.CreateUser(user)
		if err != nil {
			fmt.Println("error context.CreateUser")
			log.Fatal(err)
		}
		user.User_ID = user_id
		user.HashPassword = nil
	}

	//now generate the jwt token
	token, err = common.GenerateToken(user.Username, "user")
	if err != nil {
		fmt.Println("error in controllers.RegisterUser > common.GenerateToken")
		return
	}
	//set the responseUser data:
	responseUser := RegisterAuthUserModel{
		User: user,
		Token: token,
	}
	if j, err := json.Marshal(RegisterAuthUserResource{Data: responseUser}); err != nil {
		fmt.Println("error in controllers.RegisterUser json.Marshal")
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}




	//cleanUser := models.PrepareRegisterUser(user)
	//if cleanUser {
	//	result, err := models.RegisterUser(*user)
	//	if err == nil {
	//		responseUser.User = result
	//		responseUser.Token, err = common.GenerateToken(result.Username, "user")
	//		if err != nil {
	//			fmt.Println("error in controllers.RegisterUser > common.GenerateToken")
	//			return
	//		}
	//	} else {
	//		fmt.Println("error in controllers.RegisterUser > models.RegisterUser")
	//		return
	//	}
	//} else {
	//	fmt.Println("there is a duplicate error")
	//	return
	//}
	//
	//if j, err := json.Marshal(responseUser); err != nil {
	//	fmt.Println("error in controllers.RegisterUser json.Marshal")
	//	return
	//} else {
	//	w.Header().Set("Content-Type", "application/json")
	//	w.WriteHeader(http.StatusOK)
	//	w.Write(j)
	//}
}

//func LoginUser(w http.ResponseWriter, req *http.Request){
//
//}