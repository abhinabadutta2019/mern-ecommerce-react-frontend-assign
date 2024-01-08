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
      setCart(data.products);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/cart/remove-from-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      // Refresh the cart after removing the item
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
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
              <button onClick={() => removeFromCart(item.productId._id)}>
                Remove from Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
