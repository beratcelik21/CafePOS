import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TablePage from "./pages/TablePage";
import MenuPage from "./pages/MenuPage";
import TableDetailPage from "./pages/TableDetailPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TablePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/table/:id" element={<TableDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
