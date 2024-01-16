import React from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Account = () => {
   const { signOut } = useAuth(); // Assuming you have a signOut method
   const navigate = useNavigate();

   const handleLogout = () => {
      signOut(); // Implement your sign-out logic here
      navigate("/login");
   };

   return (
      <div>
         {/* Place your account information here */}
         <h2>Account Information</h2>
         {/* ... */}
         <button onClick={handleLogout}>Logout</button>
      </div>
   );
};

export default Account;
