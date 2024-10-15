import React from "react";
import { useLocation } from "react-router-dom";
import Header from './Header/Header';
import Footer from "./Footer/Footer";
import Home from "./Home/Home";         // Updated import path for Home
import About from "./About/About";      // Updated import path for About
import Contact from "./Contact/Contact"; // Updated import path for Contact

function Layout({ page }) {
  // Check if the current page is one of the routes that should display the Header and Footer
  const showHeaderFooter = ["home", "about", "contact"].includes(page);

  return (
    <>
      {showHeaderFooter && <Header />}  {/* Conditionally render Header */}
      
      {page === "home" && <Home />}      {/* Home page content */}
      {page === "about" && <About />}    {/* About page content */}
      {page === "contact" && <Contact />} {/* Contact page content */}
      
      {showHeaderFooter && <Footer />}  {/* Conditionally render Footer */}
    </>
  );
}

export default Layout;
