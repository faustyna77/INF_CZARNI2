const API_URL = 'http://localhost:8080/orders'; // Adjust the URL as needed

export const getOrders = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return await response.json();
};

export const createOrder = async (order) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return await response.json();
};

export const updateOrder = async (id, order) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error('Failed to update order');
    }
    return await response.json();
};

export const deleteOrder = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete order');
    }
};