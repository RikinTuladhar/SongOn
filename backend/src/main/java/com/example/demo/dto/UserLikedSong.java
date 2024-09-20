package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

public class UserLikedSong {

    int id;
    String auto_path;
    String img_path;
    String lyrics;
    String name;

    public UserLikedSong(int id, String autoPath, String imgPath, String lyrics, String name) {
        this.id = id;
        this.auto_path = autoPath;
        this.img_path = imgPath;
        this.lyrics = lyrics;
        this.name = name;
    }

}
