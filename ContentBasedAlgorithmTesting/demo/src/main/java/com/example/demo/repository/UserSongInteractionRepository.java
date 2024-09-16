package com.example.demo.repository;

import com.example.demo.model.User;
import com.example.demo.model.UserSongInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSongInteractionRepository extends JpaRepository<UserSongInteraction, Long> {
    List<UserSongInteraction> findByUser(User user);
}

