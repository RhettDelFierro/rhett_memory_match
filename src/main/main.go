package main

import (
	"net/http"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
)

const (
	dbKey = "src/keys/config.sys"
)


func homePage(res http.ResponseWriter, req *http.Request) {
	http.ServeFile(res, req, "index.html")
}

func main() {
	common.Start()
	http.HandleFunc("/", homePage)
	http.ListenAndServe(":8000", nil)
}