import "./Tracking.css";

function Tracking() {
  return (
    <div className="tracking-container">

      <h1>Track Your Package</h1>

      <p>Enter your tracking number below.</p>

      <input
        type="text"
        placeholder="Enter Tracking Number"
      />

      <button>Track Package</button>

      <div className="status-box">
        <h2>Tracking Status</h2>

        <p>📦 Order Confirmed</p>
        <p>🚚 Shipped</p>
        <p>📍 Current Location : Bhubaneswar</p>
        <p>📅 Expected Delivery : 25 July 2026</p>
      </div>

    </div>
  );
}

export default Tracking;