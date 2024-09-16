package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.User;
import com.example.demo.models.UserSongInteraction;

public interface UserSongInteractionRepository extends JpaRepository<UserSongInteraction, Long> {
    List<UserSongInteraction> findByUser(User user);
}
