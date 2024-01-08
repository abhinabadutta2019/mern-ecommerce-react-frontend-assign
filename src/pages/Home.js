import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../Styles/Home.css"; // Import the custom CSS file
const Home = () => {
  const [products, setProducts] = useState([]);
  const { apiUrl } = useContext(AuthContext);

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/cart/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to the cart");
      }

      const data = await response.json();

      // Display a success alert
      alert("Product added to the cart successfully!");

      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error adding to cart:", error);

      // Display an error alert
      alert("Failed to add product to the cart. Please try again.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
      return data; // Return the data for optional use
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="container mt-5 text-center">
      <h2>Product List</h2>
      <ul className="list-group list-group-custom">
        {products.map((product) => (
          <li key={product._id} className="list-group-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img
              src={product.imagePath}
              alt={product.name}
              className="img-fluid"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
            <br />
            <button
              onClick={() => handleAddToCart(product._id)}
              className="btn btn-primary mt-2"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
