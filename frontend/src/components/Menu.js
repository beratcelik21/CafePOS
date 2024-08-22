import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "./MenuCard"; // Her menü öğesini göstermek için bir bileşen

const Menu = () => {
  const [menus, setMenus] = useState([]); // Menüleri tutmak için state

  useEffect(() => {
    fetchMenus(); // Bileşen yüklendiğinde menüleri çek
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get("/api/menu"); // Menüleri getiren API çağrısı
      setMenus(response.data); // Menüleri state'e kaydet
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };
  // Siparişe menü öğesi ekleyen fonksiyon
  const handleAddToOrder = (product) => {
    // Burada siparişe ürün ekleme işlemi yapılabilir
    console.log("Siparise eklenen urun:", product);
  };

  return (
    <div className="menu">
      <h1>Menu</h1>
      <div className="menu-items">
        {menus.map((menu) => (
          <div key={menu.id}>
            <h2>{menu.name}</h2>
            <p> {menu.description} </p>
            <div className="products">
              {menu.products.map((product) => (
                <MenuCard
                  key={product.id}
                  item={product}
                  onaddToOrder={handleAddToOrder}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
