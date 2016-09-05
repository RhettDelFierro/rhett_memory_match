package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

var (
	userEndpoint = "https://api.spotify.com/v1/me"
	getSongsEndpoint = "https://api.spotify.com/v1/tracks/"
	searchEndpoint = "https://api.spotify.com/v1/search"
)

func (s *SpotifyClient) GetCurrentProfile() (user *models.SpotifyAuthedUserProfile,err error) {
	resp, err := s.http.Get(userEndpoint)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		err = json.NewDecoder(resp.Body).Decode(&user)
		if err != nil {
			return nil, err
		}
	}
	return
}

func (s *SpotifyClient) GetSongKeys(keys ...string) {

}

//default is top 40:
func (r *RegularClient) GetSongs() ([]string){

	searchURL := searchEndpoint

	resp, err := r.http.Get(searchURL)
}

func GetSongsByKey(keys ...string) (songs []string, err error) {
	client := &RegularClient{
		http: new(http.Client),
	}

	client.GetSongs()
}