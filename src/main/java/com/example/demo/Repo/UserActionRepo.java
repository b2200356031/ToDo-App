package com.example.demo.Repo;

import com.example.demo.Entity.UserAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserActionRepo extends JpaRepository<UserAction,Long> {



    void deleteAllByActionId(Long id);
}
