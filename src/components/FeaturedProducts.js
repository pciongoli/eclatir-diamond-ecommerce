import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../styles/FeaturedProducts.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedProducts = () => {
   const [featuredProducts, setFeaturedProducts] = useState([]);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchFeaturedProducts = async () => {
         try {
            const response = await fetch("/api/specials");
            if (!response.ok) {
               throw new Error("Failed to fetch.");
            }
            const data = await response.json();
            console.log("Received data:", data);

            data
               .slice(0, 5)
               .forEach((product) => console.log("Image URL:", product.image));

            setFeaturedProducts(data.slice(0, 5)); // get the first 5 featured products
         } catch (error) {
            setError(error.message);
            console.error("Error fetching featured products:", error);
         }
      };

      fetchFeaturedProducts();
   }, []);

   const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
   };

   return (
      <div className="featured-products">
         {error && <p className="error">{error}</p>}
         <div className="content-container">
            <div className="featured-info">
               <h2>Featured Products</h2>
               <p>
                  Check out some of our featured products and find the perfect
                  diamond for you.
               </p>
            </div>
            <div className="product-slider">
               <Slider {...settings}>
                  {featuredProducts.map((product) => (
                     <div key={product._id} className="product-slide">
                        <img src={product.image} alt={`${product.type}`} />
                        <p>{product.type}</p>
                        <p>${product.price}</p>
                     </div>
                  ))}
               </Slider>
            </div>
         </div>
      </div>
   );
};

export default FeaturedProducts;
