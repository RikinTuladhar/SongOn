package com.example.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.demo.models.ArtistModel;
import com.example.demo.models.SongModel;
import com.example.demo.others.ErrorMessage;
import com.example.demo.others.Message;
import com.example.demo.repo.ArtistRepo;
import com.example.demo.repo.SongRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artist")
// @CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
public class ArtistController {

    @Autowired
    ArtistRepo artistRepo;

    @Autowired
    SongRepo songRepo;

    @GetMapping
    List<ArtistModel> getArtist() {
        List<ArtistModel> artists = artistRepo.findAll();
        return artists;
    }

    @GetMapping("/{id}")
    ArtistModel getArtistById(@PathVariable int id) {
        ArtistModel artistModel = artistRepo.findById(id).orElse(null);
        return artistModel;
    }

    @GetMapping("/name/{name}")
    ArtistModel getArtistByName(@PathVariable String name) {
        return artistRepo.findByName(name);
    }

    @GetMapping("/By-songid/{song_id}")
    List<ArtistModel> getArtistBySongId(@PathVariable int song_id) {
        return artistRepo.findArtistBySongId(song_id);
    }

    @GetMapping("/getTotal")
    ResponseEntity<?> getArtistTotal() {
        Long count = artistRepo.count();
        Message message = new Message(count.toString());
        return ResponseEntity.ok(message);
    }

    @PostMapping
    ArtistModel createArtist(@RequestBody ArtistModel artistModel) {
        return artistRepo.save(artistModel);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    ResponseEntity<Object> deleteArtist(@PathVariable int id) {
        try {
            Optional<ArtistModel> isPresentArtist = artistRepo.findById(id);
            if (isPresentArtist.isPresent()) {
                artistRepo.deleteById(id);
                String Message = "Deleted id " + id + " success";
                return ResponseEntity.ok().body(Map.of("message", Message));
            } else {
                ErrorMessage errorMessage = new ErrorMessage("Did not found artist");
                return ResponseEntity.badRequest().body(errorMessage);
            }

        } catch (EmptyResultDataAccessException ex) {
            ErrorMessage errorMessage = new ErrorMessage("Something went wrong cannot delete");
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    @DeleteMapping
    ResponseEntity<Object> deleteAllArtist() {
        try {
            artistRepo.deleteAll();
            Message message = new Message("Deleted All Data");
            return ResponseEntity.ok(message);
        } catch (Exception ex) {
            ErrorMessage errorMessage = new ErrorMessage("Failed to delete all data");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @PutMapping("/{artistId}/song/{songId}")
    ArtistModel addArtistToSong(
            @PathVariable int artistId,
            @PathVariable int songId) {
        ArtistModel artistModel = artistRepo.findById(artistId).get();
        SongModel songModel = songRepo.findById(songId).get();

        artistModel.songs(songModel);
        return artistRepo.save(artistModel);
        // 1) took the id from param -> that returns -> entity (both)
        // 2) we saved entity of song -> artist ma vayeko euta method ma we put it.
        // 3)since tyo song saved vaisakyo artist ko model ma
        // 4) we save it
    }

    @PutMapping("/updateArtist")
    ResponseEntity<?> updateArtist(
            @RequestParam("id") int id,
            @RequestBody ArtistModel artistModel) {
        Optional<ArtistModel> artist = artistRepo.findById(id);
        if (artist.isPresent()) {
            String rec_name = artistModel.getName();
            String rec_bio = artistModel.getBio();
            String rec_imgArtist = artistModel.getImgArtist();
            String rec_Gender = artistModel.getGender();

            if (rec_name != null && !rec_name.isEmpty()) {
                artist.get().setName(rec_name);
            }

            if (rec_bio != null && !rec_bio.isEmpty()) {
                artist.get().setBio(rec_bio);
            }

            if (rec_imgArtist != null && !rec_imgArtist.isEmpty()) {
                artist.get().setImgArtist(rec_imgArtist);
            }

            if (rec_Gender != null && !rec_Gender.isEmpty()) {
                artist.get().setGender(rec_Gender);
            }

            Message message = new Message("Updated artist");
            artistRepo.save(artist.get());
            return ResponseEntity.ok(message);
        } else {
            ErrorMessage errorMessage = new ErrorMessage("Did not found artist");
            return ResponseEntity.badRequest().body(errorMessage);
        }

    }

}
