package routers

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/controllers"
)

// SetTaskRoutes configures routes for task entity
func SetScoresRoutes(router *mux.Router) *mux.Router {
	taskRouter := mux.NewRouter()
	taskRouter.HandleFunc("/scores", controllers.CreateTask).Methods("POST")
	taskRouter.HandleFunc("/scores/{id}", controllers.UpdateTask).Methods("PUT")
	taskRouter.HandleFunc("/scores", controllers.GetTasks).Methods("GET")
	taskRouter.HandleFunc("/scores/{id}", controllers.GetTaskByID).Methods("GET")
	taskRouter.HandleFunc("/scores/users/{id}", controllers.GetTasksByUser).Methods("GET")
	taskRouter.HandleFunc("/scores/{id}", controllers.DeleteTask).Methods("DELETE")
	router.PathPrefix("/tasks").Handler(negroni.New(
		negroni.HandlerFunc(common.Authorize),
		negroni.Wrap(taskRouter),
	))
	return router
}
