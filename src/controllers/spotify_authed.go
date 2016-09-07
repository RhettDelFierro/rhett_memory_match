package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/RhettDelFierro/rhett_memory_match/src/models"
	//"strconv"
)

var (
	userEndpoint = "https://api.spotify.com/v1/me"
	getSongsEndpoint = "https://api.spotify.com/v1/tracks/"
	searchEndpoint = "https://api.spotify.com/v1/search"
	viralEndpoint = "https://api.spotify.com/v1/users/spotify/playlists/5FJXhjdILmRA2z5bvz4nzf/tracks"
	audioFeatureEndpoint = "https://api.spotify.com/v1/audio-features?ids="
)

type SongContainer struct {
	Track Song `json:"track"`
}
type Song struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Artists []Artist `json:"artists"`
	URI     string `json:"uri"`
	Key int `json:"key"`
}

type playlist struct {
	SongContainer []SongContainer `json:"items"`
}

type Artist struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type SongWithKey struct {
	Id string `json:"id"`
	Key int `json:"key"`
}

type SongFeatures struct {
	Features []SongWithKey `json:"audio_features"`
}

type FullSong struct {
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
func (s SpotifyClient) GetSongs() (songs []Song, err error) {
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

	for _, songContainer := range playlist.SongContainer {
		songs = append(songs, songContainer.Track)
	}

	return
}

func (s SpotifyClient) GetSongKeys(songList []Song) (songs []FullSong, err error) {
	var songfeatures SongFeatures
	searchURL := audioFeatureEndpoint
	//add songIds:
	for _, songInfo := range songList {
		searchURL += songInfo.Id + ","
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
	for _, song := range songfeatures.Features {
		id := song.Id
		for _, songinfo := range songList {
			if songinfo.Id == id {
				songs = append(songs,FullSong{
					Key: song.Key,
					Name: songinfo.Name,
					Artist: songinfo.Artists,
				})
			}
		}
	}

	return

}

func GetSongsByKey(keys []int,client SpotifyClient) (songsWithKey map[string][]FullSong, err error) {

	//may have to channel into here.
	noteMap := map[int]string{
		0: "C",
		1: "Db",
		2: "D",
		3: "Eb",
		4: "E",
		5: "F",
		6: "Gb",
		7: "G",
		8: "Ab",
		9: "A",
		10: "Bb",
		11: "B",
	}

	songs, err := client.GetSongs()
	if err != nil {
		return
	}

	fullSongs, err := client.GetSongKeys(songs)
	if err != nil {
		return
	}
	songsWithKey = make(map[string][]FullSong)

	for _,value := range keys {
		//key, _ := strconv.Atoi(value)
		//key := strconv.Itoa(value)
		for _,song := range fullSongs {
			if value == song.Key {
				//n := len(songsWithKey[key])
				songsWithKey[noteMap[value]] = append(songsWithKey[noteMap[value]],song)
			}
		}
	}

	return
}