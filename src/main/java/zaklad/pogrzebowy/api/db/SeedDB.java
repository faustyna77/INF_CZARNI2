package zaklad.pogrzebowy.api.db;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import zaklad.pogrzebowy.api.models.Client;
import zaklad.pogrzebowy.api.models.Order;
import zaklad.pogrzebowy.api.models.Task;
import zaklad.pogrzebowy.api.models.User;
import zaklad.pogrzebowy.api.repositories.ClientRepository;
import zaklad.pogrzebowy.api.repositories.OrderRepository;
import zaklad.pogrzebowy.api.repositories.TaskRepository;
import zaklad.pogrzebowy.api.repositories.UserRepository;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class DataInitializer implements InitializingBean {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void afterPropertiesSet() throws Exception {
        // Sprawdź czy baza jest pusta
        if (clientRepository.count() > 0) {
            System.out.println("Baza już zawiera dane - pomijanie inicjalizacji");
            return;
        }

        System.out.println("Inicjalizacja bazy przykładowymi danymi...");

        // Dodajemy przykładowych użytkowników
        List<User> users = createUsers();
        users.forEach(userRepository::save);

        // Dodajemy przykładowych klientów
        List<Client> clients = createClients();
        clients.forEach(clientRepository::save);

        // Dodajemy przykładowe zamówienia
        List<Order> orders = createOrders(clients);
        orders.forEach(orderRepository::save);

        // Dodajemy przykładowe zadania
        List<Task> tasks = createTasks(orders, users);
        tasks.forEach(taskRepository::save);

        System.out.println("Inicjalizacja zakończona!");
    }

    private List<User> createUsers() {
        return Arrays.asList(
                new User("admin", "admin@pogrzeb.pl", "haslo123", "ADMIN"),
                new User("pracownik1", "prac1@pogrzeb.pl", "haslo123", "EMPLOYEE"),
                new User("pracownik2", "prac2@pogrzeb.pl", "haslo123", "EMPLOYEE")
        );
    }

    private List<Client> createClients() {
        return Arrays.asList(
                new Client("Jan", "Kowalski", "123456789"),
                new Client("Anna", "Nowak", "987654321"),
                new Client("Piotr", "Wiśniewski", "555666777"),
                new Client("Marta", "Lis", "111222333"),
                new Client("Tomasz", "Zieliński", "444555666")
        );
    }

    private List<Order> createOrders(List<Client> clients) {
        // Tutaj musisz dostosować do swojej definicji klasy Order
        // Przykładowa implementacja (do dostosowania):
        return Arrays.asList(
                new Order(clients.get(0), /* inne parametry */),
                new Order(clients.get(1), /* inne parametry */),
                new Order(clients.get(2), /* inne parametry */)
        );
    }

    private List<Task> createTasks(List<Order> orders, List<User> users) {
        // Tutaj musisz dostosować do swojej definicji klasy Task
        // Przykładowa implementacja (do dostosowania):
        return Arrays.asList(
                new Task(orders.get(0), users.get(1), /* inne parametry */),
                new Task(orders.get(0), users.get(2), /* inne parametry */),
                new Task(orders.get(1), users.get(1), /* inne parametry */)
        );
    }
}