package controllers

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/RhettDelFierro/rhett_memory_match/src/common"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

// Context used for maintaining HTTP Request Context
type Context struct {
	SQLAbstraction *sql.DB
	User           string
	Spotify_id     string
	ID             int64
}

type DBQueries interface {
	Close()
	DbUserTable(user, address  string) (string, error)
	DbSpotifyUserTable(query string) (spotify_id string,err error)
	DbSpotifyTokenTable(query string) (spotify_id string, err error)
	DbModeTable(mode string) (round_id int64, err error)
	Prepare(q string) (*sql.Stmt, error)
}

// Close *sql.DB
func (c *Context) Close() {
	c.SQLAbstraction.Close()
}

//pretty much Context is a type DBQueries interface.

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

func (c *Context) DbSpotifyUserTable(query string) (spotify_id string,err error) {
	err = c.SQLAbstraction.QueryRow(query, c.Spotify_id).Scan(&spotify_id)
	return
}

func (c *Context) DbSpotifyTokenTable(query string) (spotify_id string, err error) {
	err = c.SQLAbstraction.QueryRow(query, c.Spotify_id).Scan(&spotify_id)
	return
}

func (c *Context) DbSpotifyGetToken(query string) (t models.Token, err error) {
	err = c.SQLAbstraction.QueryRow(query, c.Spotify_id).Scan(&t.Access,&t.Refresh,&t.Type,&t.Expiry)
	return
}

func (c *Context) DbModeTable(mode string) (round_id int64, err error) {
	err = c.SQLAbstraction.QueryRow("SELECT round_id FROM rounds WHERE mode_name=?", mode).Scan(&round_id)
	return
}

func (c *Context) Prepare(q string) (*sql.Stmt, error) {
	return c.SQLAbstraction.Prepare(q)
}


// NewContext creates a new Context object for EACH HTTP request
func NewContext() *Context {
	db,_ := common.GetDB()
	context := &Context{
		SQLAbstraction: db,
	}
	return context
}