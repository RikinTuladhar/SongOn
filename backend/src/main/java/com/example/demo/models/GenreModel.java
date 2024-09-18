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
@NoArgsConstructor
@AllArgsConstructor
public class GenreModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String bio;
    private String imgGenre;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "genre_song",
            joinColumns = @JoinColumn(name = "genre_id"),
            inverseJoinColumns = @JoinColumn(name ="song_id")
    )
    private Set<SongModel> songs = new HashSet<>();
    //important to do so that song data  it will be saved
    public void songs(SongModel songModel) {
        songs.add(songModel);
    }



    @Override
    public String toString() {
        return "GenreModel [id=" + id + ", name=" + name + ", bio=" + bio + ", songs=" + songs + "]";
    }


}
