import React from "react";

const MenuCard = ({ item, onAddToOrder }) => {
  return (
    <div className="menu-card">
      <h3>{item.name} </h3>
      <p>{item.description} </p>
      <p>Fiyat: {item.price} TL</p>
      <button onClick={() => onAddToOrder(item)}>Siparise Ekle</button>
    </div>
  );
};

export default MenuCard;
