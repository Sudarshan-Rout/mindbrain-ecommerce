import "./Shoes.css";
import { useEffect, useState } from "react";
import shoes1 from "../../assets/shoes1.jpg";
import shoes2 from "../../assets/shoes2.jpg";
import shoes3 from "../../assets/shoes3.jpg";
import shoes4 from "../../assets/shoes4.jpg";
import shoes5 from "../../assets/shoes5.jpg";

const API_URL = "http://localhost:8000";

const fallbackShoes = [
  { id: 1, image: shoes1, name: "BJD shoe", price: "₹4" },
  { id: 2, image: shoes2, name: "BJP shoe", price: "₹50" },
  { id: 3, image: shoes3, name: "TVK shoe", price: "₹100" },
  { id: 4, image: shoes4, name: "CONGRESS shoe", price: "₹20000" },
  { id: 5, image: shoes5, name: "AMM ADIM PARTY shoe", price: "₹free 😂" },
];

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  const value = price.toString().replace(/[^0-9.]/g, "");
  return Number(value) || 0;
};

function Shoes() {
  const [shoes, setShoes] = useState(fallbackShoes);
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
          category: "shoes",
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
          category: "shoes",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to add to wishlist.");
      setMessage("Added to wishlist.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleImageError = (shoeId, event) => {
    event.target.onerror = null;
    event.target.src = fallbackShoes[0].image;
    setShoes((prevShoes) =>
      prevShoes.map((shoe) =>
        shoe.id === shoeId ? { ...shoe, image: fallbackShoes[0].image } : shoe
      )
    );
  };

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const res = await fetch("http://localhost:8000/shoes");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Unable to load shoes");
        }

        if (Array.isArray(data.shoes) && data.shoes.length > 0) {
          setShoes(
            data.shoes.map((shoe, index) => ({
              id: shoe._id || shoe.id || index,
              image:
                shoe.image && shoe.image.toString().trim().length > 0
                  ? shoe.image
                  : fallbackShoes[index]?.image,
              name: shoe.name || fallbackShoes[index]?.name || "Unknown Shoe",
              price:
                typeof shoe.price === "number"
                  ? `₹${shoe.price}`
                  : shoe.price || fallbackShoes[index]?.price || "₹0",
            }))
          );
        } else {
          setShoes(fallbackShoes);
        }
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  return (
    <div className="shoes-page">
      <h1>All Shoes</h1>

      {message && <p className="message-text">{message}</p>}
      {loading ? (
        <p>Loading shoes...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="shoe-grid">
          {shoes.map((shoe) => (
            <div className="shoe-card" key={shoe.id}>
              <img
                src={shoe.image}
                alt={shoe.name}
                onError={(event) => handleImageError(shoe.id, event)}
              />
              <h3>{shoe.name}</h3>
              <p>{shoe.price}</p>
              <div className="product-actions">
                <button onClick={() => addToCart(shoe)}>Add to Cart</button>
                <button onClick={() => addToWishlist(shoe)}>Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shoes;