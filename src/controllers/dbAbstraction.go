package controllers

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
)

// Context used for maintaining HTTP Request Context
type Context struct {
	SQLAbstraction *sql.DB
	User           string
}

//this means, that context is a UserDataHandler interface.
//it'll also be one for Scores as well.
//the repos for users and scores will use the methods from here to establish the tables.
//the data from the tables will be CRUDed from repos methods.
//but you want the *sql.DB abstraction here so they all can access this SAME db.

//in summary, the statements and rows are all from Context.SQLAbstraction
//the interface so I can pass this into functions. May not need the interface though.
type UserDataHandler interface {
	DbTable(table, username, email  string) (*sql.Rows, error)
	PrepareRegisterStudent() (*sql.Stmt, error)
}

// Close *sql.DB
func (c *Context) Close() {
	c.SQLAbstraction.Close()
}

// DbUserTable returns a query to the users table for duplicates.
func (c *Context) DbUserTable(user, address  string) (string, error) {

	var user_id int64
	var username string
	var email string
	var q = "SELECT user_id, email, username FROM users WHERE username=? || email=?"

	err := c.SQLAbstraction.QueryRow(q, user, address).Scan(&user_id, &email, &username)

	if err == nil {
		if user == username {
			return username, nil
		} else {
			return email, nil
		}
	}
	return "", err
}

func (c *Context) DbModeTable(mode string) (round_id int64,err error) {

	var round_id int64
	var q = "SELECT round_id FROM rounds WHERE mode_name=?"

	err = c.SQLAbstraction.QueryRow(q, mode).Scan(&round_id)

	return
}


//prepares the insert statement.
func (c *Context) PrepareRegisterUser() (*sql.Stmt, error) {
	return c.SQLAbstraction.Prepare("INSERT INTO users(username,email,password) VALUES(?,?,?)")
}

func (c *Context) PrepareLoginUser() (*sql.Stmt, error) {
	return c.SQLAbstraction.Prepare("SELECT user_id,username,email,password FROM users WHERE email = ?")
}

func (c *Context) PrepareInsertScore() (*sql.Stmt, error) {
	return c.SQLAbstraction.Prepare("INSERT INTO scores(round_id,score,user_id) VALUES(?,?,?)")
}


// NewContext creates a new Context object for EACH HTTP request
func NewContext() *Context {
	db := common.GetDB()
	context := &Context{
		SQLAbstraction: db,
	}
	return context
}