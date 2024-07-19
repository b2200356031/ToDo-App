package com.example.demo.Entity;

import com.example.demo.Repo.UserRepo;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
public abstract class BaseEntity {

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;



    @PrePersist
    private void onCreate() {

        if (createdBy==null)
        {
            if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof UserDetails) {
                Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

                String username = ((UserDetails) principal).getUsername();
                this.createdBy = username;
            }

        }


    }

    @PreUpdate
    protected void onUpdate() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof UserDetails) {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String username = ((UserDetails) principal).getUsername();
            this.updatedBy = username;
        }

    }
}

