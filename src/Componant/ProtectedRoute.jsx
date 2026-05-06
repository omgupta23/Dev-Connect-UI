import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

import BASE_URL from "../utils/constant";

import { addUser } from "../utils/userslice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
