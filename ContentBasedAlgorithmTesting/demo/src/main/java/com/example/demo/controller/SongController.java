package com.example.demo.controller;

import com.example.demo.model.Artist;
import com.example.demo.model.Genre;
import com.example.demo.model.Song;
import com.example.demo.repository.ArtistRep;
import com.example.demo.repository.GenreRepo;
import com.example.demo.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
public class SongController {

    private final SongRepository songRepository;

    @Autowired
    GenreRepo genreRepo;

    @Autowired
    ArtistRep artistRep;

    public SongController(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    @PostMapping
    public ResponseEntity<Song> addSong(@RequestBody Song song,
                                        @RequestParam("genre_id") int genreId,
                                        @RequestParam("artist_id") int artistId) {
        // Retrieve the Genre and Artist by their IDs
        Genre genre = genreRepo.findById(genreId)
                .orElseThrow(() -> new RuntimeException("Genre not found"));

        Artist artist = artistRep.findById(artistId)
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        System.out.println(genre.getName() +" "+ artist.getName());
        // Set the genre and artist for the song using the correct setter methods
        song.addGenre(genre);
        song.addArtist(artist);

        // Save the song
        Song savedSong = songRepository.save(song);

        // Return the saved song as the response
        return ResponseEntity.ok(savedSong);
    }

    // Optional: Get all songs (for testing)
    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs() {
        return ResponseEntity.ok(songRepository.findAll());
    }
}
