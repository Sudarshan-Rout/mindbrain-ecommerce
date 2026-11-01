import "./TShirt.css";
import { useEffect, useState } from "react";
import tshirt1 from "../../assets/tshirt1.jpg";
import tshirt2 from "../../assets/tshirt2.jpg";
import tshirt3 from "../../assets/tshirt3.jpg";
import tshirt4 from "../../assets/tshirt4.jpg";
import tshirt5 from "../../assets/tshirt5.jpg";

const API_URL = "https://mindbrain-ecommerce.onrender.com";

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  const value = price.toString().replace(/[^0-9.]/g, "");
  return Number(value) || 0;
};

const fallbackTShirts = [
  { id: 1, image: tshirt1, name: "Graphic Tee", price: "₹999" },
  { id: 2, image: tshirt2, name: "Plain Cotton Tee", price: "₹799" },
  { id: 3, image: tshirt3, name: "V-Neck Tee", price: "₹899" },
  { id: 4, image: tshirt4, name: "Ringer Tee", price: "₹849" },
  { id: 5, image: tshirt5, name: "Striped Tee", price: "₹949" },
];

function TShirt() {
  const [tShirts, setTShirts] = useState(fallbackTShirts);
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
          category: "tshirts",
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
          category: "tshirts",
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
    event.target.src = tshirt1;
    setTShirts((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, image: tshirt1 } : item
      )
    );
  };

  useEffect(() => {
    const fetchTShirts = async () => {
      try {
        const res = await fetch("https://mindbrain-ecommerce.onrender.com/tshirts");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Unable to load t-shirts");
        }

        if (Array.isArray(data.products) && data.products.length > 0) {
          setTShirts(
            data.products.map((product, index) => ({
              id: product._id || product.id || index,
              image:
                product.image && product.image.toString().trim().length > 0
                  ? product.image
                  : fallbackTShirts[index]?.image,
              name: product.name || fallbackTShirts[index]?.name || "Unknown T-Shirt",
              price:
                typeof product.price === "number"
                  ? `₹${product.price}`
                  : product.price || fallbackTShirts[index]?.price || "₹0",
            }))
          );
        } else {
          setTShirts(fallbackTShirts);
        }
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTShirts();
  }, []);

  return (
    <div className="shoes-page">
      <h1>All T-Shirts</h1>

      {message && <p className="message-text">{message}</p>}
      {loading ? (
        <p>Loading t-shirts...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="shoe-grid">
          {tShirts.map((item) => (
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

export default TShirt;