package main

import (
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"log"
	"fmt"
	"os"
	"encoding/json"
)

var DBConfig configuration

type configuration struct {
	Server, DBHost, DBUser, DBPwd, Database string
}

// Reads config.json and decode into AppConfig
func loadAppConfig() {
	file, err := os.Open("./config.json")
	defer file.Close()
	if err != nil {
		fmt.Printf("loadAppConfig error: %s\n", err)
	}
	decoder := json.NewDecoder(file)
	DBConfig = configuration{}
	err = decoder.Decode(&DBConfig)
	if err != nil {
		fmt.Printf("loadAppConfigError: %s\n", err)
	}
}

//Entry point of the program
func main() {

	loadAppConfig()

	setup := fmt.Sprintf("%s:%s@tcp(%s)/%s", DBConfig.DBUser, DBConfig.DBPwd, DBConfig.Server, DBConfig.Database)
	db, err := NewOpen("mysql", setup)
	if err != nil {
		log.Println(err)
	}

	defer db.Close()

	router := Router(db)

	http.ListenAndServe(":8000", router)
}