package controllers

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

type Env struct {
	Db DBQueries
}

type DBQueries interface {
	BeginTx() (tx *sql.Tx,err error)
	CloseDB()
	PrepareQuery(q string) (*sql.Stmt, error)
	Search(query string,args ...interface{}) (result interface{},err error)
	FindUser(user, address  string) (string, error)
	DbSpotifyGetToken(query, s_id string) (t models.Token, err error)
}

type DB struct {
	*sql.DB
}

func (db *DB) BeginTx() (tx *sql.Tx,err error) {
	tx, err = db.Begin()
	if err != nil {
		return nil, err
	}
	return tx
}

func (db *DB) CloseDB() {
	db.Close()
}

//FindUser returns a query to the users table for duplicates.
func (db *DB) FindUser(user, address string) (string, error) {

	var user_id int64
	var username string
	var email string
	var q = "SELECT user_id, email, username FROM users WHERE username=? || email=?"

	err := db.QueryRow(q, user, address).Scan(&user_id, &email, &username)

	if err == nil {
		if user == username {
			return username, nil
		} else {
			return email, nil
		}
	}

	return "", err

}

/////////DON'T FORGET TO ADD TO INTERFACE
func (db *DB) RegisterUser() () {

}

func (db *DB) Search(query string,args ...interface{}) (result interface{},err error) {
	err = db.QueryRow(query,args...).Scan(&result)
	return
}

func (db *DB) PrepareQuery(q string) (*sql.Stmt, error) {
	return db.Prepare(q)
}

func (db *DB) DbSpotifyGetToken(query, s_id string) (t models.Token, err error) {
	err = db.QueryRow(query, s_id).Scan(&t.Access,&t.Refresh,&t.Type,&t.Expiry)
	return
}

