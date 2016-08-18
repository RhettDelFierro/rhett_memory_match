package common

import (
	"fmt"
	"encoding/json"
	"os"
)

var DBConfig configuration

type (
	configuration struct {
		Server, DBHost, DBUser, DBPwd, Database string
	}
)

func InitAll(){
	initKeys()
	loadDBConfig()
	createDbSession()
}

//loads the fields for the DB and sets them to DBConfig.
func loadDBConfig() {
	file, err := os.Open("src/common/config.json")
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