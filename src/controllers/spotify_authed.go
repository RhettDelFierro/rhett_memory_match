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
	viralEndpoint = "https://api.spotify.com/v1/users/spotify/playlists/5FJXhjdILmRA2z5bvz4nzf/tracks"
	audioFeatureEndpoint = "https://api.spotify.com/v1/audio-features"
)

type songContainer struct {
	Track song `json:"track"`
}
type song struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Artists []Artist `json:"artists"`
	URI     string `json:"uri"`
}

type playlist struct {
	songContainer []songContainer `json:"items"`
}

type Artist struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type feature struct {

}

func (s SpotifyClient) GetCurrentProfile() (user *models.SpotifyAuthedUserProfile, err error) {
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

//default are viral songs:
func (s SpotifyClient) GetSongs() (songs []string, err error) {
	var playlist playlist
	//get the playlist, then do a search on the playlist.
	searchURL := viralEndpoint
	resp, err := s.http.Get(searchURL)

	defer resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		err = json.NewDecoder(resp.Body).Decode(&playlist)
		if err != nil {
			return
		}
	}

	songs = make([]string, len(playlist.songContainer))

	for index, songContainer := range playlist.songContainer {
		songs[index] = songContainer.Track.Id
	}

	return
}

func (s *SpotifyClient) GetSongKeys(songIds []string) (songs []string, err error) {
	var songs feature
	searchURL := audioFeatureEndpoint
	resp, err := s.http.Get(searchURL)
	if err != nil {
		return songs, err
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		err = json.NewDecoder(resp.Body).Decode(&playlist)
		if err != nil {
			return
		}
	}
}

func GetSongsByKey(keys []string) (songs []string, err error) {

	songIds, err := client.GetSongs()
	if err != nil {
		return
	}
	songs, err = client.GetSongKeys(songIds)

	return
}