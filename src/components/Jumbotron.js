// Jumbotron.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Jumbotron.css";

const Jumbotron = () => {
   const navigate = useNavigate();

   const handleButtonClick = () => {
      navigate("/diamonds");
   };

   return (
      <div className="jumbotron">
         <h1>Welcome to Eclatir</h1>
         <p>
            Discover the perfect diamond at Eclatir. Our diamonds are crafted
            with precision and care, ensuring the highest quality and
            brilliance. Choose lab diamonds for an environmentally sustainable
            choice.
         </p>
         <div className="buttons">
            <button onClick={() => handleButtonClick()}>
               Shop Lab Diamonds
            </button>
         </div>
      </div>
   );
};

export default Jumbotron;
