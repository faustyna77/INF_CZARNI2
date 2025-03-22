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
/*
import { Link } from "react-router-dom";


const App = () => {
  const [token, setToken] = useState(null);

  // Sprawdzanie tokena przy załadowaniu aplikacji
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token"); // Usuwamy token
    setToken(null); // Resetujemy stan
  };

  return (
    <>
    <Log setToken={setToken} />
   
    
    <div style={styles.container}>
      <header style={styles.header}>

        <h1>Zakład Pogrzebowy "Wieczny Spokój"</h1>
        <p>Godne pożegnanie, profesjonalna obsługa, wsparcie w trudnych chwilach.</p>
      </header>
      <nav style={styles.nav}>
        <ul>
          
          <li><Link to="/log">Logowanie</Link></li>
          <li><Link to="/admin">Panel administratora</Link></li>
          <li><Link to="/o-nas">O Nas</Link></li>
          <button onClick={handleLogout}>Wyloguj</button>
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
        <p>&copy; 2025 Zakład Pogrzebowy "Wieczny Spokój". Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
    </>
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

*/

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <Link style={styles.link} to="/">🏠 Home</Link>
        {token && <Link style={styles.link} to="/profile">👤 Profile</Link>}
        {token && <Link style={styles.link} to="/admin">⚙️ Admin Panel</Link>}
        {!token && <Link style={styles.link} to="/log">🔐 Logowanie</Link>}
        {token && (
          <button style={styles.button} onClick={handleLogout}>🚪 Wyloguj</button>
        )}
      </nav>

      <main style={styles.main}>
        <h1 style={styles.heading}>Aplikacja zakładu pogrzebowego — Wieczny Spokój</h1>
        {token ? (
          <p style={styles.text}>Zalogowano ✅</p>
        ) : (
          <p style={styles.text}>
            Nie jesteś zalogowany. Przejdź do{" "}
            <Link to="/log" style={styles.linkInline}>logowania</Link>.
          </p>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#121212",
    color: "#f0f0f0",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  nav: {
    display: "flex",
    gap: "15px",
    padding: "20px",
    backgroundColor: "#1e1e1e",
    borderBottom: "1px solid #333",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "#bb86fc",
    textDecoration: "none",
    fontWeight: "bold",
  },
  linkInline: {
    color: "#03dac6",
    textDecoration: "underline",
  },
  button: {
    backgroundColor: "#cf6679",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  main: {
    padding: "50px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1.2rem",
    color: "#aaa",
  },
};

export default App;
