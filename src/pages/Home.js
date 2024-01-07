import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
      console.log(data.message); // You can handle the success message as needed

      // Optionally, you can update the product list after adding to the cart
      // For simplicity, you can refetch the entire product list
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error adding to cart:", error);
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
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img
              src={product.imagePath}
              alt={product.name}
              style={{ width: "200px", height: "200px" }}
            />
            <button onClick={() => handleAddToCart(product._id)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
