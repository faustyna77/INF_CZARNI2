package zaklad.pogrzebowy.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaklad.pogrzebowy.api.repositories.UserRepository;
import zaklad.pogrzebowy.api.security.JwtUtil;
import zaklad.pogrzebowy.api.services.UserService;
import zaklad.pogrzebowy.api.models.User;
import zaklad.pogrzebowy.api.dto.UserDTO;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);
            return userRepository.findByEmail(email)
                    .map(user -> ResponseEntity.ok(new UserDTO(user)))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        try {
            List<User> users = userService.findAll();
            List<UserDTO> userDTOs = users.stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
            return ResponseEntity.ok(userDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok(new UserDTO(user)))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
            .map(user -> ResponseEntity.ok(new UserDTO(user)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        try {
            User user = userDTO.toEntity();
            User createdUser = userService.create(user);
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new UserDTO(createdUser));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .build();
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        try {
            User user = userDTO.toEntity();
            user.setId(id);
            User updatedUser = userService.update(id, user);
            return ResponseEntity.ok(new UserDTO(updatedUser));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .build();
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.delete(id);
            return ResponseEntity
                .noContent()
                .build();
        } catch (Exception e) {
            return ResponseEntity
                .notFound()
                .build();
        }
    }
}