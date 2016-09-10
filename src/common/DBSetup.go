package common

import (
	"log"

	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"fmt"
)

//var db *sql.DB

//func GetDB() *sql.DB {
//	err := db.Ping()
//
//	if err != nil || db == nil {
//		createDbSession()
//	}
//
//	return db
//}

//checks if DB is still
func GetDB(db *sql.DB) (*sql.DB,error) {

	err := db.Ping()

	if err != nil || db == nil {
		newDB, err := createDbSession()
		return newDB,err
	}

	return db, err
}

//func createDbSession() {
//	var err error
//	setup := fmt.Sprintf("%s:%s@tcp(%s)/%s", AppConfig.DBUser, AppConfig.DBPwd, AppConfig.DBHost, AppConfig.Database)
//	db, err = sql.Open("mysql", setup)
//	if err != nil {
//		log.Fatalf("[createDBSession]: %s\n", err)
//	}
//}

func createDbSession() (db *sql.DB,err error){
	var AppConfig configuration

	AppConfig = getAppConfig()

	setup := fmt.Sprintf("%s:%s@tcp(%s)/%s", AppConfig.DBUser, AppConfig.DBPwd, AppConfig.DBHost, AppConfig.Database)
	db, err = sql.Open("mysql", setup)
	if err != nil {
		return
		log.Fatalf("[createDBSession]: %s\n", err)
	}

	return
}

