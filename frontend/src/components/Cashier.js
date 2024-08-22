import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cashier = () => {
  const [payments, setPayments] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [newPayment, setNewPayment] = useState({
    orderId: '',
    tableId: '',
    amount: '',
    method: 'Cash'  // Varsayılan ödeme yöntemi
  });

  // Tüm ödemeleri veya belirli bir masa için ödemeleri çekmek
  useEffect(() => {
    if (selectedTableId) {
      fetchPaymentsByTable(selectedTableId);
    } else {
      fetchAllPayments();
    }
  }, [selectedTableId]);

  // Belirli bir masa için ödemeleri çekme
  const fetchPaymentsByTable = async (tableId) => {
    try {
      const response = await axios.get(`/api/payments/table/${tableId}`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  // Tüm ödemeleri çekme
  const fetchAllPayments = async () => {
    try {
      const response = await axios.get('/api/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  // Yeni ödeme oluşturma
  const handleCreatePayment = async () => {
    try {
      const response = await axios.post('/api/payments', newPayment);
      setPayments([...payments, response.data]);
      setNewPayment({ orderId: '', tableId: '', amount: '', method: 'Cash' });
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  // Ödeme durumunu güncelleme
  const handleUpdatePaymentStatus = async (paymentId, status) => {
    try {
      const response = await axios.put(`/api/payments/${paymentId}/status`, { status });
      const updatedPayments = payments.map(payment => 
        payment.id === paymentId ? { ...payment, status: response.data.status } : payment
      );
      setPayments(updatedPayments);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div className="cashier">
      <h1>Kasiyer Paneli</h1>
      <div>
        <label>Masa ID: </label>
        <input type="text" value={newPayment.tableId} onChange={e => setNewPayment({...newPayment, tableId: e.target.value})} />
        <label>Tutar: </label>
        <input type="number" value={newPayment.amount} onChange={e => setNewPayment({...newPayment, amount: e.target.value})} />
        <button onClick={handleCreatePayment}>Ödeme Ekle</button>
      </div>
      <div>
        <label>Masa Seç: </label>
        <input type="text" value={selectedTableId || ''} onChange={e => setSelectedTableId(e.target.value)} />
      </div>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            {`Sipariş ID: ${payment.orderId}, Masa: ${payment.tableId}, Tutar: ${payment.amount}, Durum: ${payment.status}`}
            <button onClick={() => handleUpdatePaymentStatus(payment.id, 'Completed')}>Tamamlandı Olarak İşaretle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cashier;
