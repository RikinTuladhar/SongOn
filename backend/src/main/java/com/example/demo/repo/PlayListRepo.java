package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.models.PlayListModel;

import jakarta.transaction.Transactional;

public interface PlayListRepo extends JpaRepository<PlayListModel,Integer>{

    @Query(value = "SELECT * FROM playlist where user_id = :id",nativeQuery = true)
    List<PlayListModel> findByUserId(@Param("id") int id);

    @Query(value ="SELECT COUNT(*) FROM playlist_song where song_id = :id" , nativeQuery = true)
    Integer countSongIdInPlayListBridgeTable(@Param("id") int id);

    @Modifying //as delete opeartion 
    @Transactional // deleting with in a transaction
    @Query(value ="DELETE FROM playlist_song WHERE song_id = :id", nativeQuery = true)
    Integer deleteSongIdInPlayListBridgeTable(@Param("id") int id);
    
} 
