package data

import (
	"github.com/RhettDelFierro/rhett_memory_match/src/models"

	_ "github.com/go-sql-driver/mysql"
	"database/sql"
)

type TokenRepository struct {
	R *sql.Row
	S *sql.Stmt
}

func (r *TokenRepository) StoreNewToken(token models.Token, spotify_id string) (err error) {

	_, err = r.S.Exec(spotify_id, token.Access, token.Refresh, token.Type, token.Expiry, )

	return
}

func (r *TokenRepository) UpdateToken(token models.Token, spotify_id string) (err error) {

	_, err = r.S.Exec(token.Access, token.Refresh, token.Type, token.Expiry, spotify_id)

	return
}