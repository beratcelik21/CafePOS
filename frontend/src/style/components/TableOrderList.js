import React, { useState, useEffect } from "react";
import axios from "axios";

const TableOrderList = ({ tableId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (tableId) {
      fetchOrders(tableId);
    }
  }, [tableId]);
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders/table/${tableId}");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axios.put("api/orders/$orderId", { status });
      // Sipariş güncellendikten sonra listeyi yeniden yükleyin
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="table-order*list">
      <h2>Masa {tableId} Siparis Listesi </h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>
              {order.product.name} - Miktar: {order.quantity} - Durum:{" "}
              {order.status}
            </p>
            <button
              onClick={() => handleUpdateOrderStatus(order.id, "complated")}
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
