package routers

import (
	"github.com/gorilla/mux"
	"github.com/RhettDelFierro/rhett_memory_match/src/controllers"
)

func Router() *mux.Router {

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/users/register", controllers.RegisterUser)

	return router
}