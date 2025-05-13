package zaklad.pogrzebowy.api.models;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

@Entity
@Table(name = "task_assignments")
public class TaskAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "task_id", nullable = false)
    @JsonIgnoreProperties({"assignments", "assignedUser", "order"})
    private Task task;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"assignedTasks", "passwordHash", "plainPassword", "email"})
    private User user;

    @Column(name = "assigned_at", nullable = false)
    private LocalDateTime assignedAt;

    // Constructors
    public TaskAssignment() {
        this.assignedAt = LocalDateTime.now();
    }

    public TaskAssignment(Task task, User user, LocalDateTime assignedAt) {
        this.task = task;
        this.user = user;
        this.assignedAt = assignedAt;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public Task getTask() {
        return task;
    }

    public User getUser() {
        return user;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }
}