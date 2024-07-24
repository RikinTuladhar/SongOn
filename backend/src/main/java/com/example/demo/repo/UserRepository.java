package com.example.demo.repo;

import com.example.demo.models.User;


import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUsername(String username);

    boolean existsByUsername(String username);



}
