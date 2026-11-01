import "./Cart.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://mindbrain-ecommerce.onrender.com";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      setMessage("Please login to view your cart.");
      return;
    }

    const user = JSON.parse(stored);

    try {
      const res = await fetch(`${API_URL}/users/${user._id}/cart`);
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setCart(data.cart || []);
    } catch (err) {
      setMessage("Unable to load cart.");
    }
  };

  const handleRemove = async (itemId) => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const user = JSON.parse(stored);

    try {
      const res = await fetch(
        `${API_URL}/users/${user._id}/cart/${itemId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setCart(data.cart);
    } catch (err) {
      setMessage("Unable to remove item.");
    }
  };

  const updateQuantity = async (itemId, action) => {
    const stored = localStorage.getItem("user");

    if (!stored) return;

    const user = JSON.parse(stored);

    try {
      const res = await fetch(
        `${API_URL}/users/${user._id}/cart/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setCart(data.cart);
    } catch (err) {
      setMessage("Unable to update quantity.");
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 0 : 0;

  const gst = Math.round(subtotal * 0.05);

  const total = subtotal + gst + delivery;

  return (
    <div className="cart-container">

      <h1>🛒 My Shopping Cart</h1>

      {message && (
        <p className="cart-message">
          {message}
        </p>
      )}

      {cart.length === 0 ? (
        <div className="empty-card">
          <h2>Your Cart is Empty 😔</h2>
          <p>Add some products first.</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              className="cart-card"
              key={item._id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-info">

                <h2>{item.name}</h2>

                <p>
                  Price :
                  <strong>
                    ₹{item.price}
                  </strong>
                </p>

                <div className="quantity-box">

                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        "decrease"
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        "increase"
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <p>
                  Total :
                  <strong>
                    ₹
                    {item.price *
                      item.quantity}
                  </strong>
                </p>

                <button
                  className="remove-btn"
                  onClick={() =>
                    handleRemove(item._id)
                  }
                >
                  🗑 Remove
                </button>

              </div>
            </div>
          ))}

          <div className="cart-total">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <div className="summary-row">
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>

            <hr />

            <div className="summary-row total-price">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

            <button
              className="back-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Continue Shopping
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;