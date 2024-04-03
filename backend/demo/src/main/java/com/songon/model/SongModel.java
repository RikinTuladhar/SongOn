package com.songon.model;

import com.fasterxml.jackson.core.sym.Name;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SongModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String autoPath;

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
		return "SongModel [id=" + id + ", name=" + name + ", autoPath=" + autoPath + "]";
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
