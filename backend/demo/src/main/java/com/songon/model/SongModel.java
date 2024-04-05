package com.songon.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.sym.Name;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class SongModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String autoPath;
	
	@JsonIgnore
	@ManyToMany(mappedBy = "songs")
	private Set<ArtistModel> artists = new HashSet<>();
	
	@JsonIgnore
	@ManyToMany(mappedBy = "songs")
	private Set<GenreModel> genre = new HashSet<>();
	

	public Set<GenreModel> getGenre() {
		return genre;
	}

	public SongModel(int id, String name, String autoPath, Set<ArtistModel> artists, Set<GenreModel> genre) {
		super();
		this.id = id;
		this.name = name;
		this.autoPath = autoPath;
		this.artists = artists;
		this.genre = genre;
	}

	public void setGenre(Set<GenreModel> genre) {
		this.genre = genre;
	}

	public SongModel(int id, String name, String autoPath, Set<ArtistModel> artists) {
		super();
		this.id = id;
		this.name = name;
		this.autoPath = autoPath;
		this.artists = artists;
	}

	public Set<ArtistModel> getArtists() {
		return artists;
	}

	public void setArtists(Set<ArtistModel> artists) {
		this.artists = artists;
	}

	public SongModel() {}
	
	public SongModel(int id, String name, String autoPath) {

		this.id = id;
		this.name = name;
		this.autoPath = autoPath;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "SongModel [id=" + id + ", name=" + name + ", autoPath=" + autoPath + ", artists=" + artists + ", genre="
				+ genre + "]";
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

}
