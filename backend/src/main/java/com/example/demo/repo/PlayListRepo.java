package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.models.PlayListModel;

public interface PlayListRepo extends JpaRepository<PlayListModel,Integer>{

    @Query(value = "SELECT * FROM playlist where user_id = :id",nativeQuery = true)
    List<PlayListModel> findByUserId(@Param("id") int id);
    
} 
