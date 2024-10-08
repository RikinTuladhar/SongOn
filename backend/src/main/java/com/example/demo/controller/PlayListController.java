package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.PlayListModel;
import com.example.demo.models.SongModel;
import com.example.demo.models.User;
import com.example.demo.others.ErrorMessage;
import com.example.demo.others.Message;
import com.example.demo.repo.PlayListRepo;
import com.example.demo.repo.SongRepo;
import com.example.demo.repo.UserRepository;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/playlist")
@CrossOrigin
public class PlayListController {
    @Autowired
    PlayListRepo playListRepo;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SongRepo songRepo;

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlayListById(@PathVariable int id) {
        Optional<PlayListModel> playlist = playListRepo.findById(id);
        if (playlist.isPresent()) {
            return ResponseEntity.ok(playlist);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/by-user/{id}")
    public ResponseEntity<?> getPlayListByUser(@PathVariable int id) {
        List<PlayListModel> playlists = playListRepo.findByUserId(id);
        return ResponseEntity.ok(playlists);
    }

    @PostMapping("/user_id/{id}")
    public ResponseEntity<?> addToPlayListToUser(@RequestBody PlayListModel playListModel, @PathVariable int id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            playListModel.setUserPlayList(user.get());
            playListRepo.save(playListModel);
            Message message = new Message("Added User Playlist");
            return ResponseEntity.ok(message);

        } else {
            ErrorMessage errorMessage = new ErrorMessage("Did not find user");
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
    @PostMapping("/playlist_id/{p_id}/song_id/{s_id}")
    public ResponseEntity<?> addSongToPlayList(@PathVariable("p_id") int p_id, @PathVariable("s_id") int s_id) {
        Optional<PlayListModel> playlist = playListRepo.findById(p_id);
        Optional<SongModel> song = songRepo.findById(s_id);
        
    
        if (playlist.isPresent() && song.isPresent()) {
            PlayListModel currentPlaylist = playlist.get();
            SongModel currentSong = song.get();
            
            // Check if the song is already in the playlist
            if (currentPlaylist.getSongModels().contains(currentSong)) {
                Message message = new Message("Already added to playlist");
                return ResponseEntity.ok(message);
            }
    
            // Add song to playlist if it's not already present
            currentPlaylist.getSongModels().add(currentSong);
            playListRepo.save(currentPlaylist);
    
            Message message = new Message("Added song to playlist");
            return ResponseEntity.ok(message);
    
        } else {
            ErrorMessage errorMessage = new ErrorMessage("Did not find playlist or song");
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlayList(@PathVariable int id) {
        Optional<PlayListModel> isPlayList = playListRepo.findById(id);
        if (isPlayList.isPresent()) {
            playListRepo.deleteById(id);
            Message message = new Message("Deleted Playlist");
            return ResponseEntity.ok(message);
        } else {
            ErrorMessage errorMessage = new ErrorMessage("Did not find playlist");
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    @DeleteMapping("/by-user/song_id/{id}")
    public ResponseEntity<?> deleteSongFromPlayList(@PathVariable("id") int id) {
        Integer count = playListRepo.countSongIdInPlayListBridgeTable(id);
        if (count > 0) {
            playListRepo.deleteSongIdInPlayListBridgeTable(id);
            Message message = new Message("Deleted song from playlist");
            return ResponseEntity.ok(message);
        } else {
            ErrorMessage errorMessage = new ErrorMessage("Did not found any song in playlist");
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

}
