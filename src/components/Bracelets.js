import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";

const initialState = {
   bracelets: [],
   isLoading: true,
   error: null,
};

const reducer = (state, action) => {
   switch (action.type) {
      case "FETCH_SUCCESS":
         return {
            ...state,
            isLoading: false,
            bracelets: action.payload,
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

const Bracelets = ({ categoryFilter }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      const fetchBracelets = async () => {
         try {
            const response = await fetch("/api/bracelets");
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });
         } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
         }
      };
      fetchBracelets();
   }, []);

   const filteredBracelets = state.bracelets.filter(
      (bracelet) => !categoryFilter || bracelet.category === categoryFilter
   );

   return (
      <ul className="product-list">
         {state.isLoading ? (
            <p>Loading...</p>
         ) : state.error ? (
            <p>Error: {state.error}</p>
         ) : (
            filteredBracelets.map((bracelet) => (
               <li key={bracelet._id} className="product-item">
                  <Link to={`/product/bracelets/${bracelet._id}`}>
                     <img src={bracelet.image} alt={bracelet.name} />
                     <p>{bracelet.name}</p>
                     <p>${bracelet.price}</p>
                  </Link>
               </li>
            ))
         )}
      </ul>
   );
};

export default Bracelets;
