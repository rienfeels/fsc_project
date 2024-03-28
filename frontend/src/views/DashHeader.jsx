import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Link to="/daily-report-form">
            <button className="header-btn">Daily Report</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
