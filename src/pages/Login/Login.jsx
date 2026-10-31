import "./Login.css";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert(data.message);

      // persist logged-in user for other pages (Profile, Dashboard)
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setForm({
        email: "",
        password: ""
      });

      navigate("/dashboard");
    } catch {
      // alert("Server Error");
    }
  };
  return (
    <div className="container">
      <div className="background-shapes">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="wave w1"></div>
        <div className="wave w2"></div>
      </div>

      <div className="login-card">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <label>Email</label>
          <input
            type="email"
            placeholder="username@gmail.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <p className="forgot">Forgot Password?</p>

          <button type="submit" className="login-btn">
            Sign In
          </button>

          <div className="divider">
            or continue with
          </div>

          <div className="social-login">

            <button className="social" type="button">
              <FaGithub size={24} />
            </button>

            <button className="social" type="button">
              <FaFacebookF size={24} color="#1877F2" />
            </button>

            <button className="social" type="button">
              <SiGmail size={24} color="#EA4335" />
            </button>

          </div>

          <p className="register">
            Don't have an account?
            <Link to="/register"> Register for free</Link>
          </p>

        </form>

        <p className="copyright">
          © 2026 Designed & Developed by <strong>Sudarshan Rout</strong>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;