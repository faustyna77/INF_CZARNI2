import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Log = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈 dodane

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        passwordHash: password,
      });

      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      alert("Zalogowano pomyślnie!");
      navigate("/"); // 👈 przekierowanie po zalogowaniu
    } catch (error) {
      console.error("Błąd logowania:", error);
      alert("Nieprawidłowy login lub hasło!");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.heading}>Logowanie</h2>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>Zaloguj</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default Log;
