package routers

import (
	"github.com/gorilla/mux"
)

func InitRoutes() *mux.Router {
	///"/path/" and "/path" are not the same routes.
	router := mux.NewRouter().StrictSlash(false)
	// Routes for the User entity
	router = SetUserRoutes(router)
	// Routes for the Task entity
	router = SetScoresRoutes(router)
	return router
}
