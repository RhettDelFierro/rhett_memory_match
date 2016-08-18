package controllers

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
)

// Context used for maintaining HTTP Request Context
type Context struct {
	SQLAbstraction *sql.DB
	User         string
}

// Close mgo.Session
func (c *Context) Close() {
	c.SQLAbstraction.Close()
}

// DbCollection returns mgo.collection for the given name
func (c *Context) DbTable(table, username, email  string) (*sql.Rows, error) {
	return c.SQLAbstraction.Query("Select * from ? WHERE username = ? || email = ?", table, username, email)
}

func (c *Context) PrepareRegisterStudent() (*sql.Stmt, error) {
	return c.SQLAbstraction.Prepare("INSERT INTO users(username,email,password) VALUES(?,?,?)")
}

// NewContext creates a new Context object for EACH HTTP request
func NewContext() *Context {
	db := common.GetDB()
	context := &Context{
		SQLAbstraction: db,
	}
	return context
}