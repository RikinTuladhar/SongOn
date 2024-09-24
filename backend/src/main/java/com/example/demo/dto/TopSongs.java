package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class TopSongs {
    Long id;
    int times_listened;
    String name;
    String auto_path;
    String img_path;

    // ui.id, ui.timesListened,s.name, s.autoPath, s.imgPath
    public TopSongs(Long id, int timesListened, String name, String autoPath, String imgPath) {

        this.id = id;
        this.times_listened = timesListened;
        this.name = name;
        this.auto_path = autoPath;
        this.img_path = imgPath;
    }
}
