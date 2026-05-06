import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      await axios.patch(BASE_URL + "/forgot-password", {
        emailId,
        password,
      });

      toast.success("Password updated successfully");

      navigate("/login");
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">Forgot Password</h1>

        <p className="text-gray-400 text-sm mt-2">
          Reset your account password
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-gray-300 block mb-1">Email</label>

            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 block mb-1">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
