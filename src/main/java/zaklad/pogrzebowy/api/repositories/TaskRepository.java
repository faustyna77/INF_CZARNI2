package zaklad.pogrzebowy.api.repositories;



import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zaklad.pogrzebowy.api.models.Task;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @EntityGraph(attributePaths = {"assignedUser", "order"})
    List<Task> findAll();

    @EntityGraph(attributePaths = {"assignedUser", "order"})
    Optional<Task> findById(Long id);

    List<Task> findByStatus(Task.Status status);
    List<Task> findByAssignedUserId(Long userId);
}
