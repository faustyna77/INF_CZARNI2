import React, { useState } from 'react';

const Admin = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', status: 'Aktywny', role: 'Admin' },
        { id: 2, name: 'Anna Nowak', email: 'anna@example.com', status: 'Nieaktywny', role: 'User' },
        { id: 3, name: 'Marek Zieliński', email: 'marek@example.com', status: 'Aktywny', role: 'User' },
        { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', status: 'Aktywny', role: 'Admin' },
        { id: 2, name: 'Anna Nowak', email: 'anna@example.com', status: 'Nieaktywny', role: 'User' },
        { id: 3, name: 'Marek Zieliński', email: 'marek@example.com', status: 'Aktywny', role: 'User' },
        { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', status: 'Aktywny', role: 'Admin' },
        { id: 2, name: 'Anna Nowak', email: 'anna@example.com', status: 'Nieaktywny', role: 'User' },
        { id: 3, name: 'Marek Zieliński', email: 'marek@example.com', status: 'Aktywny', role: 'User' },
    ]);

    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = () => {
        setUsers(users.map(user =>
            user.id === editingUser.id
                ? { ...user, name: formData.name, email: formData.email, role: formData.role }
                : user
        ));
        setEditingUser(null);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    const handleDeleteUser = () => {
        setUsers(users.filter(user => user.id !== editingUser.id));
        setEditingUser(null);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Panel Admina</h1>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Imię</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Rola</th>
                    <th style={styles.th}>Akcja</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id} style={styles.tr}>
                        <td style={styles.td}>{user.id}</td>
                        <td style={styles.td}>{user.name}</td>
                        <td style={styles.td}>{user.email}</td>
                        <td style={styles.td}>
                <span style={user.status === 'Aktywny' ? styles.activeStatus : styles.inactiveStatus}>
                  {user.status}
                </span>
                        </td>
                        <td style={styles.td}>{user.role}</td>
                        <td style={styles.td}>
                            <button
                                style={styles.button}
                                onClick={() => handleEditClick(user)}>
                                Edytuj dane
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingUser && (
                <div style={styles.editForm}>
                    <h2>Edytuj dane użytkownika</h2>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Imię"
                        style={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        style={styles.input}
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        style={styles.input}
                    >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    <div>
                        <button style={styles.button} onClick={handleSaveChanges}>Zapisz</button>
                        <button style={styles.button} onClick={handleCancelEdit}>Anuluj</button>
                        <button style={styles.deleteButton} onClick={handleDeleteUser}>Usuń użytkownika</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#2a2828',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: '0 auto',
        color: "white",
    },
    header: {
        textAlign: 'center',
        color: 'white',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        padding: '12px',
        textAlign: 'left',
        backgroundColor: '#2f0031',
        color: 'white',
        fontWeight: 'bold',
    },
    td: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    tr: {
        transition: 'background-color 0.3s',
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#9900ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        margin: '5px',
    },
    deleteButton: {
        padding: '8px 16px',
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        margin: '5px',
    },
    activeStatus: {
        color: 'green',
    },
    inactiveStatus: {
        color: 'red',
    },
    editForm: {
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '0 auto',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
};

export default Admin;
