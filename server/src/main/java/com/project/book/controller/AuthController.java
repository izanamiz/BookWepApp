package com.project.book.controller;

import com.project.book.domain.dao.User;
import com.project.book.domain.dto.LoginForm;
import com.project.book.domain.dto.TokenResponse;
import com.project.book.domain.dto.LoginResponse;
import com.project.book.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class AuthController {

    private final AuthService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> register (@RequestBody LoginForm form){
       return userService.register(form);
    }

    @PostMapping("/login")
    public ResponseEntity<?> getToken (@RequestBody LoginForm form){
    	User user = userService.getUserByUsername(form.getUsername());
    	TokenResponse token = userService.generateToken(form);
        LoginResponse loginResponse = new LoginResponse(user, token);
        return ResponseEntity.ok(loginResponse);
    }
}
