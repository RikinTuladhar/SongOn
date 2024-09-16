package com.example.demo.controller;

import com.example.demo.model.Genre;
import com.example.demo.repository.GenreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/genre")
public class GenreController {
    @Autowired
    GenreRepo genreRepo;

    @GetMapping
    ResponseEntity<?> getGenre(){
        return ResponseEntity.ok( genreRepo.findAll());
    }
    @PostMapping
    ResponseEntity<?> postGenre(@RequestBody Genre genre){
        genreRepo.save(genre);
        return ResponseEntity.ok("Added Genre");
    }
}
