package zaklad.pogrzebowy.api.db;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import zaklad.pogrzebowy.api.models.*;
import zaklad.pogrzebowy.api.repositories.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SeedDBTest {
    private static final Logger logger = LoggerFactory.getLogger(SeedDBTest.class);

    @InjectMocks
    private SeedDB seedDB;

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TaskAssignmentRepository taskAssignmentRepository;

    @Mock
    private ReportRepository reportRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    @Captor
    private ArgumentCaptor<Order> orderCaptor;

    @Captor
    private ArgumentCaptor<Task> taskCaptor;

    @BeforeEach
    void setUp() {
        logger.info("Inicjalizacja mocków dla testów SeedDB");
        MockitoAnnotations.openMocks(this);
        when(passwordEncoder.encode(anyString())).thenReturn("encoded_password");
    }

    @Test
    @DisplayName("Gdy baza jest pusta, wszystkie dane powinny zostać wczytane")
    void whenDatabaseIsEmpty_AllDataShouldBeSeeded() throws Exception {
        // Arrange
        logger.info("Test: whenDatabaseIsEmpty_AllDataShouldBeSeeded");
        when(clientRepository.count()).thenReturn(0L);

        // Act
        logger.info("Wywołanie metody afterPropertiesSet");
        seedDB.afterPropertiesSet();

        // Assert
        logger.info("Weryfikacja liczby zapisanych obiektów");
        verify(userRepository, times(7)).save(any(User.class));
        verify(clientRepository, times(5)).save(any(Client.class));
        verify(orderRepository, times(3)).save(any(Order.class));
        verify(taskRepository, times(3)).save(any(Task.class));
        verify(taskAssignmentRepository, times(3)).save(any(TaskAssignment.class));
        verify(reportRepository, times(5)).save(any(Report.class));

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Gdy baza jest już wypełniona, seedowanie powinno zostać pominięte")
    void whenDatabaseIsNotEmpty_SeedingShouldBeSkipped() throws Exception {
        // Arrange
        logger.info("Test: whenDatabaseIsNotEmpty_SeedingShouldBeSkipped");
        when(clientRepository.count()).thenReturn(10L);

        // Act
        logger.info("Wywołanie metody afterPropertiesSet gdy baza już zawiera dane");
        seedDB.afterPropertiesSet();

        // Assert
        logger.info("Weryfikacja, że żadne dane nie zostały zapisane");
        verify(userRepository, never()).save(any(User.class));
        verify(clientRepository, never()).save(any(Client.class));
        verify(orderRepository, never()).save(any(Order.class));
        verify(taskRepository, never()).save(any(Task.class));
        verify(taskAssignmentRepository, never()).save(any(TaskAssignment.class));
        verify(reportRepository, never()).save(any(Report.class));

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Powinno zostać utworzonych dokładnie 7 użytkowników")
    void shouldCreateExactlySevenUsers() throws Exception {
        // Arrange
        logger.info("Test: shouldCreateExactlySevenUsers");
        when(clientRepository.count()).thenReturn(0L);

        // Act
        logger.info("Wywołanie metody afterPropertiesSet");
        seedDB.afterPropertiesSet();

        // Assert
        logger.info("Przechwytywanie zapisanych użytkowników");
        verify(userRepository, times(7)).save(userCaptor.capture());
        List<User> capturedUsers = userCaptor.getAllValues();

        logger.info("Weryfikacja liczby użytkowników: {}", capturedUsers.size());
        assertEquals(7, capturedUsers.size());

        // Zliczamy ilość adminów i użytkowników
        long adminCount = capturedUsers.stream()
                .filter(user -> user.getRole() == User.Role.ADMIN)
                .count();
        long userCount = capturedUsers.stream()
                .filter(user -> user.getRole() == User.Role.USER)
                .count();

        logger.info("Liczba adminów: {}, Liczba zwykłych użytkowników: {}", adminCount, userCount);
        assertEquals(4, adminCount, "Powinno być dokładnie 4 adminów");
        assertEquals(3, userCount, "Powinno być dokładnie 3 zwykłych użytkowników");

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Powinno zostać utworzonych dokładnie 5 klientów")
    void shouldCreateExactlyFiveClients() throws Exception {
        // Arrange
        logger.info("Test: shouldCreateExactlyFiveClients");
        when(clientRepository.count()).thenReturn(0L);

        // Act
        logger.info("Wywołanie metody afterPropertiesSet");
        seedDB.afterPropertiesSet();

        // Assert
        logger.info("Weryfikacja liczby klientów");
        verify(clientRepository, times(5)).save(any(Client.class));

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Powinny zostać utworzone zamówienia o różnych statusach")
    void shouldCreateOrdersWithDifferentStatuses() throws Exception {
        // Arrange
        logger.info("Test: shouldCreateOrdersWithDifferentStatuses");
        when(clientRepository.count()).thenReturn(0L);

        // Act
        logger.info("Wywołanie metody afterPropertiesSet");
        seedDB.afterPropertiesSet();

        // Assert
        logger.info("Przechwytywanie zapisanych zamówień");
        verify(orderRepository, times(3)).save(orderCaptor.capture());
        List<Order> capturedOrders = orderCaptor.getAllValues();

        logger.info("Weryfikacja liczby zamówień: {}", capturedOrders.size());
        assertEquals(3, capturedOrders.size());

        // Sprawdzamy statusy zamówień
        boolean hasPendingOrder = capturedOrders.stream()
                .anyMatch(order -> order.getStatus() == Order.Status.pending);
        boolean hasCompletedOrder = capturedOrders.stream()
                .anyMatch(order -> order.getStatus() == Order.Status.completed);
        boolean hasCanceledOrder = capturedOrders.stream()
                .anyMatch(order -> order.getStatus() == Order.Status.canceled);

        logger.info("Statusy zamówień - pending: {}, completed: {}, canceled: {}",
                hasPendingOrder, hasCompletedOrder, hasCanceledOrder);

        assertTrue(hasPendingOrder, "Powinno być co najmniej jedno zamówienie w statusie pending");
        assertTrue(hasCompletedOrder, "Powinno być co najmniej jedno zamówienie w statusie completed");
        assertTrue(hasCanceledOrder, "Powinno być co najmniej jedno zamówienie w statusie canceled");

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Powinny zostać utworzone zadania o różnych priorytetach")
    void shouldCreateTasksWithDifferentPriorities() throws Exception {
        // Arrange
        logger.info("Test: shouldCreateTasksWithDifferentPriorities");
        when(clientRepository.count()).thenReturn(0L);

        // Act
        logger.info("Wywołanie metody afterPropertiesSet");
        seedDB.afterPropertiesSet();

        // Assert
        logger.info("Przechwytywanie zapisanych zadań");
        verify(taskRepository, times(3)).save(taskCaptor.capture());
        List<Task> capturedTasks = taskCaptor.getAllValues();

        logger.info("Weryfikacja liczby zadań: {}", capturedTasks.size());
        assertEquals(3, capturedTasks.size());

        // Sprawdzamy priorytety zadań
        boolean hasHighPriorityTask = capturedTasks.stream()
                .anyMatch(task -> task.getPriority() == Task.Priority.high);
        boolean hasMediumPriorityTask = capturedTasks.stream()
                .anyMatch(task -> task.getPriority() == Task.Priority.medium);

        logger.info("Priorytety zadań - high: {}, medium: {}", hasHighPriorityTask, hasMediumPriorityTask);

        assertTrue(hasHighPriorityTask, "Powinno być co najmniej jedno zadanie o wysokim priorytecie");
        assertTrue(hasMediumPriorityTask, "Powinno być co najmniej jedno zadanie o średnim priorytecie");

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Powinny zostać utworzone zadania o różnych statusach")
    void shouldCreateTasksWithDifferentStatuses() throws Exception {
        // Arrange
        logger.info("Test: shouldCreateTasksWithDifferentStatuses");
        when(clientRepository.count()).thenReturn(0L);

        // Act
        logger.info("Wywołanie metody afterPropertiesSet");
        seedDB.afterPropertiesSet();

        // Assert
        logger.info("Przechwytywanie zapisanych zadań");
        verify(taskRepository, times(3)).save(taskCaptor.capture());
        List<Task> capturedTasks = taskCaptor.getAllValues();

        // Sprawdzamy statusy zadań
        boolean hasPendingTask = capturedTasks.stream()
                .anyMatch(task -> task.getStatus() == Task.Status.pending);
        boolean hasInProgressTask = capturedTasks.stream()
                .anyMatch(task -> task.getStatus() == Task.Status.in_progress);
        boolean hasCompletedTask = capturedTasks.stream()
                .anyMatch(task -> task.getStatus() == Task.Status.completed);

        logger.info("Statusy zadań - pending: {}, in_progress: {}, completed: {}",
                hasPendingTask, hasInProgressTask, hasCompletedTask);

        assertTrue(hasPendingTask, "Powinno być co najmniej jedno zadanie w statusie pending");
        assertTrue(hasInProgressTask, "Powinno być co najmniej jedno zadanie w statusie in_progress");
        assertTrue(hasCompletedTask, "Powinno być co najmniej jedno zadanie w statusie completed");

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Password encoder powinien być użyty dla każdego użytkownika")
    void passwordEncoderShouldBeUsedForEachUser() throws Exception {
        // Arrange
        logger.info("Test: passwordEncoderShouldBeUsedForEachUser");
        when(clientRepository.count()).thenReturn(0L);

        // Act
        logger.info("Wywołanie metody afterPropertiesSet");
        seedDB.afterPropertiesSet();

        // Assert
        logger.info("Weryfikacja użycia encodera haseł");
        verify(passwordEncoder, times(4)).encode("admin");
        verify(passwordEncoder, times(3)).encode("user");
        verify(passwordEncoder, times(7)).encode(anyString());

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Baza nie powinna być inicjalizowana dwukrotnie")
    void databaseShouldNotBeSeededTwice() throws Exception {
        // Arrange
        logger.info("Test: databaseShouldNotBeSeededTwice");
        when(clientRepository.count()).thenReturn(0L);

        // Act - pierwsze seedowanie
        logger.info("Pierwsze wywołanie metody afterPropertiesSet");
        seedDB.afterPropertiesSet();

        // Zmiana warunków - baza już nie jest pusta
        logger.info("Zmiana stanu bazy na niepustą");
        when(clientRepository.count()).thenReturn(10L);

        // Act - próba ponownego seedowania
        logger.info("Drugie wywołanie metody afterPropertiesSet");
        seedDB.afterPropertiesSet();

        // Assert
        logger.info("Weryfikacja liczby wywołań save");
        verify(userRepository, times(7)).save(any(User.class));
        verify(clientRepository, times(5)).save(any(Client.class));
        verify(orderRepository, times(3)).save(any(Order.class));
        verify(taskRepository, times(3)).save(any(Task.class));
        verify(taskAssignmentRepository, times(3)).save(any(TaskAssignment.class));
        verify(reportRepository, times(5)).save(any(Report.class));

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Wyjątek powinien zostać propagowany")
    void exceptionShouldBePropagate() throws Exception {
        // Arrange
        logger.info("Test: exceptionShouldBePropagate");
        when(clientRepository.count()).thenReturn(0L);
        doThrow(new RuntimeException("Błąd bazy danych")).when(userRepository).save(any(User.class));

        // Act & Assert
        logger.info("Oczekiwanie wyjątku podczas wywołania afterPropertiesSet");
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            seedDB.afterPropertiesSet();
        });

        logger.info("Weryfikacja komunikatu wyjątku: {}", exception.getMessage());
        assertEquals("Błąd bazy danych", exception.getMessage());

        logger.info("Test zakończony pomyślnie");
    }
}