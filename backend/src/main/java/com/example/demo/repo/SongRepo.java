package com.example.demo.repo;

import java.util.List;

import com.example.demo.models.SongModel;

import jakarta.transaction.Transactional;

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

    @Query(value = "SELECT artist_id FROM artist_song WHERE song_id = :id", nativeQuery = true)
    Integer findSongIdFromArtistSong(@Param("id") int id);
    

    @Query(value = "SELECT genre_id FROM genre_song where song_id = :id",nativeQuery = true)
    Integer findSongFromGenereSongModel(@Param("id") int id);


    @Modifying
    @Transactional
    @Query(value =  "DELETE FROM artist_song WHERE artist_id = :id", nativeQuery = true)
    void deleteSongInArtistSongModel(@Param("id") int id);

    @Modifying
    @Transactional
    @Query(value =  "DELETE FROM genre_song WHERE genre_id = :id",nativeQuery = true)
    void deleteSongInGenreSongModel(@Param("id") int id);

}
