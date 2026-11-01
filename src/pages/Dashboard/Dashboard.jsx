import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

import hat1 from "../../assets/hat1.jpg";
import shoes1 from "../../assets/shoes1.jpg";
import tshirt1 from "../../assets/tshirt1.jpg";
import jacket1 from "../../assets/jacket1.avif";
import hero3 from "../../assets/hero3.jpg";

import { useEffect, useState } from "react";

import {
  FiSearch,
  FiShoppingCart,
  FiArrowUpRight,
} from "react-icons/fi";

import {
  FaRegHeart,
  FaRegUser,
} from "react-icons/fa";
import { HiBattery100 } from "react-icons/hi2";

function Dashboard() {

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/allcategory?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/allcategory");
    }
  };

  // Dashboard API
  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await fetch("https://mindbrain-ecommerce.onrender.com/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data.message);
          return;
        }

        console.log(data.message);

      } catch (error) {

        console.error("Dashboard fetch failed:", error);

      }

    };

    fetchDashboard();

  }, []);

  return (

    <div className="dashboard">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          E-COMMERCE
        </div>

        {/* SEARCH BAR */}

        <form
          className="search-box"
          onSubmit={handleSearchSubmit}
        >

          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={handleSearch}
          />

          <button
            type="submit"
            className="search-button"
            aria-label="Search products"
          >
            <FiSearch className="search-icon" />
          </button>

        </form>

        {/* NAVIGATION LINKS */}

        <div className="nav-links">

          <Link to="/allcategory">
            All Category
          </Link>

          <Link to="/giftcards">
            Gift Cards
          </Link>

          <Link to="/specialevents">
            Special Events
          </Link>

        </div>

        {/* NAVBAR ICONS */}

        <div className="icons">

          <Link to="/wishlist">
            <FaRegHeart />
          </Link>

          <Link to="/profile">
            <FaRegUser />
          </Link>

          <Link to="/cart">
            <FiShoppingCart />
          </Link>

        </div>

      </nav>


      {/* ================= HERO SECTION ================= */}

      <section className="hero-grid">

        {/* LEFT BIG CARD */}

        <div className="hero-left">

          <img src={shoes1} alt="Trending shoes collection" />

          <div className="overlay">

            <h1>
              Color of the
              <br />
              Tranding
              <br />
              shoe
            </h1>

            <p>
              100+ Collections for your outfit
              inspirations in this summer
            </p>

            <Link to="/allcategory">

              <button>
                VIEW COLLECTIONS
              </button>

            </Link>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="hero-right">

          <div className="small-card">

            <img src={jacket1} alt="Summer outfit" />

            <div className="small-overlay">

              <h2>
                Winter
                <br />
                outfit
              </h2>

            </div>

          </div>


          <div className="small-card">

            <img src={hero3} alt="College comfort outfit" />

            <div className="small-overlay">

              <h2>
                College
                <br />
                Comfort
              </h2>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SECOND SECTION ================= */}

      <section className="bottom-grid">

        <div className="text-card">

          <h1>
            Casual
            <br />
            Inspirations
          </h1>

          <p>
            Our favorite combinations for casual outfits
            that can inspire you to upgrade your everyday
            style. Explore trendy colors, stylish looks
            that perfectly match your personality.
            Discover new fashion ideas and create your
            own unique style for every daily activity
            and occasion.
          </p>

        </div>


        <div className="image-card">

          <img src={tshirt1} alt="T-shirt collection" />

          <div className="card-text">

            <h2>
              Say it
              <br />
              with Shirt
            </h2>

            <FiArrowUpRight className="arrow" />

          </div>

        </div>


        <div className="image-card">

          <img src={hat1} alt="Fashion collection" />

          <div className="card-text">

            <h2>
              Funky never
              <br />
              get old
            </h2>

            <FiArrowUpRight className="arrow" />

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-left">

          <h1>E-COMMERCE</h1>

          <p>
            E-commerce is a free UI Kit from Paperpillar
            that you can use for your personal or
            commercial project.
          </p>

        </div>


        <div className="footer-links">

          <div>

            <h4>POPULAR</h4>

            <Link to="/shoes">Shoes</Link>

            <Link to="/tshirt">T-Shirts</Link>

            <Link to="/jacket">Jackets</Link>

            <Link to="/hats">Hats</Link>

          </div>


          <div>

            <h4>MENU</h4>

            <Link to="/allcategory">All Category</Link>

            <Link to="/specialevents">Special Events</Link>

            <Link to="/testimonial">Testimonial</Link>

            <Link to="/blog">Blog</Link>

          </div>


          <div>

            <h4>OTHER</h4>

            <Link to="/tracking">Tracking Package</Link>

            <Link to="/faq">FAQ</Link>

            <Link to="/about">About Us</Link>

            <Link to="/contact">Contact Us</Link>

            <Link to="/terms">Terms and Conditions</Link>

          </div>

        </div>

      </footer>

    </div>

  );

}

export default Dashboard;