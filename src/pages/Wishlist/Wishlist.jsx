import "./Wishlist.css";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadWishlist = async () => {
      const stored = localStorage.getItem("user");

      if (!stored) {
        setMessage("Please login to view your wishlist.");
        return;
      }

      const user = JSON.parse(stored);

      try {
        const res = await fetch(
          `${API_URL}/users/${user._id}/wishlist`
        );

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || "Unable to load wishlist.");
          return;
        }

        setWishlist(data.wishlist || []);
      } catch (error) {
        setMessage("Unable to load wishlist.");
      }
    };

    loadWishlist();
  }, []);

  const handleRemove = async (itemId) => {
    const stored = localStorage.getItem("user");

    if (!stored) return;

    const user = JSON.parse(stored);

    try {
      const res = await fetch(
        `${API_URL}/users/${user._id}/wishlist/${itemId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Unable to remove item.");
        return;
      }

      setWishlist(data.wishlist || []);
    } catch (error) {
      setMessage("Unable to remove item.");
    }
  };

  return (
    <div className="wishlist-container">
      <h1>❤️ My Wishlist</h1>

      {message && <p className="wishlist-message">{message}</p>}

      {wishlist.length === 0 ? (
        <div className="empty-card">
          <h2>No Items Yet</h2>
          <p>You haven't added any products to your wishlist.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item._id}>
              <div className="wishlist-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div className="wishlist-content">
                <h2>{item.name}</h2>

                <h3>
                  {item.price
                    ? `₹${item.price}`
                    : "Price not available"}
                </h3>

                <button
                  className="remove-btn"
                  onClick={() =>
                    handleRemove(item._id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;