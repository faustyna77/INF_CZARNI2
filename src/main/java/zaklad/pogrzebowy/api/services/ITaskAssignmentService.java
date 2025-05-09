package zaklad.pogrzebowy.api.services;

import zaklad.pogrzebowy.api.models.TaskAssignment;
import zaklad.pogrzebowy.api.dto.TaskAssignmentDTO;

import java.util.List;
import java.util.Optional;

public interface ITaskAssignmentService {
    List<TaskAssignment> findAll();
    Optional<TaskAssignment> findById(Long id);
    List<TaskAssignment> findByUserId(Long userId);
    List<TaskAssignment> findByTaskId(Long taskId);
    TaskAssignment create(TaskAssignmentDTO dto);
    void delete(Long id);
}