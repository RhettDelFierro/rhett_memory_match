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
	CloseDB()
	PrepareQuery(q string) (*sql.Stmt, error)
	FindUser(user, address  string) (string, error)
	DbSpotifyUserTable(query,s_id string) (spotify_id string,err error)
	DbSpotifyTokenTable(query,s_id string) (spotify_id string, err error)
	DbSpotifyGetToken(query, s_id string) (t models.Token, err error)
	DbModeTable(mode string) (round_id int64, err error)
}

type DB struct {
	*sql.DB
}


// Close *sql.DB
func (db *DB) CloseDB() {
	db.Close()
}

//FindUser returns a query to the users table for duplicates.
func (db *DB) FindUser(user, address  string) (string, error) {

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

func (db *DB) GetOneValue(query string, args ...string) (result interface{},err error) {
	err = db.QueryRow(query,args).Scan(&result)
	return
}

func (db *DB) DbSpotifyUserTable(query,s_id string) (spotify_id string,err error) {
	err = db.QueryRow(query, s_id).Scan(&spotify_id)
	return
}

func (db *DB) DbSpotifyTokenTable(query, s_id string) (spotify_id string, err error) {
	err = db.QueryRow(query, s_id).Scan(&spotify_id)
	return
}

func (db *DB) DbModeTable(query, mode string) (round_id int64, err error) {
	err = db.QueryRow("SELECT round_id FROM rounds WHERE mode_name=?", query, mode).Scan(&round_id)
	return
}

func (db *DB) DbSpotifyGetToken(query, s_id string) (t models.Token, err error) {
	err = db.QueryRow(query, s_id).Scan(&t.Access,&t.Refresh,&t.Type,&t.Expiry)
	return
}



func (db *DB) PrepareQuery(q string) (*sql.Stmt, error) {
	return db.Prepare(q)
}