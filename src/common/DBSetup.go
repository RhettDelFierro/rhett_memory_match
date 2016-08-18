package common

import (
	"log"

	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"fmt"
)

var db *sql.DB

func GetDB() *sql.DB {
	err := db.Ping()

	if err != nil || db == nil {
		createDbSession()
	}

	return db
}

func createDbSession() {
	var err error
	setup := fmt.Sprintf("%s:%s@tcp(%s)/%s", DBConfig.DBUser, DBConfig.DBPwd, DBConfig.DBHost, DBConfig.Database)
	db, err = sql.Open("mysql", setup)
	if err != nil {
		log.Fatalf("[createDBSession]: %s\n", err)
	}
}