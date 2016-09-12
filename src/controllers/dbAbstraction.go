package controllers

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

type Env struct {
	DB DBQueries
}


// Context used for maintaining HTTP Request Context
type DB struct {
	*sql.DB
}
type DBQueries interface {
	Close()
	DbUserTable(user, address  string) (string, error)
	DbSpotifyUserTable(query string) (spotify_id string,err error)
	DbSpotifyTokenTable(query string) (spotify_id string, err error)
	DbSpotifyGetToken(query, s_id string) (t models.Token, err error)
	DbModeTable(mode string) (round_id int64, err error)
	Prepare(q string) (*sql.Stmt, error)
}

// Close *sql.DB
func (DB *DB) Close() {
	DB.Close()
}

//pretty much Context is a type DBQueries interface.

// DbUserTable returns a query to the users table for duplicates.
func (DB *DB) DbUserTable(user, address  string) (string, error) {

	var user_id int64
	var username string
	var email string
	var q = "SELECT user_id, email, username FROM users WHERE username=? || email=?"

	err := DB.QueryRow(q, user, address).Scan(&user_id, &email, &username)

	if err == nil {
		if user == username {
			return username, nil
		} else {
			return email, nil
		}
	}
	return "", err
}

func (DB *DB) DbSpotifyUserTable(query,s_id string) (spotify_id string,err error) {
	err = DB.QueryRow(query, s_id).Scan(&spotify_id)
	return
}

func (DB *DB) DbSpotifyTokenTable(query, s_id string) (spotify_id string, err error) {
	err = DB.QueryRow(query, s_id).Scan(&spotify_id)
	return
}

func (DB *DB) DbSpotifyGetToken(query, s_id string) (t models.Token, err error) {
	err = DB.QueryRow(query, s_id).Scan(&t.Access,&t.Refresh,&t.Type,&t.Expiry)
	return
}

func (DB *DB) DbModeTable(mode string) (round_id int64, err error) {
	err = DB.QueryRow("SELECT round_id FROM rounds WHERE mode_name=?", mode).Scan(&round_id)
	return
}

func (DB *DB) Prepare(q string) (*sql.Stmt, error) {
	return DB.Prepare(q)
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