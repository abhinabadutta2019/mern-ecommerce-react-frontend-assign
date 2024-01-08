// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //
  const apiUrl = process.env.REACT_APP_API_URL;
  //
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const fetchUserLS = async () => {
      try {
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
          const user = JSON.parse(userJSON);
          setUser(user);
        }
      } catch (err) {
        console.error("Error fetching data in AuthContext:", err);
      }
    };

    fetchUserLS();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, apiUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
