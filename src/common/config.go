package common

import (
	"fmt"
	"encoding/json"
	"os"
	"net/http"
)

var DBConfig configuration

type (
	appError struct {
		Error      string `json:"error"`
		Message    string `json:"message"`
		HttpStatus int    `json:"status"`
	}

	errorResource struct {
		Data appError `json:"data"`
	}

	configuration struct {
		Server, DBHost, DBUser, DBPwd, Database string
	}
)

func InitAll(){
	initKeys()
	loadDBConfig()
	createDbSession()
}

//handle app errors
func DisplayAppError(w http.ResponseWriter, handlerError error, message string, code int) {
	errObj := appError{
		Error:      handlerError.Error(),
		Message:    message,
		HttpStatus: code,
	}
	//log.Printf("AppError]: %s\n", handlerError)
	fmt.Println("AppError]: %s\n", handlerError)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	if j, err := json.Marshal(errorResource{Data: errObj}); err == nil {
		w.Write(j)
	}
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