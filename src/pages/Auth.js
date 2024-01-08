import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";

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
        alert(`Authentication successful!`);
        login(data.token);
      } else {
        alert(`Authentication failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An unexpected error occurred during authentication.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "505px" }}>
        <h2 style={{ textAlign: "center" }}>
          {isLogin ? "Login" : "Register"}
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {!isLogin && (
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            {isLogin ? "Login" : "Register"}
          </Button>
        </Form>

        <Button
          variant="secondary"
          onClick={handleToggleForm}
          style={{ marginTop: "10px", width: "100%" }}
        >
          {isLogin
            ? "Don't have an account? Register here."
            : "Already have an account? Login here."}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
