package zaklad.pogrzebowy.api;




import java.util.List;

public interface IClientService {

    List<Client> findAll(); // Pobiera wszystkich klientów
    Client create(Client client); // Tworzy nowego klienta
    Client update(Long id, Client client); // Aktualizuje dane klienta
    void delete(Long id); // Usuwa klienta
}
