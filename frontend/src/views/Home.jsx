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
    <div>
      <Link to="/daily-report-form">
        <button>Daily Report</button>
      </Link>
      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
      <Link to="/logout">
        <button>Logout</button>
      </Link>
      {/* <h1>Fields Specialty Contractors Inc.</h1> */}
      <div className="logo">
        <img src="/Images/logo3.png" />
      </div>
      <h1>Welcome {user.username}</h1>
    </div>
  );
};

export const LoggedOutView = ({ title = "Home" }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h1>Fields Specialty Contractors Inc.</h1>
      <div className="logo">
        <img src="/public/Images/logo2.png" />
      </div>
      <Link to="/login">
        <button type="button" className="button">
          <div className="button-top">Login</div>
          <div className="button-bottom"></div>
          <div className="button-base"></div>
        </button>
      </Link>
      <Link to="/register">
        <button type="button" className="button">
          <div className="button-top">Register</div>
          <div className="button-bottom"></div>
          <div className="button-base"></div>
        </button>
      </Link>
    </div>
  );
};

export default Home;
