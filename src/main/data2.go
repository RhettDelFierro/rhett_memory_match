package main

import (
	"os"
	"log"
	"time"
	"io/ioutil"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/GoesToEleven/GolangTraining/27_code-in-process/98-good-student-code/daniel/Week8/profile"
	"github.com/dgrijalva/jwt-go"
	"fmt"
)

type DB struct {
	*sql.DB
}

func NewOpen(dt string, c string) (DB, error) {
	db, err := sql.Open(dt, c)
	return DB{dt}, err
}

type User struct {
	Username string        `json:"username"`
	Email    string        `json:"email"`
	Password string        `json:"password"`
}

type Users []User

//func (d DB) GetUser(id string) {
//	var query = "SELECT username, email, profile, f_id FROM users WHERE f_id=?"
//	var t string
//	err := d.QueryRow(query, id).Scan(&usr.Username)
//}

func (d DB) RegisterUser(usr User) (err error) {
	tx, err := d.Begin()
	if err != nil {
		return
	}

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