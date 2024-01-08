import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const { login, apiUrl } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authEndpoint = isLogin ? "login" : "register";
      const url = `${apiUrl}/api/users/${authEndpoint}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Display an alert on successful authentication
        alert(`Authentication successful!`);

        login(data.token);
      } else {
        // Display an alert on authentication error
        alert(`Authentication failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      // Display an alert on unexpected error
      alert("An unexpected error occurred during authentication.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {!isLogin && (
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        )}

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <button
        // className="auth-button" // Apply the class for styling
        type="button" // Specify the button type
        onClick={handleToggleForm}
      >
        {isLogin
          ? "Don't have an account? Register here."
          : "Already have an account? Login here."}
      </button>
    </div>
  );
};

export default Auth;
