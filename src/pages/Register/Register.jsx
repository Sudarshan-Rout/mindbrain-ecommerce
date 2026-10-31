import "./Register.css";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [form,setForm] = useState({
    name: "",
    email: "",
    password: "",
    conformpassword: ""
  });
  
const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.conformpassword)
      return alert("Passwords do not match");

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert(data.message);

      setForm({
        name: "",
        email: "",
        password: "",
        conformpassword: "",
      });

      navigate("/");
    } catch {
      alert("Server Error");
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

      <div className="register-card">

        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={form.conformpassword}
            onChange={(e) => setForm({...form, conformpassword: e.target.value})}
          />

          <button type="submit">
            Create Account
          </button>

          <div className="divider">
            or continue with
          </div>

          <div className="social-login">

            <button className="social" type="button">
              <FcGoogle size={24} />
            </button>

            <button className="social" type="button">
              <FaGithub size={24} color="black" />
            </button>

            <button className="social" type="button">
              <FaFacebookF size={24} color="#1877F2" />
            </button>

          </div>

          <p className="login">
            Already have an account?
            <Link to="/"> Login</Link>
          </p>

        </form>

        <p className="copyright">
          © 2026 Designed & Developed by <strong>Sudarshan Rout</strong>
        </p>

      </div>

    </div>
  );
}

export default Register;