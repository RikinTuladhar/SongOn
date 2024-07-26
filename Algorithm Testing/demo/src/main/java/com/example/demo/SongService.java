package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SongService {
    @Autowired
    private SongRepository songRepository;

    public List<Song> getRecommendations(Song inputSong) {
        List<Song> songsByGenre = songRepository.findByGenre(inputSong.getGenre());
        return songsByGenre.stream()
                .sorted((s1, s2) -> Double.compare(cosineSimilarity(inputSong, s2), cosineSimilarity(inputSong, s1)))
                .collect(Collectors.toList());
    }

    private double cosineSimilarity(Song song1, Song song2) {
        double[] features1 = {song1.getDanceability(), song1.getEnergy(), song1.getValence(), song1.getTempo()};
        double[] features2 = {song2.getDanceability(), song2.getEnergy(), song2.getValence(), song2.getTempo()};

        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;
        for (int i = 0; i < features1.length; i++) {
            dotProduct += features1[i] * features2[i];
            normA += Math.pow(features1[i], 2);
            normB += Math.pow(features2[i], 2);
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
