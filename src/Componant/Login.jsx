import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";
import { Link } from "react-router-dom";
function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.user || res.data.data || res.data));

      navigate("/feed");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-sm bg-black p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={emailId}
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full mb-6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-indigo-400 cursor-pointer"
          >
            Forgot Password?
          </span>
        </div>
        <br></br>
        <button
          className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
        )}

        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-sky-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
