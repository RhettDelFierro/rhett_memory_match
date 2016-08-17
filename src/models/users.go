package models

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"github.com/RhettDelFierro/rhett_memory_match/src/controllers"
	"log"
	"os/user"
)

type Users []User

func RegisterUser(user controllers.UserControllerStruct) (err error) {

	var usr *User
	usr.Username = user.Username
	usr.Password = user.Password
	usr.Email = user.Email

	//first check for Duplicate
	check := CheckDuplicate(usr)
	if check {
		fmt.Println("This user already exists")
		return
	}


	usr.HashPassword = HashPassword(usr.Password)
	//so we don't store the unhashed pw
	usr.Password = ""

	var query = "INSERT INTO users (username,email,password) VALUES (?,?,?)"

	stmt, err := db.Prepare(query)
	if err != nil {
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(usr.Username, usr.Email, usr.HashPassword)

	return
}

func CheckDuplicate(usr *User) (bool) {
	rows, err := db.Query("SELECT user_id, email, username FROM users WHERE email = ? || username = ?", usr.Email, usr.Username)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	if rows {
		return true
	} else {
		return false
	}
}

func HashPassword(password string) ([]byte) {
	hashpw, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("error generating hashpw")
		panic(err)
	}

	return hashpw
}