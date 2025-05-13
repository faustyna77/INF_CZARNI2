package zaklad.pogrzebowy.api.dto;

import zaklad.pogrzebowy.api.models.Order;
import java.time.LocalDateTime;

public class OrderDTO {
    private Long id;
    private String cadaverFirstName;
    private String cadaverLastName;
    private String deathCertificateNumber;
    private LocalDateTime orderDate;
    private String status;
    private UserDTO user;
    private ClientDTO client;

    // Constructors
    public OrderDTO() {}

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.cadaverFirstName = order.getCadaverFirstName();
        this.cadaverLastName = order.getCadaverLastName();
        this.deathCertificateNumber = order.getDeathCertificateNumber();
        this.orderDate = order.getOrderDate();
        this.status = order.getStatus().toString();
        this.user = order.getUser() != null ? new UserDTO(order.getUser()) : null;
        this.client = order.getClient() != null ? new ClientDTO(order.getClient()) : null;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getCadaverFirstName() {
        return cadaverFirstName;
    }

    public String getCadaverLastName() {
        return cadaverLastName;
    }

    public String getDeathCertificateNumber() {
        return deathCertificateNumber;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public String getStatus() {
        return status;
    }

    public UserDTO getUser() {
        return user;
    }

    public ClientDTO getClient() {
        return client;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setCadaverFirstName(String cadaverFirstName) {
        this.cadaverFirstName = cadaverFirstName;
    }

    public void setCadaverLastName(String cadaverLastName) {
        this.cadaverLastName = cadaverLastName;
    }

    public void setDeathCertificateNumber(String deathCertificateNumber) {
        this.deathCertificateNumber = deathCertificateNumber;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    // Convert DTO to Entity
    public Order toEntity() {
        Order order = new Order();
        order.setId(this.id);
        order.setCadaverFirstName(this.cadaverFirstName);
        order.setCadaverLastName(this.cadaverLastName);
        order.setDeathCertificateNumber(this.deathCertificateNumber);
        order.setOrderDate(this.orderDate);
        if (this.status != null) {
            order.setStatus(Order.Status.valueOf(this.status.toUpperCase()));
        }
        return order;
    }
}