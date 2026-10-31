import "./Testimonial.css";

function Testimonial() {
  return (
    <div className="testimonial-container">

      <h1>Customer Testimonials</h1>

      <div className="testimonial-card">

        <h3>Ashutosh Rout(Biju babu) ⭐⭐⭐⭐⭐</h3>

        <p>
          "Excellent shopping experience! The products are of great quality
          and the delivery was very fast."
        </p>

      </div>

      <div className="testimonial-card">

        <h3>Amit Nayak ⭐⭐⭐⭐☆</h3>

        <p>
          "I really liked the collection of shoes and jackets.
          Customer support was also very helpful."
        </p>

      </div>

      <div className="testimonial-card">

        <h3>Ayusha Jena ⭐⭐⭐⭐⭐</h3>

        <p>
          "Affordable prices and amazing offers.
          I will definitely shop here again."
        </p>

      </div>

    </div>
  );
}

export default Testimonial;