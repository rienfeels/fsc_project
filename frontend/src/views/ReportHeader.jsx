import React from "react";
import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <header>
      <nav>
        <div className="header-btn-container">
          <Link to="/logout">
            <button className="header-btn">Logout</button>
          </Link>
          <Link to="/">
            <button className="header-btn">Home</button>
          </Link>
          <Link to="/dashboard">
            <button className="header-btn">Dashboard</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Headers;
