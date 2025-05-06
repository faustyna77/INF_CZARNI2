import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/receptionistService';
import OrderList from '../components/OrderList';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <OrderList orders={orders} />
    </div>
  );
};

export default Dashboard;