import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-light p-3 mb-3">
      <div className="container d-flex">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `me-3 nav-link ${isActive ? 'text-decoration-underline text-primary' : 'text-decoration-none'}`}
        >
          Home
        </NavLink>
        <p className="me-3">|</p>
        <NavLink 
          to="/products" 
          className={({ isActive }) => `me-3 nav-link ${isActive ? 'text-decoration-underline text-primary' : 'text-decoration-none'}`}
        >
          Products
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
