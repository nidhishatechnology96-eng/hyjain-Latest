import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears user from context and localStorage
    navigate("/"); // redirect to home page after logout
  };

  return (
    <button 
      className="btn btn-outline-danger btn-sm" 
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
