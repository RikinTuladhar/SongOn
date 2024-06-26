package com.songon.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class ArtistModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String bio;
	
	private	String gender;
	
	

	
public ArtistModel(int id, String name, String bio, String gender, Set<SongModel> songs) {
		
		this.id = id;
		this.name = name;
		this.bio = bio;
		this.gender = gender;
		this.songs = songs;
	}



public String getGender() {
		return gender;
	}



	public void setGender(String gender) {
		this.gender = gender;
	}



public String getBio() {
		return bio;
	}



	public ArtistModel(int id, String name, String bio, Set<SongModel> songs) {

	this.id = id;
	this.name = name;
	this.bio = bio;
	this.songs = songs;
}



	public void setBio(String bio) {
		this.bio = bio;
	}



	//	@JsonIgnore
	@ManyToMany
	@JoinTable(
			name ="person_song",
			joinColumns = @JoinColumn(name = "person_id"),
			inverseJoinColumns = @JoinColumn(name = "song_id")
			)
	
	private Set<SongModel> songs= new HashSet<>();
	
	public ArtistModel() {
		
	}
	
	
	
	public ArtistModel(int id, String name, Set<SongModel> songs) {
		super();
		this.id = id;
		this.name = name;
		this.songs = songs;
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
	@Override
	public String toString() {
		return "ArtistModel [id=" + id + ", name=" + name + ", bio=" + bio + ", gender=" + gender + ", songs=" + songs
				+ "]";
	}



	public void songs(SongModel songModel) {
		// TODO Auto-generated method stub
		songs.add(songModel);
	}


	

}
