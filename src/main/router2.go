package main

import (
	"io"
	"os"
	"time"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"

	"github.com/RhettDelFierro/rhett_memory_match/src/common"
)

type Route struct {
	Name		string
	Method		string
	Pattern		string
	HandlerFunc	http.HandlerFunc
}

type Routes []Route

func NewRouter(db DataHandler) *mux.Router {
	fe := FrontEnd{DataHandler: db}

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/users/register", fe.RegisterUser)

	return router
}

type DataHandler interface {
	RegisterUser(usr User) (err error)
}

type FrontEnd struct {
	DataHandler
}


//can make this a separate controller function.
//don't forget to send back
func (fe FrontEnd) RegisterUser(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	usr := User{
		Username: r.Form.Get("username"),
		Email: r.Form.Get("email"),
		Password: r.Form.Get("password"),
	}

	err = fe.DataHandler.RegisterUser(usr)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}