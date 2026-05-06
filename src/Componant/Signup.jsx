import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [emailId, setEmailId] = useState("");

  const [password, setPassword] = useState("");

  const [age, setAge] = useState("");

  const [gender, setGender] = useState("");

  const [skills, setSkills] = useState("");

  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("firstName", firstName);

      formData.append("lastName", lastName);

      formData.append("emailId", emailId);

      formData.append("password", password);

      formData.append("age", age);

      formData.append("gender", gender);

      formData.append(
        "skills",
        JSON.stringify(
          skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        ),
      );

      if (photo) {
        formData.append("photo", photo);
      }

      await axios.post(BASE_URL + "/signup", formData, {
        withCredentials: true,
      });

      toast.success("Account created successfully");

      navigate("/login");
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-indigo-600 to-purple-700">
          <h1 className="text-5xl font-bold text-white leading-tight">
            DevConnect
          </h1>

          <p className="text-indigo-100 mt-5 text-lg leading-relaxed">
            Connect with developers, collaborate on projects, and grow your
            network.
          </p>

          <div className="mt-10 space-y-4 text-indigo-100 text-sm">
            <p>🚀 Build meaningful tech connections</p>

            <p>💼 Find collaborators & internships</p>

            <p>🔥 Showcase your skills and projects</p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>

          <p className="text-gray-400 mt-2 text-sm">
            Join the developer network today
          </p>

          <div className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={firstName}
                setValue={setFirstName}
                placeholder="John"
              />

              <Input
                label="Last Name"
                value={lastName}
                setValue={setLastName}
                placeholder="Doe"
              />
            </div>

            <Input
              label="Email"
              type="email"
              value={emailId}
              setValue={setEmailId}
              placeholder="john@gmail.com"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="••••••••"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Age"
                type="number"
                value={age}
                setValue={setAge}
                placeholder="22"
              />

              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  Gender
                </label>

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select</option>

                  <option value="male">Male</option>

                  <option value="female">Female</option>

                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <Input
              label="Skills"
              value={skills}
              setValue={setSkills}
              placeholder="React, Node.js, MongoDB"
            />

            <div>
              <label className="text-sm text-gray-300 block mb-1">
                Upload Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
              />
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-indigo-400 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, value, setValue, type = "text", placeholder }) => (
  <div>
    <label className="text-sm text-gray-300 block mb-1">{label}</label>

    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
    />
  </div>
);
