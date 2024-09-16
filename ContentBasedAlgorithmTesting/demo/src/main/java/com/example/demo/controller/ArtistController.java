package com.example.demo.controller;

import com.example.demo.model.Artist;
import com.example.demo.repository.ArtistRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artist")
public class ArtistController {
    @Autowired
    ArtistRep artistRep;

    @GetMapping
    ResponseEntity<?> getArtists(){
        List<Artist> artists= artistRep.findAll();
        return ResponseEntity.ok(artists);
    }

    @PostMapping
    ResponseEntity<?> postArtist(@RequestBody Artist artist){
        artistRep.save(artist);
        return ResponseEntity.ok("Added");
    }
}
