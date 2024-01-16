// ProductPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
   const { category, productId } = useParams();
   const [product, setProduct] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const response = await fetch(`/api/${category}/${productId}`);

            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setProduct(data);
            setIsLoading(false);
         } catch (error) {
            setError(error.message);
            setIsLoading(false);
         }
      };

      fetchProduct();
   }, [category, productId]);

   return (
      <div>
         {isLoading ? (
            <p>Loading...</p>
         ) : error ? (
            <p>Error: {error}</p>
         ) : (
            <div>
               <img src={product.image} alt={product.name} />
               <h2>{product.name}</h2>
               <p>${product.price}</p>
               {/* Additional product properties */}
            </div>
         )}
      </div>
   );
};

export default ProductPage;
