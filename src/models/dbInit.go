package models

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"log"
)

var db *sql.DB

func InitDB(driver string, databaseSource string) (db *sql.DB) {
	var err error
	db, err = sql.Open(driver, databaseSource)
	if err != nil {
		log.Panic(err)
	}

	if err = db.Ping(); err != nil {
		log.Panic(err)
	}

	return db
}

