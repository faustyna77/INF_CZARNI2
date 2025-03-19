import { useEffect, useState } from "react";
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
