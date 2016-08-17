package models

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	//"log"
)

//don't need this here, just when we need plenty of scores.
type Users []User

//clean the struct:
func PrepareRegisterUser(usr *User) bool {

	//first check for Duplicate
	check := CheckDuplicate(usr)
	if check {
		fmt.Println("This user already exists")
		return false
	}

	usr.HashPassword = HashPassword(usr.Password)

	//so we don't store the unhashed pw:
	usr.Password = ""

	return true
}

func CheckDuplicate(usr *User) (bool) {
	//fmt.Println("here is the data: %v", usr.Email)
	rows, err := db.Query("SELECT user_id, email, username FROM users WHERE email = ? || username = ?", usr.Email, usr.Username)
	if err != nil {
		//log.Fatal(err)
		fmt.Println("none found")
	}
	defer rows.Close()

	if rows == nil {
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


//query into DB:
func RegisterUser(usr User) (User,error) {

	var query = "INSERT INTO users (username,email,password) VALUES (?,?,?)"
	fmt.Println("here is db:", db)
	stmt, err := db.Prepare(query)
	if err != nil {
		fmt.Println("error in models.RegisterUser .Prepare")
		return User{}, err
	}
	defer stmt.Close()

	_, err = stmt.Exec(usr.Username, usr.Email, usr.HashPassword)

	if err != nil {
		fmt.Println("error in models.RegisterUser .Exec")
		return User{}, err
	}

	return usr, err
}