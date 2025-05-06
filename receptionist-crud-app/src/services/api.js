const API_URL = 'http://localhost:8080'; // Replace with your actual API URL

export const fetchOrders = async () => {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return await response.json();
};

export const createOrder = async (orderData) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return await response.json();
};

export const updateOrder = async (id, orderData) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Failed to update order');
    }
    return await response.json();
};

export const deleteOrder = async (id) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete order');
    }
};