import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "../../assets/Profile.jpg";

const API_URL = "http://localhost:8000";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    conformpassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
        setForm((prev) => ({
          ...prev,
          name: parsedUser?.name || "",
          email: parsedUser?.email || "",
        }));
      } catch {
        setUser(null);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleGetProfile = async () => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      setMessage("Please log in first");
      return;
    }

    try {
      const parsedUser = JSON.parse(stored);
      const res = await fetch(`${API_URL}/users/${parsedUser._id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

      setUser(data.user);
      setForm({
        name: data.user.name || "",
        email: data.user.email || "",
        password: "",
        conformpassword: "",
      });
      setMessage(data.message || "Profile loaded");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (form.password !== form.conformpassword) {
        setMessage("Passwords do not match");
        return;
      }

      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create profile");

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setForm({
        name: data.user.name || "",
        email: data.user.email || "",
        password: "",
        conformpassword: "",
      });
      setMessage(data.message || "Profile created");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const stored = localStorage.getItem("user");
      if (!stored) {
        setMessage("Please log in first");
        return;
      }

      const parsedUser = JSON.parse(stored);
      const payload = {
        name: form.name,
        email: form.email,
      };

      if (form.password || form.conformpassword) {
        if (form.password !== form.conformpassword) {
          setMessage("Passwords do not match");
          return;
        }
        payload.password = form.password;
        payload.conformpassword = form.conformpassword;
      }

      const res = await fetch(`${API_URL}/users/${parsedUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setForm({
        name: data.user.name || "",
        email: data.user.email || "",
        password: "",
        conformpassword: "",
      });
      setMessage(data.message || "Profile updated");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      setMessage("Please log in first");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this profile?")) {
      return;
    }

    try {
      const parsedUser = JSON.parse(stored);
      const res = await fetch(`${API_URL}/users/${parsedUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to delete profile");

      localStorage.removeItem("user");
      setUser(null);
      setForm({ name: "", email: "", password: "", conformpassword: "" });
      setMessage(data.message || "Profile deleted");
      navigate("/login");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={Profile} alt="Profile" />
        </div>

        <h2>{user?.name || "User"}</h2>
        <p>
          <strong>Email:</strong> {user?.email || "-"}
        </p>

        {message ? <p className="profile-status">{message}</p> : null}

        <form className="profile-form" onSubmit={handleCreateProfile}>
          <input
            className="profile-input"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="profile-input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="profile-input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            className="profile-input"
            type="password"
            placeholder="Confirm Password"
            value={form.conformpassword}
            onChange={(e) => setForm({ ...form, conformpassword: e.target.value })}
          />

          <div className="profile-actions">
            <button type="button" className="profile-button secondary" onClick={handleGetProfile}>
              {loading ? "Loading..." : "Load Profile"}
            </button>
            <button type="submit" className="profile-button" disabled={loading}>
              {loading ? "Processing..." : "Create Profile"}
            </button>
          </div>

          <div className="profile-actions">
            <button type="button" className="profile-button" onClick={handleUpdateProfile}>
              Update Profile
            </button>
            <button type="button" className="profile-button danger" onClick={handleDeleteProfile}>
              Delete Profile
            </button>
          </div>
        </form>

        <button onClick={handleLogout} className="profile-logout">
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;