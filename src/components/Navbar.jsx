import React from "react";
import { Link } from "react-router-dom";
import { GoLaw } from "react-icons/go";
function Navbar() {
  return (
    <div className="w-full h-24 py-2 lg:px-10 bg-zinc-50">
      <div className="w-full h-full flex justify-between items-center">
        <div>
          <Link to="/">
            <GoLaw color="1ab394" size={40} />
          </Link>
        </div>
        <div>
          <ul className="flex items-center space-x-6">
            <li className="text-lg text-[#1ab394] font-medium">
              <Link to={"/profile"}>My Profile</Link>
            </li>
            <li className="text-lg text-[#1ab394] font-medium">
              <Link to={"/signin"}>Sign In</Link>
            </li>
            <li className="text-lg text-[#1ab394] font-medium">
              <Link to={"/signup"}>Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
