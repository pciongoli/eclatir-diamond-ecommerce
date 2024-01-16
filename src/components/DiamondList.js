import React, { useEffect, useReducer, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DiamondCustomizer from "./DiamondCustomizer";
import "../styles/DiamondList.css";
import "../styles/ProductList.css";

const initialState = {
   diamonds: [],
   isLoading: true,
   error: null,
};

const reducer = (state, action) => {
   switch (action.type) {
      case "FETCH_SUCCESS":
         return {
            ...state,
            isLoading: false,
            diamonds: action.payload,
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

const DiamondList = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [customOptions, setCustomOptions] = useState(null);
   const { shape } = useParams();

   const handleCustomize = (options) => {
      setCustomOptions(options);
   };

   useEffect(() => {
      const fetchDiamonds = async () => {
         try {
            let apiUrl = "/api/diamonds";
            if (shape) {
               apiUrl = `/api/diamonds/shape/${shape}`;
            }

            // Add custom options to the API URL
            if (customOptions) {
               const params = new URLSearchParams(customOptions).toString();
               apiUrl += `?${params}`;
            }

            const response = await fetch(apiUrl);

            if (!response.ok) {
               throw new Error("Network response was not ok");
            }

            const data = await response.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });
         } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message });
         }
      };

      fetchDiamonds();
   }, [shape, customOptions]);

   return (
      <div>
         <DiamondCustomizer onFilter={handleCustomize} />

         <ul className="product-list">
            {state.isLoading ? (
               <p>Loading...</p>
            ) : state.error ? (
               <p>Error: {state.error}</p>
            ) : (
               state.diamonds.map((diamond) => (
                  <li key={diamond._id} className="product-item">
                     <Link to={`/product/diamonds/${diamond._id}`}>
                        <img
                           src={diamond.image}
                           alt={`${diamond.type} diamond`}
                        />
                        <h4>{diamond.type}</h4>
                     </Link>
                     <p>
                        {diamond.carat} carats - {diamond.cut} cut -{" "}
                        {diamond.color} color - {diamond.clarity} clarity - $
                        {diamond.price}
                     </p>
                  </li>
               ))
            )}
         </ul>
      </div>
   );
};

export default DiamondList;
