package com.songon.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.songon.model.SongModel;

public interface SongRepo extends JpaRepository<SongModel, Integer>{
	

}
