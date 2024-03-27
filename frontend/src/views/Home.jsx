import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import "./Home.css";

const Home = () => {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  return (
    <div>
      {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
    </div>
  );
};

const LoggedInView = ({ user }) => {
  return (
    <div className="home-div">
      <h1>Welcome {user.username}</h1>
      <div className="logo">
        <img src="/Images/logo4.png" className="logo-img" />
      </div>
      <div className="header-btn-container">
        <Link to="/daily-report-form">
          <button className="header-btn">Daily Report</button>
        </Link>
        <Link to="/dashboard">
          <button className="header-btn">Dashboard</button>
        </Link>
        <Link to="/logout">
          <button className="header-btn">Logout</button>
        </Link>
        {/* <h1>Fields Specialty Contractors Inc.</h1> */}
      </div>
    </div>
  );
};

export const LoggedOutView = ({ title = "Home" }) => {
  return (
    <div className="home-div">
      {/* <div className="header-btn-container"> */}
      <div className="logo2">
        <img src="/Images/truck.png" className="logo-img2" />
      </div>
      <h1>{title}</h1>
      <h1>Fields Specialty Contractors Inc.</h1>
      <div className="header-btn-container">
        <Link to="/login">
          <button type="button" className="header-btn">
            <div>Login</div>
          </button>
        </Link>
        <Link to="/register">
          <button type="button" className="header-btn">
            <div>Register</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
