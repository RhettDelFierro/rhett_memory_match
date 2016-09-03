package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
)

var (
	userEndpoint = "https://api.spotify.com/v1/me"
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