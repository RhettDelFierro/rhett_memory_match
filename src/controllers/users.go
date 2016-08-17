package controllers

import (
	"net/http"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"encoding/json"
)


func RegisterUser(w http.ResponseWriter, r *http.Request) (err error) {

	var usr UserControllerStruct

	err = json.NewDecoder(r.Body).Decode(&usr)
	if err != nil {
		fmt.Println("error in jsonDecode in controllers.RegisterUser")
		return
	}

	models.RegisterUser(usr)

	hashpw, err := bcrypt.GenerateFromPassword([]byte(usr.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("error generating hashpw")
		panic(err)
	}
	&usr.HashPassword = hashpw
	//so we don't store the unhashed pw
	&usr.Password = ""

	var query = "INSERT INTO users (username,email,password) VALUES (?,?,?)"

	stmt, err := tx.Prepare(query)
	if err != nil {
		return
	}

	defer func() {
		if err == nil {
			fmt.Println("Commit Item")
			tx.Commit()
		} else {
			fmt.Println("Rollback Item")
			tx.Rollback()
		}
		stmt.Close()
	}()

	_, err = stmt.Exec(usr.Username, usr.Email, usr.Password)

	return
}

func LoginUser(w http.ResponseWriter, req *http.Request){

}