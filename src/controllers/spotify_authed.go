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
	audioFeatureEndpoint = "https://api.spotify.com/v1/audio-features?ids="
)

type songContainer struct {
	Track song `json:"track"`
}
type song struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Artists []Artist `json:"artists"`
	URI     string `json:"uri"`
	Key int `json:"key"`
}

type playlist struct {
	songContainer []songContainer `json:"items"`
}

type Artist struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type songWithKey struct {
	Id string `json:"id"`
	Key int `json:"key"`
}

type songFeatures struct {
	features []songWithKey `json:"audio_features"`
}

type fullSong struct {
	Key int `json:"key"`
	Name string `json:"name"`
	Artist []Artist `json:"artists"`
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
func (s SpotifyClient) GetSongs() (songs []song, err error) {
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

	for index, songContainer := range playlist.songContainer {
		songs[index] = songContainer.Track
	}

	return
}

func (s *SpotifyClient) GetSongKeys(songList []song) (songs []song, err error) {
	var songfeatures songFeatures
	searchURL := audioFeatureEndpoint
	//add songIds:
	for _, songInfo := range songList {
		searchURL += songInfo.Id
	}
	resp, err := s.http.Get(searchURL)
	if err != nil {
		return songs, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		err = json.NewDecoder(resp.Body).Decode(&songfeatures)
		if err != nil {
			return
		}
	}

	for index, song := range songfeatures.features {
		id := song.Id
		for _, songinfo := range songList {
			if songinfo.Id == id {
				songs[index] = fullSong{
					Key: song.Key,
					Name: songinfo.Name,
					Artist: songinfo.Artists,
				}
			}
		}
	}

	return

}

func GetSongsByKey(keys []string) (fullSongs []fullSong, err error) {

	songs, err := client.GetSongs()
	if err != nil {
		return
	}
	fullSongs, err = client.GetSongKeys(songs)
	//not yet returning, but get the songs by key that you wanted.
	return
}