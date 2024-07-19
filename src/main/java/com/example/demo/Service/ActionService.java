package com.example.demo.Service;

import com.example.demo.Entity.Action;
import com.example.demo.Entity.BaseEntity;
import com.example.demo.Entity.User;
import com.example.demo.Entity.UserAction;
import com.example.demo.Repo.ActionRepo;
import com.example.demo.Repo.UserActionRepo;
import com.example.demo.Repo.UserRepo;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ActionService {

    private final ActionRepo actionRepo;

    @Autowired
    public ActionService (ActionRepo actionRepo){
        this.actionRepo = actionRepo;
    }

    @Autowired
    UserRepo userRepo;



    @Autowired
    private UserActionRepo userActionRepo;

    @Autowired
    UserService userService;

    public Action addAction(Action action){

        return actionRepo.save(action);
    }

    public Action updateAction(Action action)
    {

        return actionRepo.save(action);
    }

    public void deleteAction(Long id){
        userActionRepo.deleteAllByActionId(id);
        actionRepo.deleteById(id);
    }


    public List<Action> findAllActions() {
        return actionRepo.findAll();
    }

    public void assignUserToAction(Long actionId, Long userId, String status) {
        Action action = actionRepo.findById(actionId)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found"));
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserAction userAction = new UserAction();
        userAction.setAction(action);
        userAction.setUser(user);
        userAction.setStatus(status);

        userActionRepo.save(userAction);
    }

    public List<UserAction> findAllUserActions() {
        return userActionRepo.findAll();
    }

    public UserAction updateUserAction(UserAction userAction) {return userActionRepo.save(userAction);}

    public void deleteUserAction(Long id) {
        userActionRepo.deleteById(id);
    }



}
