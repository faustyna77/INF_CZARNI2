package db;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import zaklad.pogrzebowy.api.models.*;
import zaklad.pogrzebowy.api.services.*;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication(scanBasePackages = {"zaklad.pogrzebowy.api"})
public class SeedDB {

    @Autowired
    private ClientService clientService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskAssignmentService taskAssignmentService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(SeedDB.class, args);
    }

    @Bean
    InitializingBean seed() {
        return () -> {
            // Only seed if database is empty
            /*
            if (!clientService.findAll().isEmpty()) {
               return;
            }
            */

            // 1. Seed Users
            List<User> users = List.of(
                    new User("Admin", "Admin", "admin@gmail.com", "1234", User.Role.ADMIN),
                    new User("Anna", "Nowak", "anna.nowak@zaklad.com", "user123", User.Role.USER),
                    new User("Piotr", "Wiśniewski", "piotr.wisniewski@zaklad.com", "user123", User.Role.USER),
                    new User("Maria", "Dąbrowska", "maria.dabrowska@zaklad.com", "user123", User.Role.USER),
                    new User("Krzysztof", "Lewandowski", "krzysztof.lewandowski@zaklad.com", "user123", User.Role.USER)
            );

            // Save users through the service
            users.forEach(userService::create);

            // 2. Seed Clients
            List<Client> clients = List.of(
                    new Client("Adam", "Nowak", "+48 123 456 789"),
                    new Client("Barbara", "Kowalska", "+48 987 654 321"),
                    new Client("Cezary", "Pazura", "+48 555 666 777"),
                    new Client("Dorota", "Rabczewska", "+48 111 222 333"),
                    new Client("Edward", "Gierek", "+48 444 555 666")
            );
            clients.forEach(clientService::create);

            // 3. Seed Orders
            LocalDateTime now = LocalDateTime.now();
            List<Order> orders = List.of(
                    createOrder(now.minusDays(5), "Jan", "Nowak", Order.Status.pending, users.get(1), clients.get(0)),
                    createOrder(now.minusDays(3), "Maria", "Kowalska", Order.Status.completed, users.get(2), clients.get(1)),
                    createOrder(now.minusDays(2), "Piotr", "Wiśniewski", Order.Status.pending, users.get(3), clients.get(2)),
                    createOrder(now.minusDays(1), "Anna", "Dąbrowska", Order.Status.pending, users.get(4), clients.get(3)),
                    createOrder(now.minusHours(6), "Krzysztof", "Lewandowski", Order.Status.canceled, users.get(1), clients.get(4))
            );
            orders.forEach(orderService::create);

            // 4. Seed Tasks
            List<Task> tasks = List.of(
                    createTask("Prepare documentation", "Collect documents", Task.Status.pending,
                            Task.Priority.high, now.plusDays(1), orders.get(0)),
                    createTask("Order flowers", "Arrange flower delivery", Task.Status.in_progress,
                            Task.Priority.medium, now.plusDays(2), orders.get(1)),
                    createTask("Schedule ceremony", "Book chapel and priest", Task.Status.completed,
                            Task.Priority.high, now.minusDays(1), orders.get(2)),
                    createTask("Prepare obituary", "Write obituary notice", Task.Status.pending,
                            Task.Priority.low, now.plusDays(3), orders.get(3)),
                    createTask("Arrange transportation", "Organize vehicles", Task.Status.canceled,
                            Task.Priority.medium, now.plusDays(1), orders.get(4))
            );
            tasks.forEach(taskService::create);

            // 5. Seed Task Assignments
            List<TaskAssignment> assignments = List.of(
                    new TaskAssignment(tasks.get(0), users.get(1), now.minusDays(1)),
                    new TaskAssignment(tasks.get(1), users.get(2), now.minusDays(2)),
                    new TaskAssignment(tasks.get(2), users.get(3), now.minusDays(3)),
                    new TaskAssignment(tasks.get(3), users.get(4), now.minusDays(1)),
                    new TaskAssignment(tasks.get(4), users.get(1), now.minusHours(12))
            );
            assignments.forEach(taskAssignmentService::create);

            // 6. Seed Reports
            List<Report> reports = List.of(
                    new Report(Report.ReportType.DAILY, users.get(0), now.minusDays(1), "/reports/daily_20230501.pdf"),
                    new Report(Report.ReportType.WEEKLY, users.get(0), now.minusWeeks(1), "/reports/weekly_20230424.pdf"),
                    new Report(Report.ReportType.MONTHLY, users.get(0), now.minusMonths(1), "/reports/monthly_20230401.pdf"),
                    new Report(Report.ReportType.CUSTOM, users.get(1), now.minusDays(2), "/reports/custom_20230429.pdf"),
                    new Report(Report.ReportType.DAILY, users.get(1), now.minusDays(1), "/reports/daily_20230501_user2.pdf")
            );
            reports.forEach(reportService::create);
        };
    }

    private Order createOrder(LocalDateTime date, String firstName, String lastName,
                              Order.Status status, User user, Client client) {
        Order order = new Order();
        order.setOrderDate(date);
        order.setCadaverFirstName(firstName);
        order.setCadaverLastName(lastName);
        order.setStatus(status);
        order.setUser(user);
        order.setClient(client);
        return order;
    }

    private Task createTask(String name, String desc, Task.Status status,
                            Task.Priority priority, LocalDateTime dueDate, Order order) {
        Task task = new Task();
        task.setTaskName(name);
        task.setDescription(desc);
        task.setStatus(status);
        task.setPriority(priority);
        task.setDueDate(dueDate);
        task.setOrder(order);
        return task;
    }
}