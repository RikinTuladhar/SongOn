package com.example.demo.repo;


import java.util.List;

import com.example.demo.models.ArtistModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
public interface ArtistRepo extends JpaRepository<ArtistModel, Integer>{

    @Query("SELECT a from ArtistModel a where a.name = :name")
    ArtistModel findByName(String name);

    @Query("SELECT a from ArtistModel a JOIN FETCH a.songs s where s.id = :song_id")
    List<ArtistModel> findArtistBySongId(@Param("song_id") int song_id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM person_song WHERE song_id = :id", nativeQuery = true)
    void deleteSongById(@Param("id") int id);

}
