package data
import (
	"database/sql"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"

)

type ScoresRepository struct {
	R *sql.Row
	S *sql.Stmt
}

func (r *ScoresRepository) InsertScore(score *models.Score) (interface{}, error) {
	if (score.Spotify_ID == "") {
		return r.S.Exec(score.Round_ID, score.Score,score.User_ID)
	}
	return r.S.Exec(score.Round_ID, score.Score,score.Spotify_ID)

}