// src/App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div>
        {/* <Link to={user ? "/" : "/auth"}>
          <h1>QuikCart</h1>
        </Link> */}
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/" replace />}
          />
          <Route path="/cart" element={user ? <Cart /> : <Auth />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
