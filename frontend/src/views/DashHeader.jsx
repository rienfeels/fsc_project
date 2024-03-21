import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="header-buttons">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/daily-report-form">
            <button>Daily Report</button>
          </Link>
          <Link to="/logout">
            <button>Logout</button>
          </Link>
          <div>
            <img src="/Images/logo3.png" alt="logo" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
