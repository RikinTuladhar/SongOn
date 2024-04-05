package com.songon.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.songon.model.GenreModel;

public interface GenreRepo extends JpaRepository<GenreModel, Integer>{


}
