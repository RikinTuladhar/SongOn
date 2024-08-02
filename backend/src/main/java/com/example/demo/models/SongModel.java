package com.example.demo.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.sym.Name;

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
public class SongModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String autoPath;
    private String imgPath;
    @Column(name = "lyrics", length =5000)
    private String lyrics;


    @JsonIgnore
    @ManyToMany(mappedBy = "songs")
    private List<ArtistModel> artists = new ArrayList<>();
    @JsonIgnore
    @ManyToMany(mappedBy = "songs")
    private List<GenreModel> genre = new ArrayList<>();

    
    @ManyToMany(mappedBy = "songModels")
    @JsonIgnore
    private Set<PlayListModel> playListModels = new HashSet<>();

    public void playListModels(PlayListModel playListModel){
        playListModels.add(playListModel);
    }


}
