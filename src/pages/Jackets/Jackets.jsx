import "./Jackets.css";
import { useEffect, useState } from "react";
import jacket1 from "../../assets/jacket1.avif";
import jacket2 from "../../assets/jacket2.avif";
import jacket3 from "../../assets/jacket3.avif";
import jacket4 from "../../assets/jacket4.avif";
import jacket5 from "../../assets/jacket5.avif";

const API_URL = "http://localhost:8000";

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  const value = price.toString().replace(/[^0-9.]/g, "");
  return Number(value) || 0;
};

const fallbackJackets = [
  { id: 1, image: jacket1, name: "Light Jacket", price: "₹1999" },
  { id: 2, image: jacket2, name: "Denim Jacket", price: "₹2499" },
  { id: 3, image: jacket3, name: "Bomber Jacket", price: "₹2999" },
  { id: 4, image: jacket4, name: "Puffer Jacket", price: "₹3499" },
  { id: 5, image: jacket5, name: "Leather Jacket", price: "₹3999" },
];

function Jackets() {
  const [jackets, setJackets] = useState(fallbackJackets);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const addToCart = async (item) => {
    const stored = localStorage.getItem("user");
    if (!stored) return setMessage("Please login to add to cart.");
    const user = JSON.parse(stored);

    try {
      const res = await fetch(`${API_URL}/users/${user._id}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.id,
          name: item.name,
          image: item.image,
          price: parsePrice(item.price),
          quantity: 1,
          category: "jackets",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to add to cart.");
      setMessage("Added to cart.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const addToWishlist = async (item) => {
    const stored = localStorage.getItem("user");
    if (!stored) return setMessage("Please login to add to wishlist.");
    const user = JSON.parse(stored);

    try {
      const res = await fetch(`${API_URL}/users/${user._id}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.id,
          name: item.name,
          image: item.image,
          price: parsePrice(item.price),
          category: "jackets",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to add to wishlist.");
      setMessage("Added to wishlist.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleImageError = (itemId, event) => {
    event.target.onerror = null;
    event.target.src = jacket1;
    setJackets((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, image: jacket1 } : item
      )
    );
  };

  useEffect(() => {
    const fetchJackets = async () => {
      try {
        const res = await fetch("http://localhost:8000/jackets");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Unable to load jackets");
        }

        if (Array.isArray(data.products) && data.products.length > 0) {
          setJackets(
            data.products.map((product, index) => ({
              id: product._id || product.id || index,
              image:
                product.image && product.image.toString().trim().length > 0
                  ? product.image
                  : fallbackJackets[index]?.image,
              name: product.name || fallbackJackets[index]?.name || "Unknown Jacket",
              price:
                typeof product.price === "number"
                  ? `₹${product.price}`
                  : product.price || fallbackJackets[index]?.price || "₹0",
            }))
          );
        } else {
          setJackets(fallbackJackets);
        }
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJackets();
  }, []);

  return (
    <div className="shoes-page">
      <h1>All Jackets</h1>

      {message && <p className="message-text">{message}</p>}
      {loading ? (
        <p>Loading jackets...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="shoe-grid">
          {jackets.map((item) => (
            <div className="shoe-card" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                onError={(event) => handleImageError(item.id, event)}
              />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <div className="product-actions">
                <button onClick={() => addToCart(item)}>Add to Cart</button>
                <button onClick={() => addToWishlist(item)}>Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jackets;