package com.example.demo.repo;


import java.util.List;

import com.example.demo.models.GenreModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface GenreRepo extends JpaRepository<GenreModel, Integer>{
    @Modifying
    @Transactional
    @Query( value = "DELETE FROM genre_song where song_id = :id", nativeQuery = true)
    void deleteSongById(@Param("id") int id);
}
