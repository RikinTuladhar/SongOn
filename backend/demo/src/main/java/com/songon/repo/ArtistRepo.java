package com.songon.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.songon.model.ArtistModel;

public interface ArtistRepo extends JpaRepository<ArtistModel, Integer>{

}
