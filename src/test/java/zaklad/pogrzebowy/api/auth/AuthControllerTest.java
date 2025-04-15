package zaklad.pogrzebowy.api.auth;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import zaklad.pogrzebowy.api.controllers.AuthController;
import zaklad.pogrzebowy.api.models.User;
import zaklad.pogrzebowy.api.repositories.UserRepository;
import zaklad.pogrzebowy.api.security.JwtUtil;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AuthControllerTest {
    private static final Logger logger = LoggerFactory.getLogger(AuthControllerTest.class);

    @InjectMocks
    private AuthController authController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @Captor
    private ArgumentCaptor<String> emailCaptor;

    private User testUser;

    @BeforeEach
    void setUp() {
        logger.info("Inicjalizacja mocków dla testów AuthController");
        MockitoAnnotations.openMocks(this);

        testUser = new User();
        testUser.setEmail("test@example.com");
        testUser.setPasswordHash("encodedPassword");
        testUser.setRole(User.Role.ADMIN);
    }

    @Test
    @DisplayName("Gdy podano poprawne dane logowania, powinien zwrócić token JWT")
    void whenValidCredentialsProvided_shouldReturnJwtToken() {
        // Arrange
        logger.info("Przygotowanie danych testowych dla poprawnego logowania");
        User loginRequest = new User();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPasswordHash("rawPassword");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("rawPassword", "encodedPassword")).thenReturn(true);
        when(jwtUtil.generateToken("test@example.com")).thenReturn("mockToken123");

        // Act
        logger.info("Wywołanie metody login");
        ResponseEntity<?> response = authController.login(loginRequest);

        // Assert
        logger.info("Weryfikacja odpowiedzi");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("mockToken123"));

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Gdy hasło jest null, powinien zwrócić status 401")
    void whenPasswordIsNull_shouldReturnUnauthorized() {
        // Arrange
        logger.info("Przygotowanie danych testowych dla null hasła");
        User loginRequest = new User();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPasswordHash(null);

        // Act
        logger.info("Wywołanie metody login z null hasłem");
        ResponseEntity<?> response = authController.login(loginRequest);

        // Assert
        logger.info("Weryfikacja odpowiedzi");
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Nieprawidłowy email lub hasło", response.getBody());

        // Note: The controller actually checks the repository first, so we verify it was called
        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(jwtUtil, never()).generateToken(anyString());

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Gdy email zawiera białe znaki, powinien zwrócić status 401")
    void whenEmailHasWhitespace_shouldReturnUnauthorized() {
        // Arrange
        logger.info("Przygotowanie danych testowych dla emaila z białymi znakami");
        User loginRequest = new User();
        loginRequest.setEmail("  test@example.com  ");
        loginRequest.setPasswordHash("rawPassword");

        // Act
        logger.info("Wywołanie metody login z nieprzyciętym emailem");
        ResponseEntity<?> response = authController.login(loginRequest);

        // Assert
        logger.info("Weryfikacja odpowiedzi");
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Nieprawidłowy email lub hasło", response.getBody());

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Gdy użytkownik nie istnieje, powinien zwrócić status 401")
    void whenUserNotFound_shouldReturnUnauthorized() {
        // Arrange
        logger.info("Przygotowanie danych testowych dla nieistniejącego użytkownika");
        User loginRequest = new User();
        loginRequest.setEmail("nonexistent@example.com");
        loginRequest.setPasswordHash("password");

        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        // Act
        logger.info("Wywołanie metody login dla nieistniejącego użytkownika");
        ResponseEntity<?> response = authController.login(loginRequest);

        // Assert
        logger.info("Weryfikacja odpowiedzi");
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Nieprawidłowy email lub hasło", response.getBody());

        logger.info("Test zakończony pomyślnie");
    }

    @Test
    @DisplayName("Gdy hasło jest nieprawidłowe, powinien zwrócić status 401")
    void whenPasswordInvalid_shouldReturnUnauthorized() {
        // Arrange
        logger.info("Przygotowanie danych testowych dla nieprawidłowego hasła");
        User loginRequest = new User();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPasswordHash("wrongPassword");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongPassword", "encodedPassword")).thenReturn(false);

        // Act
        logger.info("Wywołanie metody login z nieprawidłowym hasłem");
        ResponseEntity<?> response = authController.login(loginRequest);

        // Assert
        logger.info("Weryfikacja odpowiedzi");
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Nieprawidłowy email lub hasło", response.getBody());

        logger.info("Test zakończony pomyślnie");
    }
}