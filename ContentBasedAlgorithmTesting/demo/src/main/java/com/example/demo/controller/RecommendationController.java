package com.example.demo.controller;

import com.example.demo.model.Song;
import com.example.demo.model.User;
import com.example.demo.service.RecommendationService;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final UserService userService;

    public RecommendationController(RecommendationService recommendationService, UserService userService) {
        this.recommendationService = recommendationService;
        this.userService = userService;
    }

    @GetMapping("/recommend")
    public List<Song> recommendSongs(@RequestParam String username) {
        User user = userService.getUserByUsername(username);
        return recommendationService.recommendSongs(user);
    }
}

