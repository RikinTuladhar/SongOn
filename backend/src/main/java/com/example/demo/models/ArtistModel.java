package com.example.demo.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArtistModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String bio;

    private	String gender;
    private String imgArtist;

    public ArtistModel(String name, int id, String bio, String gender, String imgArtist, Set<SongModel> songs) {
        this.name = name;
        this.id = id;
        this.bio = bio;
        this.gender = gender;
        this.imgArtist = imgArtist;
        this.songs = songs;
    }

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name ="artist_song",
            joinColumns = @JoinColumn(name = "artist_id"),
            inverseJoinColumns = @JoinColumn(name = "song_id")
    )
    private Set<SongModel> songs= new HashSet<>();



    public Set<SongModel> getSongs() {
        return songs;
    }

    public void songs(SongModel songModel) {
        songs.add(songModel);
    }
    
    @Override
    public String toString() {
        return "ArtistModel [id=" + id + ", name=" + name + ", bio=" + bio + ", gender=" + gender + ", songs=" + songs
                + "]";
    }







}
