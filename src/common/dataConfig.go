package common

import (
	//works behind the scenes with the driver:
	_ "github.com/go-sql-driver/mysql"
	"log"
	"database/sql"
	"fmt"
	"os"
	"encoding/json"
)

const (
	dbKey = "src/keys/config.json"
)

var DBConfig config

type config struct {
	Server, DBUser, DBPw, DBName string
}

func init() {
	dbInit()
}

func dbInit() {
	file, err := os.Open(dbKey)
	defer file.Close()
	if err != nil {
		fmt.Println("error in dbInit() os.Open")
		panic(err)
	}

	decoder := json.NewDecoder(file)
	DBConfig = config{}
	err = decoder.Decode(&DBConfig)
	if err != nil {
		fmt.Println("error in dbInit() decoder.Decode()")
		panic(err)
	}

	//DB session:
	setup := fmt.Sprintf("%s:%s@tcp(%s)/%s", DBConfig.DBUser, DBConfig.DBPw, DBConfig.Server, DBConfig.DBName)
	db, err := sql.Open("mysql", setup)
	if err != nil {
		log.Println(err)
	}
	defer db.Close()
}

func Start() {
	dbInit()
}