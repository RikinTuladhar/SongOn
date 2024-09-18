package com.example.demo.controller;

import com.example.demo.dto.SongWithArtistsDTO;
import com.example.demo.models.ArtistModel;
import com.example.demo.models.GenreModel;
import com.example.demo.models.SongModel;
import com.example.demo.others.ErrorMessage;
import com.example.demo.others.Message;
import com.example.demo.repo.ArtistRepo;
import com.example.demo.repo.GenreRepo;
import com.example.demo.repo.SongRepo;
import jakarta.persistence.EntityManager;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/song")
@CrossOrigin(origins = "*")
public class SongController {

    @Autowired
    SongRepo songRepo;
    // Method to retrieve all songs
    @Autowired
    ArtistRepo artistRepo;

    @Autowired
    GenreRepo genreRepo;

    @GetMapping
    public List<SongModel> getSongs() {
        List<SongModel> songs = songRepo.findAll();

        return songs;
    }

    @GetMapping("/{id}")
    public List<SongModel> getSongById(@PathVariable int id) {
        Optional<SongModel> optionalSong = songRepo.findById(id);
        if (optionalSong.isPresent()) {
            return Collections.singletonList(optionalSong.get());
        } else {
            return Collections.emptyList();
        }
    }

    @GetMapping("/with-artists")
    public List<SongModel> getSongsWithArtists() {
        return songRepo.findAllWithArtists();
    }

    @GetMapping("/by-artist/{artistId}")
    public List<SongModel> getSongsByArtistId(@PathVariable int artistId) {
        return songRepo.findSongsByArtistId(artistId);
    }

    @GetMapping("/by-genre/{genre_id}")
    public List<SongWithArtistsDTO> getSongByGenreId(@PathVariable int genre_id) {
        List<SongModel> songs = songRepo.findSongsByGenreId(genre_id);

        List<SongWithArtistsDTO> songWithArtistsDTOs = new ArrayList<>();
        for (SongModel song : songs) {
            SongWithArtistsDTO songWithArtistsDTO = new SongWithArtistsDTO();
            songWithArtistsDTO.setId(song.getId());
            songWithArtistsDTO.setName(song.getName());
            songWithArtistsDTO.setAutoPath(song.getAutoPath());
            songWithArtistsDTO.setLyrics(song.getLyrics());
            songWithArtistsDTO.setImg_path(song.getImgPath());
            songWithArtistsDTO.setArtist(new ArrayList<>(song.getArtists()));
            songWithArtistsDTOs.add(songWithArtistsDTO);
        }
        return songWithArtistsDTOs;
    }

    @PostMapping("/uploadSong")
    public ResponseEntity<?> uploadSong(
            @RequestBody SongModel songModel,
            @RequestParam("generic_id") int generic_id,
            @RequestParam("artist_id") int artist_id) {

        
        ArtistModel artistModel = artistRepo.findById(artist_id)
                .orElseThrow(() -> new RuntimeException("Artist not found"));
        GenreModel genreModel = genreRepo.findById(generic_id)
                .orElseThrow(() -> new RuntimeException("Genre not found"));

        // Check if song already exists in the database
        List<SongModel> songsToCheck = songRepo.findAll();

        for (SongModel s : songsToCheck) {
            if (songModel.equals(s)) { // Using the overridden equals method
                ErrorMessage errorMessage = new ErrorMessage("Song already exists");
                return ResponseEntity.badRequest().body(errorMessage);
            }
        }

        // Add song to artist and genre
        artistModel.songs(songModel); // Add song to artist
        genreModel.songs(songModel); // Add song to genre

        // Add artist and genre to song (to update bidirectional relationship)
        songModel.getArtists().add(artistModel); // Add artist to song
        songModel.getGenre().add(genreModel); // Add genre to song

        // Save song, artist, and genre
        songRepo.save(songModel); // Save the song with the updated relationships
        artistRepo.save(artistModel); 
        genreRepo.save(genreModel); 

        Message message = new Message("Song inserted successfully");
        return ResponseEntity.ok(message);
    }

    // delete by id
    @DeleteMapping("/delete/{id}")
    ResponseEntity<Object> deleteSong(@PathVariable int id) {
        Optional<SongModel> optionalSong = songRepo.findById(id);
        if (optionalSong.isPresent()) {
            SongModel songModel = optionalSong.get();
            Optional<Integer> authIdOptional = songModel.getArtists().stream()
                    .map(ArtistModel::getId)
                    .findFirst();
            int authId = authIdOptional.orElse(-1);
            List<Integer> genreIds = songModel.getGenre().stream().map(GenreModel::getId).collect(Collectors.toList());
            // artist full details
            Optional<ArtistModel> artistModel = artistRepo.findById(authId);
            artistRepo.deleteSongById(id);
            genreRepo.deleteSongById(id);
            songRepo.deleteById(id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Deleted Song");
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/delete")
    ResponseEntity<Object> deleteAllSong() {
        try {
            long count = songRepo.count();
            if (count == 0) {
                ErrorMessage errorMessage = new ErrorMessage("Nothing to delete");
                return ResponseEntity.badRequest().body(errorMessage);
            } else {
                songRepo.deleteAll();
                Message message = new Message("Deleted all songs");
                return ResponseEntity.ok(count);
            }
        } catch (Exception ex) {
            ErrorMessage errorMessage = new ErrorMessage("Something went wrong");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @PutMapping("/updateSong")
    public ResponseEntity<?> updateSong(
            @RequestBody SongModel songModel,
            @RequestParam("generic_id") int generic_id,
            @RequestParam("artist_id") int artist_id,
            @RequestParam("song_id") int song_id) {
        Optional<SongModel> songOptional = songRepo.findById(song_id);
        Optional<ArtistModel> artistOptional = artistRepo.findById(artist_id);
        Optional<GenreModel> genreOptional = genreRepo.findById(generic_id);

        Integer songIdArtistDelete = songRepo.findSongIdFromArtistSong(song_id);
        Integer songIdGenreDelete = songRepo.findSongFromGenereSongModel(song_id);
        System.out.println("Id of artist " + songIdArtistDelete);
        System.out.println("Id of genre " + songIdGenreDelete);

        if (songIdArtistDelete == null) {
            ErrorMessage errorMessage = new ErrorMessage("Cannot edit as it contains same rtist id");
            return ResponseEntity.badRequest().body(errorMessage);
        }
        if (songIdGenreDelete == null) {
            ErrorMessage errorMessage = new ErrorMessage("Cannot edit as it contains same generic id");
            return ResponseEntity.badRequest().body(errorMessage);
        }
        if (songOptional.isPresent() && artistOptional.isPresent() && genreOptional.isPresent()) {
            SongModel song = songOptional.get();
            ArtistModel artist = artistOptional.get();
            GenreModel genre = genreOptional.get();
            if (songModel.getName() != null && !songModel.getName().isEmpty()) {
                song.setName(songModel.getName());
            }
            if (songModel.getAutoPath() != null && !songModel.getAutoPath().isEmpty()) {
                song.setAutoPath(songModel.getAutoPath());
            }
            if (songModel.getLyrics() != null && !songModel.getLyrics().isEmpty()) {
                song.setLyrics(songModel.getLyrics());
            }

            if (songModel.getImgPath() != null && !songModel.getImgPath().isEmpty()) {
                song.setImgPath(songModel.getImgPath());
            }

            songRepo.deleteSongInArtistSongModel(songIdArtistDelete);
            songRepo.deleteSongInGenreSongModel(songIdGenreDelete);

            artist.songs(song);
            genre.songs(song);

            genreRepo.save(genre);
            artistRepo.save(artist);
            songRepo.save(song);

            Message message = new Message("Updated song");
            return ResponseEntity.ok(message);
        } else {
            ErrorMessage errorMessage = new ErrorMessage("Cannot find song");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
    }

}
