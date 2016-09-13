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
	return tx,err
}

func (db *DB) CloseDB() {
	db.Close()
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

