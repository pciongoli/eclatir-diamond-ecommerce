import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

const initialState = {
   earrings: [],
   isLoading: true,
   error: null,
};

const reducer = (state, action) => {
   switch (action.type) {
      case "FETCH_SUCCESS":
         return {
            ...state,
            isLoading: false,
            earrings: action.payload,
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

const Earrings = ({ categoryFilter }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      const fetchEarrings = async () => {
         try {
            const response = await fetch("/api/earrings");
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });
         } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
         }
      };
      fetchEarrings();
   }, []);

   const filteredEarrings = state.earrings.filter(
      (earring) => !categoryFilter || earring.category === categoryFilter
   );

   return (
      <ul className="product-list">
         {state.isLoading ? (
            <p>Loading...</p>
         ) : state.error ? (
            <p>Error: {state.error}</p>
         ) : (
            filteredEarrings.map((earring) => (
               <li key={earring._id} className="product-item">
                  <Link to={`/product/earrings/${earring._id}`}>
                     <img src={earring.image} alt={earring.name} />
                     <p>{earring.name}</p>
                     <p>${earring.price}</p>
                  </Link>
               </li>
            ))
         )}
      </ul>
   );
};

export default Earrings;
