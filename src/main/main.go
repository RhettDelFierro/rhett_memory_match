package main

import (
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"fmt"
	"os"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/routers"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
)

var DBConfig configuration

type configuration struct {
	Server, DBHost, DBUser, DBPwd, Database string
}

// Reads config.json and decode into AppConfig
func init() {
	file, err := os.Open("src/main/config.json")
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
	common.InitKeys()
}

//Entry point of the program
func main() {

	setup := fmt.Sprintf("%s:%s@tcp(%s)/%s", DBConfig.DBUser, DBConfig.DBPwd, DBConfig.DBHost, DBConfig.Database)
	db := models.InitDB("mysql", setup)
	fmt.Println("here is db:", db)
	defer db.Close()

	router := routers.Router()

	http.ListenAndServe(":8000", router)
}