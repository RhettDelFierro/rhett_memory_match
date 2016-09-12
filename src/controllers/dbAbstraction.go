package controllers

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

type Env struct {
	Db DBQueries
}


// Context used for maintaining HTTP Request Context
type DB struct {
	*sql.DB
}
type DBQueries interface {
	CloseDB()
	DbUserTable(user, address  string) (string, error)
	DbSpotifyUserTable(query,s_id string) (spotify_id string,err error)
	DbSpotifyTokenTable(query,s_id string) (spotify_id string, err error)
	DbSpotifyGetToken(query, s_id string) (t models.Token, err error)
	DbModeTable(mode string) (round_id int64, err error)
	Prepare(q string) (*sql.Stmt, error)
}

// Close *sql.DB
func (db *DB) CloseDB() {
	db.Close()
}

//pretty much Context is a type DBQueries interface.

// DbUserTable returns a query to the users table for duplicates.
func (db *DB) DbUserTable(user, address  string) (string, error) {

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

func (db *DB) DbSpotifyUserTable(query,s_id string) (spotify_id string,err error) {
	err = db.QueryRow(query, s_id).Scan(&spotify_id)
	return
}

func (db *DB) DbSpotifyTokenTable(query, s_id string) (spotify_id string, err error) {
	err = db.QueryRow(query, s_id).Scan(&spotify_id)
	return
}

func (db *DB) DbSpotifyGetToken(query, s_id string) (t models.Token, err error) {
	err = db.QueryRow(query, s_id).Scan(&t.Access,&t.Refresh,&t.Type,&t.Expiry)
	return
}

func (db *DB) DbModeTable(mode string) (round_id int64, err error) {
	err = db.QueryRow("SELECT round_id FROM rounds WHERE mode_name=?", mode).Scan(&round_id)
	return
}

func (db *DB) Prepare(q string) (*sql.Stmt, error) {
	return db.Prepare(q)
}


// NewContext creates a new Context object for EACH HTTP request
//func NewContext() (*DB,error) {
//	var context Context
//	newDB,err := common.GetDB()
//	if err != nil {
//		return context, err
//	}
//	context = &Context{
//		SQLAbstraction: newDB,
//	}
//	return context,err
//}