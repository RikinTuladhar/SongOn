package com.example.demo.repo;

import java.util.List;

import com.example.demo.models.SongModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
public interface SongRepo extends JpaRepository<SongModel, Integer>{

    @Query("SELECT s From SongModel s JOIN FETCH s.artists")
    List<SongModel> findAllWithArtists();

    @Query("SELECT s from SongModel s JOIN FETCH s.artists a where a.id = :artistId")
    List<SongModel> findSongsByArtistId(@Param("artistId") int artistId);

    @Query("SELECT s from SongModel s JOIN FETCH s.genre g where g.id = :genre_id")
    List<SongModel> findSongsByGenreId(int genre_id);


}
