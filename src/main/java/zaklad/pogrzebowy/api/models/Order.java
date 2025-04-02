package zaklad.pogrzebowy.api.models;



import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderDate;

    private String cadaverFirstName;
    private String cadaverLastName;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

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

    public String getcadaverLastName() {
        return cadaverLastName;
    }

    public void setcadaverLastName(String cadaverLastName) {
        this.cadaverLastName= cadaverLastName;
    }

    public String getcadaverFirstName() {
        return cadaverFirstName;
    }

    public void setcadaverFirstName(String cadaverFirstName) {
        this.cadaverFirstName = cadaverFirstName;
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


}
