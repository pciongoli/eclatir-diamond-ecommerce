import React, { useState, useReducer, useEffect } from "react";
import Round from "../images/Round.png";
import Cushion from "../images/Cushion.png";
import Princess from "../images/Princess.png";
import Emerald from "../images/Emerald.png";
import Oval from "../images/Oval.png";
import Asscher from "../images/Asscher.png";
import Radiant from "../images/Radiant.png";
import Marquise from "../images/Marquise.png";
import Pear from "../images/Pear.png";
import Heart from "../images/Heart.png";
import "../styles/DiamondCustomizer.css";

const initialFilterState = {
   type: "",
   minCarat: 0.2,
   maxCarat: 5,
   cut: "",
   color: "",
   clarity: "",
   minPrice: 500,
   maxPrice: 10000,
};

const filterReducer = (state, action) => {
   switch (action.type) {
      case "SET_FILTER":
         return { ...state, [action.name]: action.value };
      case "RESET_FILTER":
         return { ...initialFilterState };
      default:
         return state;
   }
};

const DiamondCustomizer = ({ onFilter }) => {
   const [filters, dispatch] = useReducer(filterReducer, initialFilterState);
   const [visibleFilter, setVisibleFilter] = useState(null);

   const cuts = ["Excellent", "Very Good", "Good", "Fair", "Poor"];
   const colors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
   const clarities = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"];
   const types = [
      { name: "Round", img: Round },
      { name: "Cushion", img: Cushion },
      { name: "Princess", img: Princess },
      { name: "Emerald", img: Emerald },
      { name: "Oval", img: Oval },
      { name: "Asscher", img: Asscher },
      { name: "Radiant", img: Radiant },
      { name: "Marquise", img: Marquise },
      { name: "Pear", img: Pear },
      { name: "Heart", img: Heart },
   ];

   useEffect(() => {
      onFilter(filters);
   }, [filters, onFilter]);

   const handleChange = (filterName, value) => {
      dispatch({ type: "SET_FILTER", name: filterName, value: value });
   };

   const resetFilters = () => {
      dispatch({ type: "RESET_FILTER" });
   };

   const toggleFilter = (filterName) => {
      setVisibleFilter(visibleFilter === filterName ? null : filterName);
   };

   return (
      <div className="diamond-customizer">
         <h3>Customize your Diamond</h3>
         <div className="filters">
            <div
               className={`filter-btn ${
                  visibleFilter === "type" ? "active" : ""
               }`}
               onClick={() => toggleFilter("type")}
            >
               Type: {filters.type || "Any"}
               {visibleFilter === "type" && (
                  <div className="filter-options">
                     {types.map((type, index) => (
                        <button
                           key={index}
                           onClick={() => handleChange("type", type.name)}
                        >
                           <img
                              src={type.img}
                              alt={type.name}
                              className="type-icon"
                           />
                           {type.name}
                        </button>
                     ))}
                  </div>
               )}
            </div>

            <div
               className={`filter-btn ${
                  visibleFilter === "cut" ? "active" : ""
               }`}
               onClick={() => toggleFilter("cut")}
            >
               Cut: {filters.cut || "Any"}
               {visibleFilter === "cut" && (
                  <div className="filter-options">
                     {cuts.map((cut, index) => (
                        <button
                           key={index}
                           onClick={() => handleChange("cut", cut)}
                        >
                           {cut}
                        </button>
                     ))}
                  </div>
               )}
            </div>

            <div
               className={`filter-btn ${
                  visibleFilter === "color" ? "active" : ""
               }`}
               onClick={() => toggleFilter("color")}
            >
               Color: {filters.color || "Any"}
               {visibleFilter === "color" && (
                  <div className="filter-options">
                     {colors.map((color, index) => (
                        <button
                           key={index}
                           onClick={() => handleChange("color", color)}
                        >
                           {color}
                        </button>
                     ))}
                  </div>
               )}
            </div>

            <div
               className={`filter-btn ${
                  visibleFilter === "clarity" ? "active" : ""
               }`}
               onClick={() => toggleFilter("clarity")}
            >
               Clarity: {filters.clarity || "Any"}
               {visibleFilter === "clarity" && (
                  <div className="filter-options">
                     {clarities.map((clarity, index) => (
                        <button
                           key={index}
                           onClick={() => handleChange("clarity", clarity)}
                        >
                           {clarity}
                        </button>
                     ))}
                  </div>
               )}
            </div>

            <div
               className={`filter-btn ${
                  visibleFilter === "carat" ? "active" : ""
               }`}
               onClick={() => toggleFilter("carat")}
            >
               Carat: {filters.minCarat} - {filters.maxCarat}
               {visibleFilter === "carat" && (
                  <div className="filter-options">
                     <span>
                        {filters.minCarat} - {filters.maxCarat}
                     </span>
                     <input
                        type="range"
                        min="0.2"
                        max="5"
                        step="0.1"
                        value={filters.minCarat}
                        onChange={(e) =>
                           handleChange("minCarat", parseFloat(e.target.value))
                        }
                     />
                     <input
                        type="range"
                        min="0.2"
                        max="5"
                        step="0.1"
                        value={filters.maxCarat}
                        onChange={(e) =>
                           handleChange("maxCarat", parseFloat(e.target.value))
                        }
                     />
                  </div>
               )}
            </div>

            <div
               className={`filter-btn ${
                  visibleFilter === "price" ? "active" : ""
               }`}
               onClick={() => toggleFilter("price")}
            >
               Price: ${filters.minPrice} - ${filters.maxPrice}
               {visibleFilter === "price" && (
                  <div className="filter-options">
                     <span>
                        ${filters.minPrice} - ${filters.maxPrice}
                     </span>
                     <input
                        type="range"
                        min="500"
                        max="10000"
                        step="100"
                        value={filters.minPrice}
                        onChange={(e) =>
                           handleChange("minPrice", parseInt(e.target.value))
                        }
                     />
                     <input
                        type="range"
                        min="500"
                        max="10000"
                        step="100"
                        value={filters.maxPrice}
                        onChange={(e) =>
                           handleChange("maxPrice", parseInt(e.target.value))
                        }
                     />
                  </div>
               )}
            </div>
         </div>
         <div className="buttons">
            <button onClick={resetFilters}>Reset Filters</button>
         </div>
      </div>
   );
};

export default DiamondCustomizer;
