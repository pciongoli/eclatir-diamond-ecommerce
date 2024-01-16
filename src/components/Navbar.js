import React from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
   const { isAuthenticated } = useAuth();
   const navigate = useNavigate();

   return (
      <nav>
         <div className="navbar-top">
            <div className="top-section">
               <Link to="/" className="title">
                  Eclatir
               </Link>
               <div className="auth-buttons">
                  {isAuthenticated ? (
                     <Link to="/account">
                        <button>Account</button>
                     </Link>
                  ) : (
                     <Link to="/register">
                        <button>Sign Up</button>
                     </Link>
                  )}
               </div>
            </div>
         </div>
         <div className="buttons">
            <div className="category-buttons">
               <Link to="/diamonds">
                  <button>Diamonds</button>
               </Link>
               <Link to="/rings">
                  <button>Rings</button>
               </Link>
               <Link to="/necklaces">
                  <button>Necklaces</button>
               </Link>
               <Link to="/bracelets">
                  <button>Bracelets</button>
               </Link>
               {/* <Link to="/earrings">
                  <button>Earrings</button>
               </Link> */}
               <Link to="/specials">
                  <button>Specials</button>
               </Link>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
