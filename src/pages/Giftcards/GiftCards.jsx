import "./GiftCards.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GiftCards() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const giftCards = [
    {
      id: 1,
      amount: 500,
      title: "Starter Gift Card",
      description: "A little gift to make someone's day special.",
      color: "purple",
      icon: "🎁",
    },
    {
      id: 2,
      amount: 1000,
      title: "Classic Gift Card",
      description: "A perfect gift for friends and family.",
      color: "pink",
      icon: "💝",
    },
    {
      id: 3,
      amount: 2000,
      title: "Premium Gift Card",
      description: "Give them more choices and more happiness.",
      color: "orange",
      icon: "🎀",
    },
    {
      id: 4,
      amount: 5000,
      title: "Ultimate Gift Card",
      description: "Make every special occasion unforgettable.",
      color: "blue",
      icon: "✨",
    },
  ];

  const handleBuy = () => {
    if (!selectedCard) {
      alert("Please select a gift card first!");
      return;
    }

    alert(
      `You selected ₹${selectedCard.amount} Gift Card. Payment feature coming soon!`
    );
  };

  return (
    <div className="gift-page">

      <div className="gift-header">
        <span className="gift-tag">SPECIAL GIFT COLLECTION</span>

        <h1>
          Give Happiness <span>With Gift Cards</span>
        </h1>

        <p>
          Make someone's day special with the perfect gift.
          Choose a gift card, share happiness and let your
          loved ones shop for their favourite products.
        </p>
      </div>

      <div className="gift-banner">
        <div className="gift-banner-content">
          <h2>A Gift They'll Love!</h2>

          <p>
            The perfect present for every occasion.
            Let them choose what they love.
          </p>

          <span>🎁 Make Every Moment Special 🎁</span>
        </div>
      </div>

      <div className="gift-section">

        <h2>Choose Your Gift Card</h2>

        <p className="gift-subtitle">
          Select the perfect amount for your loved ones.
        </p>

        <div className="gift-grid">

          {giftCards.map((card) => (
            <div
              className={`gift-card ${card.color} ${
                selectedCard?.id === card.id ? "selected" : ""
              }`}
              key={card.id}
            >

              <div className="gift-card-top">
                <span className="gift-icon">{card.icon}</span>
                <span className="gift-label">GIFT CARD</span>
              </div>

              <h3>{card.title}</h3>

              <h1>₹{card.amount.toLocaleString("en-IN")}</h1>

              <p>{card.description}</p>

              <button
                className="select-gift-btn"
                onClick={() => setSelectedCard(card)}
              >
                {selectedCard?.id === card.id
                  ? "✓ Selected"
                  : "Select Gift Card"}
              </button>

            </div>
          ))}

        </div>

        {selectedCard && (
          <div className="selected-gift">

            <h3>Your Selected Gift Card</h3>

            <p>
              {selectedCard.title} - ₹
              {selectedCard.amount.toLocaleString("en-IN")}
            </p>

            <button onClick={handleBuy}>
              Buy Gift Card →
            </button>

          </div>
        )}

      </div>

      <div className="gift-benefits">

        <div>
          <span>🎉</span>
          <h3>Perfect for Every Occasion</h3>
          <p>Birthday, anniversary or festival gifts.</p>
        </div>

        <div>
          <span>❤️</span>
          <h3>Share Happiness</h3>
          <p>Make your loved ones feel special.</p>
        </div>

        <div>
          <span>🛍️</span>
          <h3>Freedom to Choose</h3>
          <p>Let them pick their favourite products.</p>
        </div>

      </div>

      <button
        className="gift-back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Home
      </button>

    </div>
  );
}

export default GiftCards;