package main

import (
	_ "github.com/go-sql-driver/mysql"
	//"net/http"
	//"github.com/RhettDelFierro/rhett_memory_match/src/routers"
	//"github.com/RhettDelFierro/rhett_memory_match/src/common"
	//"github.com/gorilla/mux"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/routers"
	"github.com/rs/cors"
	"net/http"
	"github.com/gorilla/context"
)

// Reads config.json and decode into AppConfig

//Entry point of the program
func main() {
	common.InitAll()
	//move this to portable DBConfig (proably in dbAbstraction.go

	router := routers.Router()
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

//func main() {
//	common.InitAll()
//
//	r := routers.Router()
//	http.Handle("/", &MyServer{r})
//	http.ListenAndServe(":8000", nil);
//
//
//}

//type MyServer struct {
//	r *mux.Router
//}
//
//func (s *MyServer) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
//	if origin := req.Header.Get("Origin"); origin != "" {
//		rw.Header().Set("Access-Control-Allow-Origin", origin)
//		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
//		rw.Header().Set("Access-Control-Allow-Headers",
//			"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
//		rw.Header().Set("Access-Control-Allow-Credentials", "true")
//	}
//	// Stop here if its Preflighted OPTIONS request
//	if req.Method == "OPTIONS" {
//		return
//	}
//	// Lets Gorilla work
//	s.r.ServeHTTP(rw, req)
//}