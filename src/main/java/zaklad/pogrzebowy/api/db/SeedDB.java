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
import java.time.LocalDateTime;


import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class SeedDB implements InitializingBean {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

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
        List<Order> orders = createOrders(clients, users);
        orders.forEach(orderRepository::save);

        // Dodajemy przykładowe zadania
        List<Task> tasks = createTasks(orders, users);
        tasks.forEach(taskRepository::save);

        System.out.println("Inicjalizacja zakończona!");
    }

    private List<User> createUsers() {
        return Arrays.asList(
                new User("Faustyna", "Misiura", "faustyna@zaklad.pl", passwordEncoder.encode("admin"), User.Role.ADMIN),
                new User("Michał", "Dyjak", "michal@zaklad.pl", passwordEncoder.encode("admin"), User.Role.ADMIN),
                new User("Mateusz", "Hołyszko", "mateusz_h@zaklad.pl", passwordEncoder.encode("admin"), User.Role.ADMIN),
                new User("Mateusz", "Florian", "mateusz_f@zaklad.pl", passwordEncoder.encode("admin"), User.Role.ADMIN),
                new User("Pracownik", "Pierwszy", "prac1@zaklad.pl", passwordEncoder.encode("user"), User.Role.USER),
                new User("Pracownik", "Drugi", "prac2@zaklad.pl", passwordEncoder.encode("user"), User.Role.USER),
                new User("Pracownik", "Trzeci", "prac3@zaklad.pl", passwordEncoder.encode("user"), User.Role.USER)
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

    private List<Order> createOrders(List<Client> clients, List<User> users) {
        return Arrays.asList(
                new Order(
                        "Michalina", "Kot",
                        Order.Status.pending,
                        users.get(1)
                ),
                new Order(
                        "Agnieszka", "Włos",
                        Order.Status.completed,
                        users.get(2)
                ),
                new Order(
                        "Tatiana", "Kieliszek",
                        Order.Status.canceled,
                        users.get(1)
                )
        );
    }

    private List<Task> createTasks(List<Order> orders, List<User> users) {
        return Arrays.asList(
                new Task(
                        "Transport ciała",
                        "Transport ciała z domu do chłodni",
                        Task.Status.in_progress,
                        Task.Priority.high,
                        LocalDateTime.now().plusDays(1),
                        LocalDateTime.now().minusHours(2),
                        LocalDateTime.now().minusHours(1),
                        orders.get(0)
                ),
                new Task(
                        "Zamówienie trumny",
                        "Zamówienie trumny standardowej",
                        Task.Status.pending,
                        Task.Priority.medium,
                        LocalDateTime.now().plusDays(2),
                        LocalDateTime.now().minusHours(4),
                        LocalDateTime.now().minusHours(1),
                        orders.get(0)
                ),
                new Task(
                        "Organizacja ceremonii",
                        "Rezerwacja kaplicy i księdza",
                        Task.Status.completed,
                        Task.Priority.high,
                        LocalDateTime.now().plusDays(3),
                        LocalDateTime.now().minusDays(1),
                        LocalDateTime.now(),
                        orders.get(1)
                )
        );
    }
}