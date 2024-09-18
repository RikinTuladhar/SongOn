package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserSongInteractionRequest;
import com.example.demo.models.SongModel;
import com.example.demo.models.User;
import com.example.demo.models.UserSongInteraction;
import com.example.demo.repo.SongRepo;
import com.example.demo.repo.UserRepository;
import com.example.demo.repo.UserSongInteractionRepository;

@RestController
@CrossOrigin
@RequestMapping("/user-song-interactions")
public class UserSongInteractionController {

    private final UserSongInteractionRepository userSongInteractionRepository;
    private final UserRepository userRepository;
    private final SongRepo songRepository;

    public UserSongInteractionController(UserSongInteractionRepository userSongInteractionRepository,
                                         UserRepository userRepository,
                                         SongRepo songRepository) {
        this.userSongInteractionRepository = userSongInteractionRepository;
        this.userRepository = userRepository;
        this.songRepository = songRepository;
    }

    // POST request to add a new user-song interaction
    @PostMapping
    public ResponseEntity<UserSongInteraction> addUserSongInteraction(
            @RequestBody UserSongInteractionRequest request) {

        // Fetch the user and song from their respective repositories
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        SongModel song = songRepository.findById(request.getSongId()).orElseThrow(() -> new RuntimeException("Song not found"));

        // Create a new UserSongInteraction
        UserSongInteraction interaction = new UserSongInteraction();
        interaction.setUser(user);
        interaction.setSong(song);
        interaction.setLiked(request.isLiked());
        interaction.setTimesListened(request.getTimesListened());

        // Save the interaction to the repository
        UserSongInteraction savedInteraction = userSongInteractionRepository.save(interaction);

        // Return the saved interaction
        return ResponseEntity.ok(savedInteraction);
    }
}