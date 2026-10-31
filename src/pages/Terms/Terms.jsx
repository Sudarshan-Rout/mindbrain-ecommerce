import "./Terms.css";

function Terms() {
  return (
    <div className="terms-container">

      <h1>Terms & Conditions</h1>

      <p className="intro">
        Welcome to our E-Commerce website. By using this website,
        you agree to follow the terms and conditions mentioned below.
      </p>

      <div className="terms-box">

        <h2>1. Product Information</h2>
        <p>
          We try to provide accurate product descriptions, prices,
          and images. However, small differences may occur.
        </p>

        <h2>2. Orders</h2>
        <p>
          All orders are subject to availability. We reserve the
          right to cancel any order if necessary.
        </p>

        <h2>3. Payments</h2>
        <p>
          All payments must be completed before order confirmation.
        </p>

        <h2>4. Returns & Refunds</h2>
        <p>
          Customers can request a return or refund according to our
          return policy.
        </p>

        <h2>5. Privacy</h2>
        <p>
          Your personal information is kept secure and is not shared
          with third parties without your permission.
        </p>

        <h2>6. Contact</h2>
        <p>
          If you have any questions regarding these terms,
          please contact us.
        </p>

      </div>

    </div>
  );
}

export default Terms;