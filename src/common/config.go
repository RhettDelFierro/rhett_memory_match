package common

import (
	"fmt"
	"encoding/json"
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

//
func InitAll(){
	initKeys()
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
