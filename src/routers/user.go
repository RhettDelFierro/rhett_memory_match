package routers

import (
	"github.com/gorilla/mux"
	"github.com/RhettDelFierro/rhett_memory_match/src/controllers"
)

func SetUserRoutes(router *mux.Router) *mux.Router {
	router.HandleFunc("/users/register", controllers.Register).Methods("POST")
	router.HandleFunc("/users/login", controllers.Login).Methods("POST")
	return router
}
