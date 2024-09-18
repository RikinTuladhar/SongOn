package com.example.demo.DTO;

import lombok.Data;

@Data
public class UserSongInteractionRequest {

    private Long userId;
    private Long songId;
    private boolean liked;
    private int timesListened;
}
