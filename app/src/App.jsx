/*import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        console.log("useEffect is running..."); // TEST!
        axios.get("http://localhost:8080/clients")
            .then(response => {
                console.log("Clients data:", response.data); // Sprawdź w konsoli
                setClients(response.data);
            })
            .catch(error => console.error("Error fetching clients:", error));
    }, []);

    return (
        <div>
            <h1>Clients List</h1>
            {clients.length === 0 ? <p>No clients found</p> : (
                <ul>
                    {clients.map(client => (
                        <li key={client.id}>
                            {client.firstName} {client.lastName} - {client.phone}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


*/
import { Link } from "react-router-dom";


const App = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Zakład Pogrzebowy "Wieczny Spokój"</h1>
        <p>Godne pożegnanie, profesjonalna obsługa, wsparcie w trudnych chwilach.</p>
      </header>
      <nav style={styles.nav}>
        <ul>
          <li><Link to="/recepcionist">Dla recepcjonisty</Link></li>
          <li><Link to="/log">Logowanie</Link></li>
          <li><Link to="/admin">Panel administratora</Link></li>
          <li><Link to="/o-nas">O Nas</Link></li>
        </ul>
      </nav>
      <main style={styles.main}>
        <section>
          <h2>Profesjonalne Usługi Pogrzebowe</h2>
          <p>Oferujemy kompleksową organizację ceremonii pogrzebowych, transport, formalności urzędowe oraz opiekę nad grobami.</p>
        </section>
        <section>
          <h2>Kontakt</h2>
          <p>Jesteśmy dostępni 24/7, aby pomóc Państwu w tych trudnych chwilach.</p>
          <p><strong>Telefon:</strong> +48 123 456 789</p>
          <p><strong>Email:</strong> kontakt@wiecznyspokoj.pl</p>
        </section>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2024 Zakład Pogrzebowy "Wieczny Spokój". Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  header: {
    backgroundColor: "#222",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
  },
  nav: {
    margin: "20px 0",
  },
  main: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
  },
  footer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#222",
    color: "white",
    borderRadius: "8px",
  },
};

export default App;

