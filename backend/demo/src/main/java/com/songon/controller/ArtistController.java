package com.songon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.songon.model.ArtistModel;
import com.songon.model.SongModel;
import com.songon.repo.ArtistRepo;
import com.songon.repo.SongRepo;


@RestController
@RequestMapping("/artist")
@CrossOrigin(origins = "http://localhost:5173")
public class ArtistController {
	
	@Autowired
	ArtistRepo artistRepo;
	
	@Autowired
	SongRepo songRepo;
	
	@GetMapping
	List<com.songon.model.ArtistModel> getArtist(){
		List<com.songon.model.ArtistModel> artists  = artistRepo.findAll();
		 return artists;
	}
	
	@PostMapping
	ArtistModel createArtist(@RequestBody ArtistModel artistModel ) {
		return artistRepo.save(artistModel);
		
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
