import { useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    skills: "",
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSignup = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "skills") {
          formData.append(
            "skills",
            JSON.stringify(
              v
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            ),
          );
        } else {
          formData.append(k, v);
        }
      });
      if (photo) formData.append("photo", photo);

      await axios.post(BASE_URL + "/signup", formData, {
        withCredentials: true,
      });
      toast.success("Account created!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-white">Create Account</h2>
        <p className="text-gray-500 text-sm mt-1">Join DevConnect today</p>

        <div className="mt-6 flex flex-col gap-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="First Name"
              value={form.firstName}
              onChange={set("firstName")}
              placeholder="John"
            />
            <Field
              label="Last Name"
              value={form.lastName}
              onChange={set("lastName")}
              placeholder="Doe"
            />
          </div>

          <Field
            label="Email"
            type="email"
            value={form.emailId}
            onChange={set("emailId")}
            placeholder="john@gmail.com"
          />
          <Field
            label="Password"
            type="password"
            value={form.password}
            onChange={set("password")}
            placeholder="••••••••"
          />

          {/* Age + Gender row */}
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Age"
              type="number"
              value={form.age}
              onChange={set("age")}
              placeholder="22"
            />
            <div>
              <label className="text-xs text-gray-400 block mb-1">Gender</label>
              <select
                value={form.gender}
                onChange={set("gender")}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <Field
            label="Skills (comma separated)"
            value={form.skills}
            onChange={set("skills")}
            placeholder="React, Node.js, MongoDB"
          />

          {/* Photo upload */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 text-sm focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition disabled:opacity-50 mt-1"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-emerald-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="text-xs text-gray-400 block mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500"
    />
  </div>
);
