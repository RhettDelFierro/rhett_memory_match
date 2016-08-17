package models

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
	"fmt"
	"log"
)

var db *sql.DB
type Users []User

func InitDB(driver string, databaseSource string) {
	var err error
	db, err = sql.Open(driver, databaseSource)
	if err != nil {
		log.Panic(err)
	}

	if err = db.Ping(); err != nil {
		log.Panic(err)
	}
}

func RegisterUser(usr User) (err error) {

	hashpw, err := bcrypt.GenerateFromPassword([]byte(usr.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("error generating hashpw")
		panic(err)
	}
	usr.HashPassword = hashpw
	//so we don't store the unhashed pw
	usr.Password = ""

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