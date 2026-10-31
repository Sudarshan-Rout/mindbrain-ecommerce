import "./SpecialEvents.css";
import { useNavigate } from "react-router-dom";

function SpecialEvents() {
  const navigate = useNavigate();

  return (
    <div className="special-container">

      <div className="diwali-content">

        <div className="diya-icon">
          🪔 ✨ 🪔
        </div>

        <h1>Happy Diwali!</h1>

        <h2>Diwali Special Sale</h2>

        <div className="offer-box">
          <span>UP TO</span>
          <h3>50% OFF</h3>
          <span>ON SPECIAL COLLECTION</span>
        </div>

        <p>
          Celebrate the festival of lights with amazing
          shopping deals! Enjoy exciting discounts on our
          special collection and make this Diwali more
          memorable with wonderful offers.
        </p>

        <div className="diwali-decoration">
          ✨ 🪔 🎆 🪔 ✨
        </div>

        <button onClick={() => navigate("/dashboard")}>
          Shop Now →
        </button>

        <div className="diwali-footer">
          Limited Time Festival Offer
        </div>

      </div>

    </div>
  );
}

export default SpecialEvents;