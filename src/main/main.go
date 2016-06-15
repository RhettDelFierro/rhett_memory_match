package main

import (
	"net/http"
	"html/template"
	"log"
	"github.com/RhettDelFierro/GolangPHP/src/controllers"
)

var tmpl *template.Template

//parse the html template files
func init() {
	var err error
	tmpl, err = template.ParseFiles("public/dist/index.html")
	if err != nil {
		log.Fatalln(err)
	}
}

//the HandlerFunc inject() was defined here.


//Inject is pretty much where all the route handling takes place.
//Don't know if we need the http.ListenAndServe function in main.
func main() {
	//http.HandleFunc("/", inject)
	controllers.Inject(tmpl)
	http.ListenAndServe(":8080", nil)
}