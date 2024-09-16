package com.example.demo.controller;

import com.example.demo.model.Song;
import com.example.demo.repository.SongRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
public class SongController {

    private final SongRepository songRepository;

    public SongController(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    // POST request to add a new song
    @PostMapping
    public ResponseEntity<Song> addSong(@RequestBody Song song) {
        Song savedSong = songRepository.save(song);
        return ResponseEntity.ok(savedSong);  // Return the saved song as the response
    }

    // Optional: Get all songs (for testing)
    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs() {
        return ResponseEntity.ok(songRepository.findAll());
    }
}

