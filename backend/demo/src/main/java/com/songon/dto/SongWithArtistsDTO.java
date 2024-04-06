package com.songon.dto;

import java.util.List;

import com.songon.model.ArtistModel;

public class SongWithArtistsDTO {

	private int id;
	private String name;
	private String autoPath;
	private List<ArtistModel> artist;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAutoPath() {
		return autoPath;
	}
	public void setAutoPath(String autoPath) {
		this.autoPath = autoPath;
	}
	public List<ArtistModel> getArtist() {
		return artist;
	}
	public void setArtist(List<ArtistModel> artist) {
		this.artist = artist;
	}
	public SongWithArtistsDTO(int id, String name, String autoPath, List<ArtistModel> artist) {
	
		this.id = id;
		this.name = name;
		this.autoPath = autoPath;
		this.artist = artist;
	}
	public SongWithArtistsDTO() {
	
	}
	
}
