package common

import (
	"fmt"
	"encoding/json"
	"os"
	"net/http"
)

var AppConfig configuration

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
		Server, DBHost, DBUser, DBPwd, Database, Secret string
	}
)

func InitAll(){
	initKeys()
	loadAppConfig()
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
	fmt.Printf("AppError: %s\n", handlerError)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	if j, err := json.Marshal(errorResource{Data: errObj}); err == nil {
		w.Write(j)
	}
}

//loads the fields for the DB/jwtsecret and sets them to AppConfig.
func loadAppConfig() {
	file, err := os.Open("src/common/config.json")
	defer file.Close()
	if err != nil {
		fmt.Printf("loadAppConfig error: %s\n", err)
	}
	decoder := json.NewDecoder(file)
	AppConfig = configuration{}
	err = decoder.Decode(&AppConfig)
	if err != nil {
		fmt.Printf("loadAppConfigError: %s\n", err)
	}

}