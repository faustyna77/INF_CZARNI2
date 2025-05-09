package zaklad.pogrzebowy.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zaklad.pogrzebowy.api.models.Order;
import zaklad.pogrzebowy.api.models.Client;
import zaklad.pogrzebowy.api.repositories.ClientRepository;
import zaklad.pogrzebowy.api.repositories.OrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Order> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Order> findById(Long id) {
        return repository.findById(id);
    }


    @Override
    public List<Order> findByStatus(Order.Status status) {
        return repository.findByStatus(status); // <- wywołanie metody repozytorium
    }


    @Override
    public Order create(Order order) {
        return repository.save(order);
    }

    @Override
    public Order update(Long id, Order updatedOrder) {
        return repository.findById(id)
                .map(existingOrder -> {
                    existingOrder.setOrderDate(updatedOrder.getOrderDate());
                    existingOrder.setStatus(updatedOrder.getStatus());
                    existingOrder.setCadaverFirstName(updatedOrder.getCadaverFirstName());
                    existingOrder.setCadaverLastName(updatedOrder.getCadaverLastName());
                    existingOrder.setUser(updatedOrder.getUser());
                    return repository.save(existingOrder);
                })
                .orElseThrow(() -> new RuntimeException("Zamówienie nie znalezione"));
    }

    @Override
    public void delete(Long id) {
        Order order = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Get the client before deleting the order
        Client client = order.getClient();

        // Delete the order first
        repository.deleteById(id);

        // Then delete the associated client if exists
        if (client != null) {
            clientRepository.deleteById(client.getId());
        }
    }
}
