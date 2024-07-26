package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
public class SongController {
    @Autowired
    private SongService songService;

    @PostMapping("/recommend")
    public List<Song> recommendSongs(@RequestBody Song inputSong) {
        return songService.getRecommendations(inputSong);
    }
}

