package controllers

import (
	"net/http"
	//"github.com/RhettDelFierro/GolangPHP/src/viewmodels"
	"html/template"
	"github.com/RhettDelFierro/GolangPHP/src/controllers/util"
)

type homeController struct {
	template *template.Template
}

func (this *homeController) get(w http.ResponseWriter, req *http.Request){
	//vm := viewmodels.GetGrades()
	w.Header().Add("Content Type", "text/html")
	responseWriter := util.GetResponseWriter(w, req)
	defer responseWriter.Close()
	//this.template.Execute(w, nil) substituted for the line below.
	this.template.Execute(responseWriter, nil)
}