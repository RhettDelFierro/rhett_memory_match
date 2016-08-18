package common

import (
	"log"

	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"fmt"
)

var db *sql.DB

func GetDB() *sql.DB {
	if db == nil {
		var err error
		setup := fmt.Sprintf("%s:%s@tcp(%s)/%s", DBConfig.DBUser, DBConfig.DBPwd, DBConfig.DBHost, DBConfig.Database)
		db, err = sql.Open("mysql", setup)
		if err != nil {
			log.Fatalf("[GetDB]: %s\n", err)
		}
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