package zaklad.pogrzebowy.api.models;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "orders")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderDate;
    private LocalDateTime birthDate;  
    private LocalDateTime deathDate;  
    private String cadaverFirstName;
    private String cadaverLastName;

    @Column(name = "death_certificate_number", length = 50)
    private String deathCertificateNumber;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"assignedTasks", "passwordHash", "plainPassword", "email"})
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    @JsonIgnoreProperties({"orders"})
    private Client client;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"order", "assignments", "assignedUser"})
    private List<Task> tasks = new ArrayList<>();

    public enum Status {
        pending, completed, canceled
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public void setBirthDate(LocalDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public LocalDateTime getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(LocalDateTime deathDate) {
        this.deathDate = deathDate;
    }

    public LocalDateTime getBirthDate() {
        return birthDate;
    }

    public String getCadaverFirstName() {
        return cadaverFirstName;
    }

    public void setCadaverFirstName(String cadaverFirstName) {
        this.cadaverFirstName = cadaverFirstName;
    }

    public String getCadaverLastName() {
        return cadaverLastName;
    }

    public void setCadaverLastName(String cadaverLastName) {
        this.cadaverLastName = cadaverLastName;
    }

    public String getDeathCertificateNumber() {
        return deathCertificateNumber;
    }

    public void setDeathCertificateNumber(String deathCertificateNumber) {
        this.deathCertificateNumber = deathCertificateNumber;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
    public void setId(Long id) {
        this.id = id;
    }
}