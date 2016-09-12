package main

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/rs/cors"
	"net/http"
	"github.com/gorilla/context"
	"github.com/RhettDelFierro/rhett_memory_match/src/controllers"
	"log"
)

type Env struct {
	db controllers.DBQueries
}


//Entry point of the program
func main() {
	common.InitAll()
	//move this to portable DBConfig (proably in dbAbstraction.go
	db, err := common.CreateDbSession()
	if err != nil {
		log.Panic(err)
	}

	env := &Env{db}

	router := Router(env)
	handler := cors.Default().Handler(router)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:8080", "https://accounts.spotify.com", "*"},
		AllowCredentials: true,
		AllowedHeaders: []string{"Authorization","Content-Type", "Cookie"},
	})

	// Insert the middleware
	handler = c.Handler(handler)
	http.ListenAndServe(":8000", context.ClearHandler(handler))
}