package controllers

import (
	"net/http"
	"fmt"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
)


func RegisterUser(w http.ResponseWriter, r *http.Request) {

	var usr UserResource
	var responseUser AuthUserModel
	if r.Method == "POST" {
		err := json.NewDecoder(r.Body).Decode(&usr)
		if err != nil {
			fmt.Println("error in jsonDecode in controllers.RegisterUser")
			return
		}
	}

	user := &usr.Data

	cleanUser := models.PrepareRegisterUser(user)
	if cleanUser {
		result, err := models.RegisterUser(*user)
		if err == nil {
			responseUser.User = result
			responseUser.Token, err = common.GenerateToken(result.Username, "user")
			if err != nil {
				fmt.Println("error in controllers.RegisterUser > common.GenerateToken")
				return
			}
		} else {
			fmt.Println("error in controllers.RegisterUser > models.RegisterUser")
			return
		}
	} else {
		fmt.Println("there is a duplicate error")
		return
	}

	if j, err := json.Marshal(responseUser); err != nil {
		fmt.Println("error in controllers.RegisterUser json.Marshal")
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}
	return
}

func LoginUser(w http.ResponseWriter, req *http.Request){

}