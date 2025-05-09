package zaklad.pogrzebowy.api.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaklad.pogrzebowy.api.dto.TaskAssignmentDTO;
import zaklad.pogrzebowy.api.models.TaskAssignment;
import zaklad.pogrzebowy.api.services.TaskAssignmentService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/assignments")
@CrossOrigin(origins = "*")
public class TaskAssignmentController {

    private static final Logger logger = LoggerFactory.getLogger(TaskAssignmentController.class);

    @Autowired
    private TaskAssignmentService service;

    @GetMapping
    public ResponseEntity<List<TaskAssignmentDTO>> getAll() {
        try {
            logger.info("Fetching all task assignments");
            List<TaskAssignment> assignments = service.findAll();
            List<TaskAssignmentDTO> dtos = assignments.stream()
                .map(TaskAssignmentDTO::new)
                .collect(Collectors.toList());
            logger.info("Found {} task assignments", dtos.size());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            logger.error("Error fetching all task assignments", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskAssignmentDTO> getById(@PathVariable Long id) {
        try {
            logger.info("Fetching task assignment with id: {}", id);
            return service.findById(id)
                .map(assignment -> {
                    logger.info("Found task assignment: {}", assignment);
                    return ResponseEntity.ok(new TaskAssignmentDTO(assignment));
                })
                .orElseGet(() -> {
                    logger.warn("Task assignment not found with id: {}", id);
                    return ResponseEntity.notFound().build();
                });
        } catch (Exception e) {
            logger.error("Error fetching task assignment with id: {}", id, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskAssignmentDTO>> getByUserId(@PathVariable Long userId) {
        try {
            logger.info("Fetching task assignments for user id: {}", userId);
            List<TaskAssignment> assignments = service.findByUserId(userId);
            List<TaskAssignmentDTO> dtos = assignments.stream()
                .map(TaskAssignmentDTO::new)
                .collect(Collectors.toList());
            logger.info("Found {} assignments for user id: {}", dtos.size(), userId);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            logger.error("Error fetching task assignments for user id: {}", userId, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<TaskAssignmentDTO>> getByTaskId(@PathVariable Long taskId) {
        try {
            logger.info("Fetching task assignments for task id: {}", taskId);
            List<TaskAssignment> assignments = service.findByTaskId(taskId);
            List<TaskAssignmentDTO> dtos = assignments.stream()
                .map(TaskAssignmentDTO::new)
                .collect(Collectors.toList());
            logger.info("Found {} assignments for task id: {}", dtos.size(), taskId);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            logger.error("Error fetching task assignments for task id: {}", taskId, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<TaskAssignmentDTO> create(@RequestBody TaskAssignmentDTO dto) {
        try {
            logger.info("Creating new task assignment: {}", dto);
            TaskAssignment assignment = service.create(dto);
            TaskAssignmentDTO createdDto = new TaskAssignmentDTO(assignment);
            logger.info("Created task assignment: {}", createdDto);
            return ResponseEntity.ok(createdDto);
        } catch (Exception e) {
            logger.error("Error creating task assignment", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            logger.info("Deleting task assignment with id: {}", id);
            service.delete(id);
            logger.info("Successfully deleted task assignment with id: {}", id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting task assignment with id: {}", id, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}