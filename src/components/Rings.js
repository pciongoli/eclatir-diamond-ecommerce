import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";

const initialState = {
   rings: [],
   isLoading: true,
   error: null,
};

const reducer = (state, action) => {
   switch (action.type) {
      case "FETCH_SUCCESS":
         return {
            ...state,
            isLoading: false,
            rings: action.payload,
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

const Rings = ({ categoryFilter }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      const fetchRings = async () => {
         try {
            const response = await fetch("/api/rings");
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });
         } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
         }
      };
      fetchRings();
   }, []);

   const filteredRings = state.rings.filter(
      (ring) => !categoryFilter || ring.category === categoryFilter
   );

   return (
      <ul className="product-list">
         {state.isLoading ? (
            <p>Loading...</p>
         ) : state.error ? (
            <p>Error: {state.error}</p>
         ) : (
            filteredRings.map((ring) => (
               <li key={ring._id} className="product-item">
                  <Link to={`/product/rings/${ring._id}`}>
                     <img src={ring.image} alt={ring.name} />
                     <p>{ring.name}</p>
                     <p>${ring.price}</p>
                  </Link>
               </li>
            ))
         )}
      </ul>
   );
};

export default Rings;
