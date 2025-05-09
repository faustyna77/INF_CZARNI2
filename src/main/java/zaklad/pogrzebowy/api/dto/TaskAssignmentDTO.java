package zaklad.pogrzebowy.api.dto;

import zaklad.pogrzebowy.api.models.TaskAssignment;
import java.time.LocalDateTime;

public class TaskAssignmentDTO {
    private Long id;
    private Long taskId;
    private Long userId;
    private LocalDateTime assignedAt;
    private String taskName;
    private String userName;

    // Default constructor
    public TaskAssignmentDTO() {}

    // Constructor from entity
    public TaskAssignmentDTO(TaskAssignment assignment) {
        this.id = assignment.getId();
        this.taskId = assignment.getTask().getId();
        this.userId = assignment.getUser().getId();
        this.assignedAt = assignment.getAssignedAt();
        this.taskName = assignment.getTask().getTaskName();
        this.userName = assignment.getUser().getFirstName() + " " + assignment.getUser().getLastName();
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}