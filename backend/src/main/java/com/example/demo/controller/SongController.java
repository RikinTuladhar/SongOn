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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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
    public List<SongModel> getSongById(@PathVariable int id){
        Optional<SongModel> optionalSong = songRepo.findById(id);
        if(optionalSong.isPresent()) {
            return Collections.singletonList(optionalSong.get());
        }
        else {
            return Collections.emptyList();
        }
    }

    @GetMapping("/with-artists")
    public List<SongModel> getSongsWithArtists() {
        return songRepo.findAllWithArtists();
    }

    @GetMapping("/by-artist/{artistId}")
    public List<SongModel> getSongsByArtistId(@PathVariable int artistId){
        return songRepo.findSongsByArtistId(artistId);
    }

    @GetMapping("/by-genre/{genre_id}")
    public List<SongWithArtistsDTO> getSongByGenreId(@PathVariable int genre_id) {
        List<SongModel> songs = songRepo.findSongsByGenreId(genre_id);

        List<SongWithArtistsDTO> songWithArtistsDTOs = new ArrayList<>();
        for(SongModel song:songs) {
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


    // Method to handle file upload
//    @PostMapping("/uploadSong")
//    @ResponseBody
//    public SongModel uploadSong(@RequestBody SongModel songModel) {
//    	songRepo.save(songModel);
//    	return songModel;
//    }

    @PostMapping("/uploadSong/{generic_id}/{artist_id}")
    public SongModel uploadSong(
            @RequestBody SongModel songModel,
            @PathVariable int generic_id,
            @PathVariable int artist_id
    ) {

        ArtistModel artistModel = artistRepo.findById(artist_id).get();
        GenreModel genreModel = genreRepo.findById(generic_id).get();
        artistModel.songs(songModel);
        genreModel.songs(songModel);
        songRepo.save(songModel);
        artistRepo.save(artistModel);
        genreRepo.save(genreModel);
        return songModel;
    }

    //delete by id
    @DeleteMapping("/delete/{id}")
    ResponseEntity<Object> deleteSong(@PathVariable int id) {
        Optional<SongModel> optionalSong = songRepo.findById(id);
        if(optionalSong.isPresent()){
            SongModel songModel= optionalSong.get();
            Optional<Integer> authIdOptional = songModel.getArtists().stream()
                    .map(ArtistModel::getId)
                    .findFirst();
            int authId = authIdOptional.orElse(-1);
            List<Integer> genreIds = songModel.getGenre().stream().map(GenreModel::getId).collect(Collectors.toList());
            //artist full details
            Optional<ArtistModel> artistModel =  artistRepo.findById(authId);
            artistRepo.deleteSongById(id);
            genreRepo.deleteSongById(id);
            songRepo.deleteById(id);
            Map<String,Object> response = new HashMap<>();
            response.put("message","Deleted Song");
            return ResponseEntity.ok().body(response);
         }
        else {
            return ResponseEntity.notFound().build();
        }

    }


    @DeleteMapping("/delete")
    ResponseEntity<Object> deleteAllSong(){
        try{
            songRepo.deleteAll();
            Message message = new Message("Deleted all songs");
            return ResponseEntity.ok(message);
        }catch (Exception ex){
            ErrorMessage errorMessage = new ErrorMessage("Something went wrong");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }



}
