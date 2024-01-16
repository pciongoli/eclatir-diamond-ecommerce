import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";

const initialState = {
   featuredProducts: [],
   isLoading: true,
   error: null,
};

const reducer = (state, action) => {
   switch (action.type) {
      case "FETCH_SUCCESS":
         return {
            ...state,
            isLoading: false,
            featuredProducts: action.payload,
         };
      case "FETCH_ERROR":
         return {
            ...state,
            isLoading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

const Specials = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      const fetchFeaturedProducts = async () => {
         try {
            const response = await fetch("/api/specials");
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });
         } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
         }
      };
      fetchFeaturedProducts();
   }, []);

   return (
      <ul className="product-list">
         {state.isLoading ? (
            <p>Loading...</p>
         ) : state.error ? (
            <p>Error: {state.error}</p>
         ) : (
            state.featuredProducts.map((product) => (
               <li key={product._id} className="product-item">
                  <Link to={`/product/specials/${product._id}`}>
                     <img src={product.image} alt={product.name} />
                     <p>{product.name}</p>
                     <p>${product.price}</p>
                  </Link>
               </li>
            ))
         )}
      </ul>
   );
};

export default Specials;
