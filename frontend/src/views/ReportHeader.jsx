import React from "react";
import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <header>
      <nav>
        <div className="header-buttons">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
          <Link to="/logout">
            <button>Logout</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Headers;
