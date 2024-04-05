package com.songon.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class GenreModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	
	
	@ManyToMany
	@JoinTable(
			name = "genre_song",
			joinColumns = @JoinColumn(name = "genre_id"),
			inverseJoinColumns = @JoinColumn(name ="song_id")
			)
	private Set<SongModel> songs = new HashSet<>();
	
	public GenreModel() {
		
	}

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

	public Set<SongModel> getSongs() {
		return songs;
	}

	public void setSongs(Set<SongModel> songs) {
		this.songs = songs;
	}

	public GenreModel(int id, String name, Set<SongModel> songs) {
		super();
		this.id = id;
		this.name = name;
		this.songs = songs;
	}

	@Override
	public String toString() {
		return "GenreModel [id=" + id + ", name=" + name + ", songs=" + songs + "]";
	}
	
	//important to do so that song data  it will be saved 
	public void songs(SongModel songModel) {
		songs.add(songModel);
		
	}
	

}
