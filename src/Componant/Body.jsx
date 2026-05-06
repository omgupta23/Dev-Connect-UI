import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userslice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userdata = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!userdata) {
      fetchUser();
    }
  }, [userdata]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
