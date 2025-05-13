package zaklad.pogrzebowy.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zaklad.pogrzebowy.api.models.TaskAssignment;
import zaklad.pogrzebowy.api.models.Task;
import zaklad.pogrzebowy.api.models.User;
import zaklad.pogrzebowy.api.repositories.TaskAssignmentRepository;
import zaklad.pogrzebowy.api.repositories.TaskRepository;
import zaklad.pogrzebowy.api.repositories.UserRepository;
import zaklad.pogrzebowy.api.dto.TaskAssignmentDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TaskAssignmentService implements ITaskAssignmentService {

    @Autowired
    private TaskAssignmentRepository repository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<TaskAssignment> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<TaskAssignment> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<TaskAssignment> findByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public List<TaskAssignment> findByTaskId(Long taskId) {
        return repository.findByTaskId(taskId);
    }

    @Override
    public TaskAssignment create(TaskAssignmentDTO dto) {
        Task task = taskRepository.findById(dto.getTaskId())
            .orElseThrow(() -> new RuntimeException("Task not found"));
            
        User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        TaskAssignment assignment = new TaskAssignment();
        assignment.setTask(task);
        assignment.setUser(user);
        assignment.setAssignedAt(LocalDateTime.now());

        return repository.save(assignment);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}