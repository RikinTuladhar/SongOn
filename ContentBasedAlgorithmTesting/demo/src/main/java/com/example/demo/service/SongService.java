package com.example.demo.service;

import com.example.demo.model.Song;
import com.example.demo.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

    private final SongRepository songRepository;

    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    public List<Song> recommendByGenre(String genre) {
        return songRepository.findByGenre(genre);
    }

    public List<Song> recommendByArtist(String artist) {
        return songRepository.findByArtist(artist);
    }

    public List<Song> recommendByGenreAndArtist(String genre, String artist) {
        return songRepository.findByGenreAndArtist(genre, artist);
    }
}

