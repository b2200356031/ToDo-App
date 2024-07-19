package com.example.demo.Controller;

import com.example.demo.Entity.Action;
import com.example.demo.Entity.User;
import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;
import com.example.demo.Service.ActionService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", maxAge = 3600)
public class UserController {

    @Autowired
    UserService userService;
    UserRepo userRepo;

    @PostMapping("/users/add")
    ResponseEntity<User> addUser(@RequestBody User user){
        User newUser = userService.addUser(user);


        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.findAllUsers();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }



    @PutMapping("/users/{id}/update")
    ResponseEntity<User> updateUser(@RequestBody User user,@PathVariable("id") Long id){

        User newUser = userService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}/delete")
    ResponseEntity<?> deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }



}
