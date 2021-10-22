import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LocalContext } from "../../providers/LocalContext";

import "./Navbar.scss";

const Navbar = () => {
  const { loggedIn, handleLogin } = useContext(LocalContext);

  return (
    <div className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      {loggedIn && (
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      )}
      <button
        className="action-button"
        onClick={handleLogin}
        disabled={loggedIn}
      >
        {loggedIn ? "Welcome Test User" : "Log in"}
      </button>
    </div>
  );
};

export default Navbar;
