import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Home = () => {
  const [products, setProducts] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  //
  console.log(products, "products");
  useEffect(() => {
    // Function to fetch products from the backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // You may need to include the authorization header if required
            //Authorization: localStorage.getItem("auth_token")
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Call the fetchProducts function
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
