import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Shoes from "../pages/Shoes/Shoes";
import TShirt from "../pages/TShirts/TShirt";
import Jackets from "../pages/Jackets/Jackets";
import Hats from "../pages/Hats/Hats";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Terms from "../pages/Terms/Terms";
import FAQ from "../pages/FAQ/FAQ";
import Tracking from "../pages/Tracking/Tracking";
import AllCategory from "../pages/AllCategory/AllCategory";
import SpecialEvents from "../pages/SpecialEvents/SpecialEvents";
import Testimonial from "../pages/Testimonial/Testimonial";
import Blog from "../pages/Blog/Blog";
import Wishlist from "../pages/Wishlist/Wishlist";
import Profile from "../pages/Profile/Profile";
import Cart from "../pages/Cart/Cart";
import GiftCards from "../pages/Giftcards/GiftCards";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/shoes" element={<Shoes />} />
      <Route path="/tshirt" element={<TShirt />} />
      <Route path="/jackets" element={<Jackets />} />
      <Route path="/hats" element={<Hats />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/allcategory" element={<AllCategory />} />
      <Route path="/specialevents" element={<SpecialEvents />} />
      <Route path="/testimonial" element={<Testimonial />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/giftcards" element={<GiftCards />} />
    </Routes>
  );
}
  

export default AppRoutes;