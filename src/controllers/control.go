package controllers

import (
	"net/http"
	"html/template"
	"os"
	"bufio"
	"github.com/gorilla/mux"
	//"github.com/codegangsta/negroni"
	"github.com/codegangsta/negroni"
)

//this is pretty much where all the route handlers are.
func Inject(tmpl *template.Template) {
	router := mux.NewRouter()


	//private
	//wrapping middleware to provide authentication for create and delete operations.
	router.PathPrefix("/api/delete/{id}").Handler(
		negroni.New(
			negroni.HandlerFunc(AuthorizeToken),
			negroni.Wrap(http.HandlerFunc(deleteGrade))))
	router.PathPrefix("/api/add").Handler(
		negroni.New(
		negroni.HandlerFunc(AuthorizeToken),
		negroni.Wrap(http.HandlerFunc(postStudent))))

	http.Handle("/", router)


	http.HandleFunc("/index_bundle.js", javascript)
}

func javascript(w http.ResponseWriter, req *http.Request){
	path := "public/dist/" + req.URL.Path

	f, err := os.Open(path)

	if err == nil {
		defer f.Close()

		w.Header().Add("Content Type", "text/javascript")
		br := bufio.NewReader(f)
		br.WriteTo(w)
	} else {
		w.WriteHeader(404)
	}
}