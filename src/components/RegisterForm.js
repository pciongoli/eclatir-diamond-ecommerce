import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterForm.css";

const RegisterForm = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post("/api/register", { username, password });
         alert("Registered Successfully");
         navigate("/login");
      } catch (error) {
         alert("Error registering");
      }
   };

   return (
      <div className="register-form">
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
         </form>
         <p>
            Already have an account? <Link to="/login">Log In</Link>
         </p>
      </div>
   );
};

export default RegisterForm;
