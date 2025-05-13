package zaklad.pogrzebowy.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaklad.pogrzebowy.api.models.Task;
import zaklad.pogrzebowy.api.services.TaskService;
import zaklad.pogrzebowy.api.dto.TaskDTO;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<Task> tasks = taskService.findAll();
        List<TaskDTO> taskDTOs = tasks.stream()
            .map(TaskDTO::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(taskDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        return taskService.findById(id)
            .map(task -> ResponseEntity.ok(new TaskDTO(task)))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<TaskDTO>> getTasksByStatus(@PathVariable Task.Status status) {
        List<Task> tasks = taskService.findByStatus(status);
        List<TaskDTO> taskDTOs = tasks.stream()
            .map(TaskDTO::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(taskDTOs);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) {
        try {
            Task task = taskDTO.toEntity();
            Task savedTask = taskService.create(task);
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new TaskDTO(savedTask));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        try {
            Task taskToUpdate = taskDTO.toEntity();
            taskToUpdate.setId(id);
            Task updatedTask = taskService.update(id, taskToUpdate);
            return ResponseEntity.ok(new TaskDTO(updatedTask));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        try {
            taskService.delete(id);
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