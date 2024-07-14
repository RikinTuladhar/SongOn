package com.example.demo.controller;


import java.util.List;
import java.util.Map;

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
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
public class ArtistController {

    @Autowired
    ArtistRepo artistRepo;

    @Autowired
    SongRepo songRepo;

    @GetMapping
    List<ArtistModel> getArtist(){
        List<ArtistModel> artists  = artistRepo.findAll();
        return artists;
    }

    @GetMapping("/{id}")
    ArtistModel getArtistById(@PathVariable int id) {
        ArtistModel artistModel = artistRepo.findById(id).orElse(null);
        return artistModel;
    }

    @GetMapping("/name/{name}")
    ArtistModel getArtistByName(@PathVariable String name) {
        return  artistRepo.findByName(name);
    }

    @GetMapping("/By-songid/{song_id}")
    List<ArtistModel> getArtistBySongId(@PathVariable int song_id) {
        return artistRepo.findArtistBySongId(song_id);
    }


    @PostMapping
    ArtistModel createArtist(@RequestBody ArtistModel artistModel ) {
        return artistRepo.save(artistModel);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
   ResponseEntity<Object> deleteArtist(@PathVariable int id) {
       try{
           artistRepo.deleteById(id);
           String Message = "Deleted id" + id + "success";
           return ResponseEntity.ok().body(Map.of("message", Message));

       }
       catch (EmptyResultDataAccessException ex){
           ErrorMessage errorMessage = new ErrorMessage("Something went wrong cannot delete");
           return ResponseEntity.badRequest().body(errorMessage);
       }
    }
    @DeleteMapping
    ResponseEntity<Object> deleteAllArtist(){
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
            @PathVariable int songId
    ) {
        ArtistModel artistModel = artistRepo.findById(artistId).get();
        SongModel songModel = songRepo.findById(songId).get();

        artistModel.songs(songModel);
        return artistRepo.save(artistModel);
        //1) took the id from param -> that returns -> entity (both)
        //2) we saved entity of song -> artist ma vayeko euta method ma we put it.
        //3)since tyo song saved vaisakyo artist ko model ma
        //4) we save it
    }



}
