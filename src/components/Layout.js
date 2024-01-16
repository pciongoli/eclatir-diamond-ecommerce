// components/Layout.js
import React from "react";
import Footer from "./Footer";
import "../styles/Layout.css";

const Layout = ({ children }) => {
   return (
      <div className="layout-container">
         <main className="layout-content">{children}</main>
         <Footer />
      </div>
   );
};

export default Layout;
