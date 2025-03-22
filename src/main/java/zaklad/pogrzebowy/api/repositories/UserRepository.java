package zaklad.pogrzebowy.api.repositories;

import zaklad.pogrzebowy.api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository  // ✅ Upewnij się, że ta adnotacja jest obecna!
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
