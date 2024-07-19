package com.example.demo.Service;

import com.example.demo.Entity.JWTUtils;
import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, JWTUtils jwtUtils) {
        this.userRepo = userRepo;
        this.jwtUtils = jwtUtils;
    }


    public List<User> findAllUsers(){
        return userRepo.findAll();
    }

    public User findUserByEmail(String email){
        return userRepo.findByEmail(email).orElseThrow();
    }

    public User getCurrentUser(String token) {
        String userEmail = jwtUtils.extractUsername(token);
        return userRepo.findByEmail(userEmail).orElseThrow();
    }

public User addUser(User user){

        return userRepo.save(user);
}

public User updateUser(User user){
        return userRepo.save(user);
}

public void deleteUser (Long id) {
        userRepo.deleteById(id);
}



}
