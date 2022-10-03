package br.com.tradetarget.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
public class LoginController {

    @GetMapping("login")
    public ResponseEntity<?> login(){
        return ResponseEntity.ok("Login feito com sucesso");
    }

    @GetMapping("/admin")
    public String adminEndpoint() {
        return "Admin!";
    }

    @GetMapping("/user")
    public String userEndpoint() {
        return "User!";
    }

    @GetMapping("/all")
    public String allRolesEndpoint() {
        return "All Roles!";
    }

    @DeleteMapping("/delete")
    public String deleteEndpoint(@RequestBody String s) {
        return "I am deleting " + s;
    }
}
