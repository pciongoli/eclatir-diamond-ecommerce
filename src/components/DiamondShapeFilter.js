import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DiamondShapeFilter.css";

const DiamondShapeFilter = () => {
   const navigate = useNavigate();
   const scrollRef = useRef();
   const diamondShapes = [
      {
         name: "Round",
         image: "https://assets.codepen.io/7125791/round-cut-diamond.jpeg",
      },
      {
         name: "Cushion",
         image: "https://assets.codepen.io/7125791/cushion-cut-diamond.jpeg",
      },
      {
         name: "Princess",
         image: "https://assets.codepen.io/7125791/princess-cut-diamond.jpeg",
      },
      {
         name: "Emerald",
         image: "https://assets.codepen.io/7125791/emerald-cut-diamond.jpeg",
      },
      {
         name: "Oval",
         image: "https://assets.codepen.io/7125791/oval-cut-diamond.jpeg",
      },
      {
         name: "Asscher",
         image: "https://assets.codepen.io/7125791/asscher-cut-diamond.jpeg",
      },
      {
         name: "Radiant",
         image: "https://assets.codepen.io/7125791/radiant-cut-diamond.jpeg",
      },
      {
         name: "Marquise",
         image: "https://assets.codepen.io/7125791/marquise-cut-diamond.jpeg",
      },
      {
         name: "Pear",
         image: "https://assets.codepen.io/7125791/pear-cut-diamond.jpeg",
      },
      {
         name: "Heart",
         image: "https://assets.codepen.io/7125791/heart-cut-diamond.jpeg",
      },
   ];

   const handleShapeClick = (shape) => {
      navigate(`/diamonds/shape/${shape}`);
   };

   const scroll = (scrollOffset) => {
      scrollRef.current.scrollBy({
         left: scrollOffset,
         behavior: "smooth",
      });
   };

   return (
      <div className="diamond-shape-filter">
         <div className="catchy-phrase">
            Sparkle With Your Perfect Shape! 💎 Click and Find Your Gem!
         </div>
         <div className="diamond-shape-container" ref={scrollRef}>
            {diamondShapes.map((shape, index) => (
               <div
                  key={index}
                  className="diamond-shape-item"
                  onClick={() => handleShapeClick(shape.name)}
               >
                  <img src={shape.image} alt={shape.name} />
                  <p>{shape.name}</p>
               </div>
            ))}
         </div>
         <button className="scroll-button left" onClick={() => scroll(-200)}>
            &lt;
         </button>
         <button className="scroll-button right" onClick={() => scroll(200)}>
            &gt;
         </button>
      </div>
   );
};

export default DiamondShapeFilter;
