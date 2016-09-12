package common

import (

	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"fmt"
	"os"
)

func CreateDbSession() (db *sql.DB, err error) {
	var AppConfig configuration

	AppConfig = getDBConfig()

	setup := fmt.Sprintf("%s:%s@tcp(%s)/%s", AppConfig.DBUser, AppConfig.DBPwd, AppConfig.DBHost, AppConfig.Database)
	db, err = sql.Open("mysql", setup)
	if err != nil {
		return nil,err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return
}

func getDBConfig() (AppConfig configuration) {

	server := os.Getenv("localhost:8000")
	dbHost := os.Getenv("PERFECT_PITCH_DATABASE_HOST")
	dbUser := os.Getenv("PERFECT_PITCH_DATABASE_USER")
	dbPwd := os.Getenv("PERFECT_PITCH_DATABASE_PWD")
	db := os.Getenv("DATABASE_PP")

	AppConfig = configuration{
		Server: server,
		DBHost: dbHost,
		DBUser: dbUser,
		DBPwd: dbPwd,
		Database: db,
	}
	return
}
