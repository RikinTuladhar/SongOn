package com.example.demo.models;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * PlayListModel
 */

 @Data
 @Entity
 @Table(name = "playlist")
 @AllArgsConstructor
 @NoArgsConstructor
public class PlayListModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    User userPlayList;

    @ManyToMany
    @JoinTable(
        name = "playlist_song",
        joinColumns = @JoinColumn(name = "playlist_id"),
        inverseJoinColumns = @JoinColumn(name = "song_id")
    )
    Set<SongModel> songModels = new HashSet<>();
    public void songModels(SongModel songModel) {
        songModels.add(songModel);
    }
    
    
}