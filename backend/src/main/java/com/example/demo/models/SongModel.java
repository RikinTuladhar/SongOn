package com.example.demo.models;

import java.util.HashSet;
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

    @Override
    public String toString() {
        return "SongModel{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", autoPath='" + autoPath + '\'' +
                ", imgPath='" + imgPath + '\'' +
                ", artists=" + artists +
                ", genre=" + genre +
                '}';
    }

    @JsonIgnore
    @ManyToMany(mappedBy = "songs")
    private Set<ArtistModel> artists = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "songs")
    private Set<GenreModel> genre = new HashSet<>();

    
    @ManyToMany(mappedBy = "songModels")
    @JsonIgnore
    private Set<PlayListModel> playListModels = new HashSet<>();

    public void playListModels(PlayListModel playListModel){
        playListModels.add(playListModel);
    }


}
