package com.songon.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.sound.midi.Patch;

import org.hibernate.generator.internal.SourceGeneration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.songon.model.SongModel;
import com.songon.repo.SongRepo;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;


@Controller
public class SongController {
	@Autowired
	SongRepo songRepo;
	
	@PostMapping(path = "uploadSong",consumes = { "multipart/form-data" })
	@ResponseBody
	public SongModel uploadSong( @RequestParam String name, @RequestParam MultipartFile file  ) {
		final String UPLOAD_DIR = "C:\\Users\\User\\Downloads\\Delete later\\check";
		final String show_Upload = "file:///C:/Users/User/Downloads/Delete%20later/check/";
		
		if(file.isEmpty()) {
			return null;
		}
		try {
			String fileName = file.getOriginalFilename();
			String extention = fileName.substring(fileName.lastIndexOf("."));
			System.out.println(extention);
			
			File uploadDir = new File(UPLOAD_DIR);
			
			if(!uploadDir.exists()) {
				uploadDir.mkdir();
			}
			
			Path filePath = Paths.get(UPLOAD_DIR,fileName);
			Files.write(filePath, file.getBytes());
			
			SongModel songModel = new SongModel();
		
			songModel.setName(name);
			songModel.setAutoPath(show_Upload + fileName);
			
			songRepo.save(songModel);
			
			return songModel;
			
		} catch (IOException e) {
			e.printStackTrace(); // Handle file upload error
			return null;
		}
		
	}
	
	
	

}
