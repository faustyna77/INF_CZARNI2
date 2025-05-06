import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import receptionistService from '../../services/receptionistService';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await receptionistService.getAllOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (orderId) => {
    navigate(`/admin-panel/edit-order/${orderId}`);
  };

  const handleDelete = async (orderId) => {
    try {
      await receptionistService.deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Orders List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{`${order.client.firstName} ${order.client.lastName}`}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleEdit(order.id)}>Edit</button>
                <button onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;