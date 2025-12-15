import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { userAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { session, signOut } = userAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center w-[92%] mx-auto pt-5">
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold">Job Tracker</h1>
      </div>

      <div
        className={`md:static absolute bg-white md:min-h-fit left-0 top-[9%] md:w-auto w-full px-5 ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-10">
          <NavLink
            className="hover:text-gray-500"
            to="/dashboard"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            className="hover:text-gray-500"
            to="/applications"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            onClick={() => setIsMenuOpen(false)}
          >
            Applications
          </NavLink>

          <NavLink
            className="hover:text-gray-500"
            to="/rejected"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            onClick={() => setIsMenuOpen(false)}
          >
            Rejected
          </NavLink>

          <NavLink
            className="hover:text-gray-500"
            to="/offers"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            onClick={() => setIsMenuOpen(false)}
          >
            Offers
          </NavLink>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handleSignOut}
          className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
        >
          Sign out
        </button>

        {isMenuOpen ? (
          <IoClose
            className="text-3xl cursor-pointer md:hidden"
            onClick={toggleMenu}
          />
        ) : (
          <CiMenuBurger
            className="text-3xl cursor-pointer md:hidden"
            onClick={toggleMenu}
          />
        )}
      </div>
    </nav>
  );
};

export default Header;
