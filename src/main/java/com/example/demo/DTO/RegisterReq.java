package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)

public class RegisterReq {
    int statusCode;
    String error;
    String message;
    String token;
    String refreshToken;
    String expirationTime;
    String firstname;
    String lastname;
    String username;
    String nick;
    String name;
    String email;
    String password;
    String users;
}
