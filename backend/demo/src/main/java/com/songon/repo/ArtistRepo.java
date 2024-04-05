package com.songon.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.songon.model.ArtistModel;

public interface ArtistRepo extends JpaRepository<ArtistModel, Integer>{

	@Query("SELECT a from ArtistModel a where a.name = :name")
	ArtistModel findByName(String name);

	@Query("SELECT a from ArtistModel a JOIN FETCH a.songs s where s.id = :song_id")
	List<ArtistModel> findArtistBySongId(@Param("song_id") int song_id);
}
