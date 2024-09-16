package com.example.demo.service;

import com.example.demo.model.Song;
import com.example.demo.model.User;
import com.example.demo.model.UserSongInteraction;
import com.example.demo.repository.SongRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserSongInteractionRepository;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class RecommendationService {

    private final SongRepository songRepository;
    private final UserRepository userRepository;
    private final UserSongInteractionRepository userSongInteractionRepository;

    public RecommendationService(SongRepository songRepository, UserRepository userRepository, UserSongInteractionRepository userSongInteractionRepository) {
        this.songRepository = songRepository;
        this.userRepository = userRepository;
        this.userSongInteractionRepository = userSongInteractionRepository;
    }

    // Create a vector of user preferences based on genre and artist
    public Map<String, Integer> getUserProfileVector(User user) {
        List<UserSongInteraction> interactions = userSongInteractionRepository.findByUser(user);
        Map<String, Integer> profileVector = new HashMap<>();

        for (UserSongInteraction interaction : interactions) {
            Song song = interaction.getSong();
            int score = interaction.getTimesListened() + (interaction.isLiked() ? 5 : 0); // Liked songs have higher weight

            // Update user preference for genre
            if (!song.getGenres().isEmpty()) {
                profileVector.put(song.getGenres().get(0).getName(),
                        profileVector.getOrDefault(song.getGenres().get(0).getName(), 0) + score);
            }

            // Update user preference for artist
            if (!song.getArtists().isEmpty()) {
                profileVector.put(song.getArtists().get(0).getName(),
                        profileVector.getOrDefault(song.getArtists().get(0).getName(), 0) + score);
            }
        }

        return profileVector;
    }

    // Create a feature vector for a song based on genre and artist
    public Map<String, Integer> getSongFeatureVector(Song song) {
        Map<String, Integer> featureVector = new HashMap<>();

        // Add genre to feature vector if available
        if (!song.getGenres().isEmpty()) {
            featureVector.put(song.getGenres().get(0).getName(), 1);
        }

        // Add artist to feature vector if available
        if (!song.getArtists().isEmpty()) {
            featureVector.put(song.getArtists().get(0).getName(), 1);
        }

        return featureVector;
    }

    // Calculate cosine similarity between two vectors
    public double calculateCosineSimilarity(Map<String, Integer> vectorA, Map<String, Integer> vectorB) {
        Set<String> allKeys = new HashSet<>(vectorA.keySet());
        allKeys.addAll(vectorB.keySet());

        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (String key : allKeys) {
            int a = vectorA.getOrDefault(key, 0);
            int b = vectorB.getOrDefault(key, 0);

            dotProduct += a * b;
            normA += a * a;
            normB += b * b;
        }

        if (normA == 0 || normB == 0) {
            return 0.0;
        }

        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    // Recommend songs for a user based on cosine similarity
    public List<Song> recommendSongs(User user) {
        List<Song> allSongs = songRepository.findAll();
        Map<String, Integer> userProfile = getUserProfileVector(user);

        Map<Song, Double> songSimilarityMap = new HashMap<>();
        for (Song song : allSongs) {
            Map<String, Integer> songFeatureVector = getSongFeatureVector(song);
            double similarity = calculateCosineSimilarity(userProfile, songFeatureVector);
            songSimilarityMap.put(song, similarity);
        }

        // Sort songs by similarity
        return songSimilarityMap.entrySet().stream()
                .sorted(Map.Entry.<Song, Double>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .toList();
    }
}

