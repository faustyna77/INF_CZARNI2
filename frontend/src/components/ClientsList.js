import React from 'react';
import useClientData from '../hooks/useClientData';
import ClientInfo from './ClientInfo'

export default function ClientsList() {
    const { data: clients, error, isLoading } = useClientData();

    if (isLoading) return <p>Loading clients...</p>;
    if (error) return <p>Error fetching clients.</p>;

    return (
        <div>
            <h2>Clients</h2>
            {clients.length === 0 ? <p>No clients found</p> : (
                <ul>
                    {clients.map(client => (
                        <li key={client.id}>
                            <ClientInfo client={client} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
