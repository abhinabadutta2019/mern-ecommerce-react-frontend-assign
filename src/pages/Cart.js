// components/Cart.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
  const [cartData, setCartData] = useState({
    cart: { products: [] },
    totalValue: 0,
  });
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

      setCartData(data);
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

      // Display a success alert
      alert("Item removed from the cart successfully!");
    } catch (error) {
      console.error("Error removing item from cart:", error);

      // Display an error alert
      alert("Failed to remove item from the cart. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCart();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartData.cart.products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <p>Total Value: ${cartData.totalValue}</p>
          {/*  */}
          <ul>
            {cartData.cart.products.map((item) => (
              <li key={item.productId._id}>
                <h3>{item.productId.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.productId.price}</p>
                <p>Total: ${item.productId.price * item.quantity}</p>
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
        </div>
      )}
    </div>
  );
};

export default Cart;
