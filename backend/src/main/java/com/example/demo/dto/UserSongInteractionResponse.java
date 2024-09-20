package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSongInteractionResponse {
    private long id;
    private int song_id;
    private int user_id;
    private boolean liked;
    private int timesListened;

}
