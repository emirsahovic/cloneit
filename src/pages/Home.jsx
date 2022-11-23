import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logout, reset } from "../redux/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/signin");
  };

  return (
    <div>
      <p>Home</p>
      <button onClick={onLogout}>Log out</button>
    </div>
  );
};

export default Home;
