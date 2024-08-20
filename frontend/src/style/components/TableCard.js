import React from "react";

const TableCard = ({ table, onClick }) => {
  return (
    <div className="table-card" onClick={() => onClick(table.id)}>
      <h3>{table.name} </h3>
      <p>Durum: {table.status} </p>
    </div>
  );
};

export default TableCard;
