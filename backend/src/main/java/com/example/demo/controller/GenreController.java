package com.example.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.demo.models.GenreModel;
import com.example.demo.models.SongModel;
import com.example.demo.others.ErrorMessage;
import com.example.demo.others.Message;
import com.example.demo.repo.GenreRepo;
import com.example.demo.repo.SongRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/genre")
@CrossOrigin(origins = "*")
public class GenreController {
    @Autowired
    GenreRepo genreRepo;
    @Autowired
    SongRepo songRepo;

    @GetMapping
    public List<GenreModel> getGenre() {
        return genreRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> addGenre(@RequestBody GenreModel genreModel) {
        if (containAllFields(genreModel)) {
            genreRepo.save(genreModel);
            Message message = new Message("Added Genre");
            return ResponseEntity.ok(message);
        } else {
            ErrorMessage errorMessage = new ErrorMessage("Enter all fields");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    private boolean containAllFields(GenreModel genreModel) {
        return !genreModel.getName().isEmpty() &&
                !genreModel.getImgGenre().isEmpty() &&
                !genreModel.getBio().isEmpty();
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<Object> deleteGenre(@PathVariable int id) {
        try {
            genreRepo.deleteById(id);
            String message = "Delete genre by " + id + "!!!";
            return ResponseEntity.ok().body(Map.of("Message", message));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/upateGenre")
    ResponseEntity<?> updateGenre(
            @RequestParam("id") int id,
            @RequestBody GenreModel genreModel) {
        Optional<GenreModel> genre = genreRepo.findById(id);
        if (genre.isPresent()) {
            String receivedName = genreModel.getName();
            String receivedImg =genreModel.getImgGenre();
            String receivedBio = genreModel.getBio();
            if(receivedName != null && !receivedName.isEmpty()){
                genre.get().setName(receivedName);
            }

            if(receivedImg != null && !receivedImg.isEmpty()){
                genre.get().setImgGenre(receivedImg);
            }

            if(receivedBio != null && !receivedBio.isEmpty()){
                genre.get().setBio(receivedBio);
            }          
            Message message = new Message("Updated genre");
            genreRepo.save(genre.get());
            return ResponseEntity.ok(message);
        } else {
            ErrorMessage errorMessage = new ErrorMessage("Did not found genre");
            return ResponseEntity.badRequest().body(errorMessage);
        }

    }

    @PutMapping("/{genre_id}/song/{song_id}")
    public GenreModel addGenreToSong(
            @PathVariable int genre_id,
            @PathVariable int song_id) {
        GenreModel genreModel = genreRepo.findById(genre_id).get();
        SongModel songModel = songRepo.findById(song_id).get();

        genreModel.songs(songModel);
        return genreRepo.save(genreModel);
    }

}
