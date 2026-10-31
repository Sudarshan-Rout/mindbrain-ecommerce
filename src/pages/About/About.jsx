import "./About.css";

function About() {
  return (
    <div className="about-container">

      <h1>About Us</h1>

      <p>
        Welcome to our E-Commerce website. We provide high-quality products
        at affordable prices. Our goal is to give customers the best online
        shopping experience with secure payment and fast delivery.
      </p>

      <div className="about-box">

        <div className="card">
          <h2>Our Mission</h2>
          <p>
            To provide quality products with the best customer service.
          </p>
        </div>

        <div className="card">
          <h2>Our Vision</h2>
          <p>
            To become one of the most trusted online shopping platforms.
          </p>
        </div>

        <div className="card">
          <h2>Why Choose Us?</h2>
          <p>
            ✔ High Quality Products <br />
            ✔ Fast Delivery <br />
            ✔ Secure Payment <br />
            ✔ 24/7 Customer Support
          </p>
        </div>

      </div>
                           <br></br>
                           <br></br>
<h3> Thank You.....!</h3>
    </div>

   
  );
}

export default About;