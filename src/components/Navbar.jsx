import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoLaw } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../redux/auth/authSlice";
function Navbar() {
  const { isSuccessLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation("/signin");
  };
  return (
    <div className="w-full h-[100px] py-2 lg:px-10 px-4 bg-zinc-50">
      <div className="w-full h-full flex justify-between items-center">
        <div>
          <Link to={"/"}>
            <GoLaw color="1ab394" size={40} />
          </Link>
        </div>
        <div>
          {isSuccessLogin ? (
            <ul className="flex space-x-6">
              <li onClick={onLogout} className="text-lg text-[#1ab394] font-medium cursor-pointer">
               Logout
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-6">
              <li className="text-lg text-[#1ab394] font-medium">
                <Link to={"/signin"}>Sign In</Link>
              </li>
              <li className="text-lg text-[#1ab394] font-medium">
                <Link to={"/signup"}>Sign Up</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
