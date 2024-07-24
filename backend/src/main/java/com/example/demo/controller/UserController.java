package com.example.demo.controller;

import com.example.demo.dto.LoginDto;
import com.example.demo.dto.UserResponse;
import com.example.demo.models.User;
import com.example.demo.others.ErrorMessage;
import com.example.demo.others.Message;
import com.example.demo.repo.UserRepository;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserResponse userResponse;

    @GetMapping("/getUser/{username}")
    ResponseEntity<?> getUser(@PathVariable("username") String username){
        User user =  userRepository.findByUsername(username);
        if(user == null) {
            ErrorMessage errorMessage = new ErrorMessage("User Not Found");
            return ResponseEntity.badRequest().body(errorMessage);

        }else {
            userResponse.setFirstName(user.getFirstname());
            userResponse.setLastname(user.getLastname());
            userResponse.setUsername(user.getUsername());
            userResponse.setRole(String.valueOf(user.getRole()));

            return ResponseEntity.ok(userResponse);
        }
    }

    @PostMapping("/register")
    ResponseEntity<?> userRegister(@RequestBody User user){
        if(user == null) {
            ErrorMessage errorMessage = new ErrorMessage("Enter all fields");
            return ResponseEntity.badRequest().body(errorMessage);
        };
        if(isEmptyUserFields(user)) {
            ErrorMessage errorMessage = new ErrorMessage("All fields required");
            return ResponseEntity.badRequest().body(errorMessage);
        };
        boolean doesExist = userRepository.existsByUsername(user.getUsername());
        if(doesExist){
            ErrorMessage ErrorMessage = new ErrorMessage("User Exist");
            return ResponseEntity.badRequest().body(ErrorMessage);
        }
        else{
            userRepository.save(user);
            Message message = new Message("User Added");
            return ResponseEntity.ok(message);
        }
    }

    @PostMapping("/login")
    ResponseEntity<?> userLogin(@RequestBody LoginDto user){
        if(user == null) {
            ErrorMessage errorMessage = new ErrorMessage("Enter all fields");
            return ResponseEntity.badRequest().body(errorMessage);
        };
        if(isEmptyLoginFields(user)) {
            ErrorMessage errorMessage = new ErrorMessage("All fields required");
            return ResponseEntity.badRequest().body(errorMessage);
        };
        User userDB = userRepository.findByUsername(user.getUsername());
        if(userDB == null ){
            ErrorMessage errorMessage = new ErrorMessage("User Name Does not Exist");
            return ResponseEntity.badRequest().body(errorMessage);
        }
        String Db_username = userDB.getUsername();
        String Db_password = userDB.getPassword();
        String Input_username = user.getUsername();
        String Input_password = user.getPassword();

        System.out.println(Db_username + "  " + Db_password);
        System.out.println(Input_username + "  " + Input_password);

        if((Input_username.equals(Db_username)) && (Input_password.equals(Db_password) )){
            userResponse.setId(userDB.getId());
            userResponse.setFirstName(userDB.getFirstname());
            userResponse.setLastname(userDB.getLastname());
            userResponse.setUsername(userDB.getUsername());
            userResponse.setRole(String.valueOf(userDB.getRole()));
            return ResponseEntity.ok(userResponse);
        }
        else {
            ErrorMessage errorMessage = new ErrorMessage("Incorrect Username or Password");
            return ResponseEntity.badRequest().body(errorMessage);
        }


    }

    public boolean isEmptyLoginFields(LoginDto loginDto){
        String username =  loginDto.getUsername();
        String password = loginDto.getPassword();
        return username.isEmpty() || password.isEmpty();
    }

    public boolean isEmptyUserFields(User user){
        return user.getFirstname().isEmpty() || user.getLastname().isEmpty()  || user.getUsername().isEmpty() ||  user.getPassword().isEmpty();
    }


}
