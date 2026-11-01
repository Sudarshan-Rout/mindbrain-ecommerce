import "./Hats.css";
import { useEffect, useState } from "react";
import hat1 from "../../assets/hat1.jpg";
import hat2 from "../../assets/hat2.jpg";
import hat3 from "../../assets/hat3.jpg";
import hat4 from "../../assets/hat4.jpg";
import hat5 from "../../assets/hat5.jpg";

const API_URL = "https://mindbrain-ecommerce.onrender.com";

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  const value = price.toString().replace(/[^0-9.]/g, "");
  return Number(value) || 0;
};

const fallbackHats = [
  { id: 1, image: hat1, name: "Classic Hat", price: "₹499" },
  { id: 2, image: hat2, name: "Stylish Cap", price: "₹799" },
  { id: 3, image: hat3, name: "Trendy Fedora", price: "₹699" },
  { id: 4, image: hat4, name: "Summer Bucket Hat", price: "₹399" },
  { id: 5, image: hat5, name: "Sporty Beanie", price: "₹299" },
];

function Hats() {
  const [hats, setHats] = useState(fallbackHats);
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
          category: "hats",
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
          category: "hats",
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
    event.target.src = hat1;
    setHats((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, image: hat1 } : item
      )
    );
  };

  useEffect(() => {
    const fetchHats = async () => {
      try {
        const res = await fetch("https://mindbrain-ecommerce.onrender.com/hats");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Unable to load hats");
        }

        if (Array.isArray(data.products) && data.products.length > 0) {
          setHats(
            data.products.map((product, index) => ({
              id: product._id || product.id || index,
              image:
                product.image && product.image.toString().trim().length > 0
                  ? product.image
                  : fallbackHats[index]?.image,
              name: product.name || fallbackHats[index]?.name || "Unknown Hat",
              price:
                typeof product.price === "number"
                  ? `₹${product.price}`
                  : product.price || fallbackHats[index]?.price || "₹0",
            }))
          );
        } else {
          setHats(fallbackHats);
        }
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHats();
  }, []);

  return (
    <div className="shoes-page">
      <h1>All Hats</h1>

      {message && <p className="message-text">{message}</p>}
      {loading ? (
        <p>Loading hats...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="shoe-grid">
          {hats.map((item) => (
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

export default Hats;