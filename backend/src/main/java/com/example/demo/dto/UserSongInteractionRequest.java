package com.example.demo.dto;
import lombok.Data;

@Data
public class UserSongInteractionRequest {

    private Integer userId;
    private Integer songId;
    private boolean liked;
    private int timesListened;
}
