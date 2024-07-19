package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "user_actions")
public class UserAction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("userId")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonProperty("actionId")
    @ManyToOne
    @JoinColumn(name = "action_id")
    private Action action;

    @JsonProperty("status")
    @Column(name = "status")
    private String status;



}

