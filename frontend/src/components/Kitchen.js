import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);

  useEffect(() => {
    if (selectedTableId) {
      fetchOrdersByTable(selectedTableId);
    }
  }, [selectedTableId]);

  // Belirli bir masa için siparişleri çeken fonksiyon
  const fetchOrdersByTable = async (tableId) => {
    try {
      const response = await axios.get(`/api/orders/table/${tableId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Sipariş durumunu güncelleyen fonksiyon
  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}`, { status });
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: response.data.status } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="kitchen">
      <h1>Mutfak Paneli</h1>
      <div>
        <label>Masa Seç: </label>
        <input
          type="text"
          value={selectedTableId || ''}
          onChange={e => setSelectedTableId(e.target.value)}
          placeholder="Masa ID girin"
        />
      </div>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>{`Ürün: ${order.product.name}, Miktar: ${order.quantity}, Durum: ${order.status}`}</p>
            <button onClick={() => handleUpdateOrderStatus(order.id, 'Hazır')}>Hazır Olarak İşaretle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Kitchen;
