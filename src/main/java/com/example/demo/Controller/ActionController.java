package com.example.demo.Controller;

import com.example.demo.DTO.AssignUserRequest;
import com.example.demo.Entity.Action;
import com.example.demo.Entity.UserAction;
import com.example.demo.Service.ActionService;
import com.example.demo.Service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", maxAge = 3600)
public class ActionController {

    @Autowired
    ActionService actionService;

    @Autowired
    UserService userService;

    @GetMapping("/actions")
    public ResponseEntity<List<Action>> getAllActions(){
        List<Action> actions = actionService.findAllActions();

        return new ResponseEntity<>(actions, HttpStatus.OK);
    }

    @GetMapping("/useractions")
    public ResponseEntity<List<UserAction>> getAllUserActions(){
        List<UserAction> userActions = actionService.findAllUserActions();

        return new ResponseEntity<>(userActions, HttpStatus.OK);
    }



    @PostMapping("/actions/add")
    ResponseEntity<Action> addAction(@RequestBody Action action){



        Action newAction = actionService.addAction(action);
        return new ResponseEntity<>(action, HttpStatus.OK);
    }

    @PutMapping("/actions/update/{id}")
    ResponseEntity<Action> updateAction(@RequestBody Action action,@PathVariable("id") Long id){
        action.setId(id);
        Action newAction = actionService.updateAction(action);
        return new ResponseEntity<>(newAction, HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/actions/delete/{id}")
    public ResponseEntity<?> deleteAction( @PathVariable("id") Long id ){

        actionService.deleteAction(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{actionId}/assign-user")
    public ResponseEntity<Void> assignUserToAction(
            @PathVariable Long actionId,
            @RequestBody AssignUserRequest request) {
        actionService.assignUserToAction(actionId, request.getUserId(), request.getStatus());
        return new ResponseEntity<Void>( HttpStatus.OK );
    }

    @PutMapping("/useractions/update/{id}")
    ResponseEntity<UserAction> updateUserAction(@RequestBody UserAction userAction, @PathVariable("id") Long id){

        UserAction newUserAction = actionService.updateUserAction(userAction);
        return new ResponseEntity<>(newUserAction, HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/useractions/delete/{id}")
    public ResponseEntity<?> deleteUserAction( @PathVariable("id") Long id ){
        actionService.deleteUserAction(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}



