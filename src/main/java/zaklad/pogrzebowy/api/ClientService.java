package zaklad.pogrzebowy.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService implements IClientService {

    @Autowired
    private ClientRepository repository;

    @Override
    public List<Client> findAll() {
        return repository.findAllByOrderByIdAsc();
    }

    @Override
    public Client create(Client client) {
        return repository.save(client);
    }

    @Override
    public Client update(Long id, Client updatedClient) {
        return repository.findById(id)
                .map(existingClient -> {
                    existingClient.setFirstName(updatedClient.getFirstName());
                    existingClient.setLastName(updatedClient.getLastName());
                    existingClient.setPhone(updatedClient.getPhone());
                    return repository.save(existingClient);
                })
                .orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
