// components/Cart.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { apiUrl } = useContext(AuthContext);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/cart/get-cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();
      console.log(data, "data");
      setCart(data.products);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCart();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productId._id}>
              <h3>{item.productId.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <img
                src={item.productId.imagePath}
                alt={item.productId.name}
                style={{ width: "200px", height: "200px" }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
