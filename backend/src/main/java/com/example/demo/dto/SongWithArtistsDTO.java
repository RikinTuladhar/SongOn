package com.example.demo.dto;

import com.example.demo.models.ArtistModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SongWithArtistsDTO {
    private int id;
    private String name;
    private String autoPath;
    private String lyrics;
    private String img_path;
    private List<ArtistModel> artist;

}
