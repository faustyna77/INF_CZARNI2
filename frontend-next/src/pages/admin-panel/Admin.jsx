import React, { useState } from 'react';
import UsersPanel from '../../components/admin/UsersPanel';
import OrdersPanel from '../../components/admin/OrdersPanel';

const Admin = () => {
    const [activePanel, setActivePanel] = useState('users');

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.headerTitle}>Panel Administratora</h1>
                <div style={styles.tabButtons}>
                    <button 
                        style={{
                            ...styles.tabButton,
                            ...(activePanel === 'users' ? styles.activeTab : {})
                        }}
                        onClick={() => setActivePanel('users')}
                    >
                        👥 Użytkownicy
                    </button>
                    <button 
                        style={{
                            ...styles.tabButton,
                            ...(activePanel === 'orders' ? styles.activeTab : {})
                        }}
                        onClick={() => setActivePanel('orders')}
                    >
                        📋 Zamówienia
                    </button>
                </div>
            </div>

            <div style={styles.contentContainer}>
                {activePanel === 'users' ? <UsersPanel /> : <OrdersPanel />}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#2a2828',
        minHeight: 'calc(100vh - 40px)',
        color: 'white'
    },
    header: {
        marginBottom: '32px'
    },
    headerTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '24px'
    },
    tabButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '24px'
    },
    tabButton: {
        padding: '12px 24px',
        backgroundColor: '#343434',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: '#4a4a4a'
        }
    },
    activeTab: {
        backgroundColor: '#9900ff',
        '&:hover': {
            backgroundColor: '#8400db'
        }
    },
    contentContainer: {
        backgroundColor: '#343434',
        borderRadius: '8px',
        padding: '24px'
    }
};

export default Admin;