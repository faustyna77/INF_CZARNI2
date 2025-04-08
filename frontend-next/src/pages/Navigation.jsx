import { Link } from "react-router-dom";

const Navigation = ({ token, handleLogout }) => {
  return (
    <nav style={styles.nav}>
      <Link style={styles.link} to="/">🏠 Home</Link>
      {token && <Link style={styles.link} to="/profile">👤 Profile</Link>}
      {token && <Link style={styles.link} to="/admin">⚙️ Admin Panel</Link>}
      {token && <Link style={styles.link} to="/raports">📊 Raporty</Link>}
      {token && <Link style={styles.link} to="/recepcionist">📊 Recepcja</Link>}
      {token && <Link style={styles.link} to="/tasks">📋 Zadania</Link>}
      
      {!token && <Link style={styles.link} to="/log">🔐 Logowanie</Link>}
      {token && (
        <button style={styles.button} onClick={handleLogout}>🚪 Wyloguj</button>
      )}
    </nav>
  );
};

const styles = {
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
  button: {
    backgroundColor: "#cf6679",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navigation;
