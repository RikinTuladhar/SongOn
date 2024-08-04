package com.example.demo.repo;

import java.util.List;

import com.example.demo.models.GenreModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GenreRepo extends JpaRepository<GenreModel, Integer> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM genre_song where song_id = :id", nativeQuery = true)
    void deleteSongById(@Param("id") int id);

    @Query(value = "SELECT g.id, g.name, g.bio, g.img_genre FROM genre_model g inner join genre_song gs on g.id = gs.genre_id where gs.song_id = :songId", nativeQuery = true)
    List<GenreModel> findGenreBySongId(@Param("songId") int songId);
}
