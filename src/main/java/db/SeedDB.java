package db;




import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import zaklad.pogrzebowy.api.models.Client;
import zaklad.pogrzebowy.api.services.ClientService;

import java.util.List;

@SpringBootApplication(scanBasePackages = {"com.funeralhome.api", "com.funeralhome.db"})
public class SeedDB {

    @Autowired
    private ClientService clientService;

    public static void main(String[] args) {
        SpringApplication.run(SeedDB.class, args);
    }

    @Bean
    InitializingBean seed() {
        return () -> {
            List<Client> existingClients = clientService.findAll();

            // Jeśli baza nie jest pusta, nie dodawaj ponownie
            if (!existingClients.isEmpty()) {
                return;
            }

            // Przykładowi klienci
            List<Client> clients = List.of(
                    new Client("Jan", "Kowalski", "123456789"),
                    new Client("Anna", "Nowak", "987654321"),
                    new Client("Piotr", "Wiśniewski", "555666777"),
                    new Client("Marta", "Lis", "111222333"),
                    new Client("Tomasz", "Zieliński", "444555666")
            );

            clients.forEach(clientService::create);
        };
    }
}
