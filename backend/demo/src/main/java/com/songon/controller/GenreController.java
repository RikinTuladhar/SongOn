package com.songon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.songon.model.GenreModel;
import com.songon.model.SongModel;
import com.songon.repo.GenreRepo;
import com.songon.repo.SongRepo;

import jakarta.websocket.server.PathParam;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class GenreController {
	@Autowired
	GenreRepo genreRepo;
	@Autowired
	SongRepo songRepo;
	
	@GetMapping("/genre")
	public List<GenreModel> getGenre(){
		return genreRepo.findAll();
	}
	
	@PostMapping("/addGenre")
	public GenreModel addGenre(@RequestBody GenreModel genreModel) {
		return genreRepo.save(genreModel);
		
	}
	@PutMapping("/genre/{genre_id}/song/{song_id}")
	public GenreModel addGenreToSong(
			@PathVariable int genre_id,
			@PathVariable int song_id
			)
	{
		GenreModel genreModel = genreRepo.findById(genre_id).get();
		SongModel songModel = songRepo.findById(song_id).get();
		
		genreModel.songs(songModel);
		return genreRepo.save(genreModel);
	}
	
	
	
}
