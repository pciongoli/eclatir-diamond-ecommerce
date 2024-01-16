import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

const initialState = {
   necklaces: [],
   isLoading: true,
   error: null,
};

const reducer = (state, action) => {
   switch (action.type) {
      case "FETCH_SUCCESS":
         return {
            ...state,
            isLoading: false,
            necklaces: action.payload,
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

const Necklaces = ({ categoryFilter }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      const fetchNecklaces = async () => {
         try {
            const response = await fetch("/api/necklaces");
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });
         } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
         }
      };
      fetchNecklaces();
   }, []);

   const filteredNecklaces = state.necklaces.filter(
      (necklace) => !categoryFilter || necklace.category === categoryFilter
   );

   return (
      <ul className="product-list">
         {state.isLoading ? (
            <p>Loading...</p>
         ) : state.error ? (
            <p>Error: {state.error}</p>
         ) : (
            filteredNecklaces.map((necklace) => (
               <li key={necklace._id} className="product-item">
                  <Link to={`/product/necklaces/${necklace._id}`}>
                     <img src={necklace.image} alt={necklace.name} />
                     <p>{necklace.name}</p>
                     <p>${necklace.price}</p>
                  </Link>
               </li>
            ))
         )}
      </ul>
   );
};

export default Necklaces;
