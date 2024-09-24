package com.example.demo.dto;

import lombok.Data;

@Data
public class TopUser {
    private int id;
    private String username;
    private long timesListened;

    public TopUser(int id, String username,long timesListened) {
        this.id = id;
        this.username = username;
        this.timesListened = timesListened;
    }


}
