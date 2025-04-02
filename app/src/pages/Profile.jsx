const Profile = () => {
  const username = "admin"; // Możesz też pobrać z propsów lub contextu

  const styles = {
    container: {
      backgroundColor: "#121212",
      color: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      backgroundColor: "#1e1e1e",
      border: "1px solid #333",
      borderRadius: "16px",
      padding: "32px",
      maxWidth: "400px",
      width: "100%",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      marginBottom: "16px",
    },
    subtitle: {
      color: "#ccc",
      marginBottom: "24px",
    },
    info: {
      borderTop: "1px solid #444",
      paddingTop: "16px",
      color: "#aaa",
      fontSize: "14px",
    },
    highlight: {
      color: "#fff",
      fontWeight: "bold",
    },
    status: {
      color: "#4caf50",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Witaj, {username}!</h1>
        <p style={styles.subtitle}>To jest Twoja strona profilu użytkownika.</p>

        <div style={styles.info}>
          <p>
            Rola: <span style={styles.highlight}>Administrator</span>
          </p>
          <p>
            Status: <span style={styles.status}>Aktywny</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
