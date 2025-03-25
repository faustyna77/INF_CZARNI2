package zaklad.pogrzebowy.api.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import zaklad.pogrzebowy.api.models.User;
import zaklad.pogrzebowy.api.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public User create(User user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash())); // Hashowanie hasła
        return repository.save(user);
    }

    @Override
    public User update(Long id, User updatedUser) {
        return repository.findById(id)
                .map(existingUser -> {
                    existingUser.setFirstName(updatedUser.getFirstName());
                    existingUser.setLastName(updatedUser.getLastName());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setRole(updatedUser.getRole());
                    return repository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
