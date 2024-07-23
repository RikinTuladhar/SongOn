package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.PlayListModel;

public interface PlayListRepo extends JpaRepository<PlayListModel,Integer>{

    
} 
