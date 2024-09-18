package com.example.demo.controller;

import com.example.demo.DTO.UserSongInteractionRequest;
import com.example.demo.model.Song;
import com.example.demo.model.User;
import com.example.demo.model.UserSongInteraction;
import com.example.demo.repository.SongRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserSongInteractionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-song-interactions")
public class UserSongInteractionController {

    private final UserSongInteractionRepository userSongInteractionRepository;
    private final UserRepository userRepository;
    private final SongRepository songRepository;

    public UserSongInteractionController(UserSongInteractionRepository userSongInteractionRepository,
                                         UserRepository userRepository,
                                         SongRepository songRepository) {
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
        Song song = songRepository.findById(request.getSongId()).orElseThrow(() -> new RuntimeException("Song not found"));

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