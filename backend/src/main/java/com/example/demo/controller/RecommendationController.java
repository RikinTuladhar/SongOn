package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.SongModel;
import com.example.demo.models.User;
import com.example.demo.repo.UserRepository;
import com.example.demo.service.RecommendationService;

@RestController
@CrossOrigin
public class RecommendationController {

    @Autowired
    UserRepository userRepository;

    private final RecommendationService recommendationService;
  

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/recommend")
    public List<SongModel> recommendSongs(@RequestParam String username) {
        User user = userRepository.findByUsername(username);
        return recommendationService.recommendSongs(user);
    }
}

