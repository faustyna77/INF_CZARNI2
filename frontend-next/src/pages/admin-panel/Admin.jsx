import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        role: 'USER' 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/users');
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({ 
            firstName: user.firstName || '', 
            lastName: user.lastName || '',
            email: user.email || '', 
            role: user.role || 'USER' 
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${editingUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to update user');
            const updatedUser = await response.json();
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setEditingUser(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteUser = async () => {
        const confirm = window.confirm('Czy na pewno chcesz usunąć tego użytkownika?');
        if (!confirm) return;
        try {
            const response = await fetch(`http://localhost:8080/users/${editingUser.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            if (!response.ok) throw new Error('Failed to delete user');
            setUsers(users.filter(user => user.id !== editingUser.id));
            setEditingUser(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setFormData({ firstName: '', lastName: '', email: '', role: 'USER' });
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Panel Admina</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Imię</th>
                        <th style={styles.th}>Nazwisko</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Rola</th>
                        <th style={styles.th}>Akcja</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={styles.tr}>
                            <td style={styles.td}>{user.id}</td>
                            <td style={styles.td}>{user.firstName}</td>
                            <td style={styles.td}>{user.lastName}</td>
                            <td style={styles.td}>{user.email}</td>
                            <td style={styles.td}>{user.role}</td>
                            <td style={styles.td}>
                                <button style={styles.button} onClick={() => handleEditClick(user)}>
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
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Imię"
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Nazwisko"
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
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
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
        backgroundColor: '#2a2828',
        color: 'white',
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
        backgroundColor: '#444',
        color: 'white'
    },
    loading: {
        color: 'white',
        textAlign: 'center',
        padding: '20px'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        padding: '20px'
    },
};

export default Admin;
