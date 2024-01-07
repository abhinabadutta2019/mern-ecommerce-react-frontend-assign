import React, { useState } from "react";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // // Use fetch or axios to send the form data to your backend
    // // For simplicity, we are logging the form data for now
    // console.log({
    //   username,
    //   password,
    //   email,
    //   action: isLogin ? "Login" : "Register",
    // });
    //
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
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
        // Login or register successful, save the token to localStorage
        localStorage.setItem("token", data.token);
        console.log("Token saved to localStorage:", data.token);
      } else {
        // Handle error
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
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

      <p onClick={handleToggleForm}>
        {isLogin
          ? "Don't have an account? Register here."
          : "Already have an account? Login here."}
      </p>
    </div>
  );
};

export default Auth;
