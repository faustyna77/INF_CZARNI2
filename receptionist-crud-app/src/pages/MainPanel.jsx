import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '../services/receptionistService';
import OrderList from '../components/OrderList';

const MainPanel = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <div>
      <h1>Main Panel</h1>
      <OrderList orders={orders} onDeleteOrder={handleDeleteOrder} />
    </div>
  );
};

export default MainPanel;