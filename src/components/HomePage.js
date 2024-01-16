import React from "react";
import "../styles/HomePage.css";
import Jumbotron from "./Jumbotron";
import FeaturedProducts from "../components/FeaturedProducts";
import DiamondShapeFilter from "./DiamondShapeFilter";

const HomePage = () => {
   return (
      <div>
         <Jumbotron />
         <DiamondShapeFilter />
         <FeaturedProducts />
      </div>
   );
};

export default HomePage;
