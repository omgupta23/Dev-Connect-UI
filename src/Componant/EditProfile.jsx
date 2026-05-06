import React, { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { addUser } from "../utils/userslice";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [saving, setSaving] = useState(false);

  const saveData = async () => {
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("about", about);

      formData.append(
        "skills",
        JSON.stringify(
          Array.isArray(skills)
            ? skills
            : skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        ),
      );

      if (photoUrl instanceof File) {
        formData.append("photo", photoUrl);
      }

      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data || res.data));

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="border-b border-gray-800 px-6 py-4">
        <h1 className="text-lg font-semibold text-white tracking-tight">
          Edit Profile
        </h1>

        <p className="text-xs text-gray-500 mt-0.5">
          Update your personal details and preview changes live
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900 border border-gray-800">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0 border-2 border-gray-700">
              {photoUrl ? (
                <img
                  src={
                    photoUrl instanceof File
                      ? URL.createObjectURL(photoUrl)
                      : photoUrl
                  }
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-bold">
                  {(firstName?.[0] || "?").toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1">
              <label className="text-xs font-medium text-gray-400 block mb-1">
                Upload Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoUrl(e.target.files[0])}
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="First Name"
              value={firstName}
              setValue={setFirstName}
              placeholder="John"
            />

            <Field
              label="Last Name"
              value={lastName}
              setValue={setLastName}
              placeholder="Doe"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Age"
              type="number"
              value={age}
              setValue={setAge}
              placeholder="25"
            />

            <div>
              <label className="text-xs font-medium text-gray-400 block mb-1.5">
                Gender
              </label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition appearance-none cursor-pointer"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-400 block mb-1.5">
              About
            </label>

            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              placeholder="Write something about yourself..."
              className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-400 block mb-1.5">
              Skills
            </label>

            <input
              type="text"
              value={Array.isArray(skills) ? skills.join(", ") : skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
            />

            {skills && (
              <div className="flex flex-wrap gap-2 mt-2">
                {(Array.isArray(skills) ? skills : skills.split(","))
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50"
                    >
                      {s}
                    </span>
                  ))}
              </div>
            )}

            <p className="text-xs text-gray-600 mt-1.5">
              Separate skills with commas
            </p>
          </div>

          <button
            onClick={saveData}
            disabled={saving}
            className="w-full py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="lg:w-80 flex flex-col gap-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
            Live Preview
          </p>

          <div className="sticky top-6">
            <UserCard
              user={{
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl:
                  photoUrl instanceof File
                    ? URL.createObjectURL(photoUrl)
                    : photoUrl,
                skills,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, setValue, type = "text", placeholder }) => (
  <div>
    <label className="text-xs font-medium text-gray-400 block mb-1.5">
      {label}
    </label>

    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
    />
  </div>
);

export default EditProfile;
