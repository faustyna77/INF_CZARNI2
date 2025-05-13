package zaklad.pogrzebowy.api.dto;

import zaklad.pogrzebowy.api.models.User;

public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String passwordHash;

    // Constructors
    public UserDTO() {}

    public UserDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole().toString();
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    // Convert DTO to Entity
    public User toEntity() {
        User user = new User();
        user.setId(this.id);
        user.setFirstName(this.firstName);
        user.setLastName(this.lastName);
        user.setEmail(this.email);
        if (this.passwordHash != null) {
            user.setPasswordHash(this.passwordHash);
        }
        if (this.role != null) {
            user.setRole(User.Role.valueOf(this.role.toUpperCase()));
        }
        return user;
    }
}