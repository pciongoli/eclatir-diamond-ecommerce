// components/Footer.js

import React from "react";
import "../styles/Footer.css";

const Footer = () => {
   return (
      <footer className="footer">
         <div className="footer-content">
            <p>© 2023 Eclatir. All Rights Reserved.</p>
            <div className="footer-links">
               <a href="/terms">Terms & Conditions</a>
               <a href="/privacy">Privacy Policy</a>
               <a href="/contact">Contact Us</a>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
