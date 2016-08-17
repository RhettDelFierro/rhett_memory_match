package main

import (
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"fmt"
	"os"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/routers"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

var DBConfig configuration

type configuration struct {
	Server, DBHost, DBUser, DBPwd, DBHost, Database string
}

// Reads config.json and decode into AppConfig
func init() {
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

	setup := fmt.Sprintf("%s:%s@tcp(%s)/%s", DBConfig.DBUser, DBConfig.DBPwd, DBConfig.DBHost, DBConfig.Database)
	db := models.InitDB("mysql", setup)

	defer db.Close()

	router := routers.Router()

	http.ListenAndServe(":8000", router)
}