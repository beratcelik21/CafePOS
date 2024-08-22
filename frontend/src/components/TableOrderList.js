import React, { useState, useEffect } from "react";
import axios from "axios";

const TableOrderList = ({ tableId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (tableId) {
      fetchOrders(tableId);
    }
  }, [tableId]);

  const fetchOrders = async (tableId) => {  // tableId parametresi eklendi
    try {
      const response = await axios.get(`/api/orders/table/${tableId}`);  // Template literal kullanımı düzeltildi
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status });  // Template literal kullanımı düzeltildi
      fetchOrders(tableId);  // Sipariş güncellendikten sonra listeyi yeniden yükle
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="table-order-list">  {/* Class name düzeltildi */}
      <h2>Masa {tableId} Sipariş Listesi</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>
              {order.product.name} - Miktar: {order.quantity} - Durum:{" "}
              {order.status}
            </p>
            <button
              onClick={() => handleUpdateOrderStatus(order.id, "completed")}  // "completed" düzeltildi
            >
              Tamamla
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOrderList;
