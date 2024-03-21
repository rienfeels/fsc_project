import { useEffect, useState } from "react";
import { register } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import "./Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setPassword2("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await register(username, password, password2);
    if (error) {
      alert(JSON.stringify(error));
    } else {
      navigate("/");
      resetForm();
    }
  };

  return (
    <div className="card">
      <div className="card2">
        <form className="form" onSubmit={handleSubmit}>
          <p id="heading">Register</p>
          {/* <hr /> */}
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <p>{password2 !== password ? "Passwords do not match" : ""}</p>
          </div>
          <button type="submit" className="button1">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
