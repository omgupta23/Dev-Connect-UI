import React, { useState } from "react";

const UserCard = ({ user, onIgnore, onInterested }) => {
  const { firstName, lastName, age, photoUrl, gender, about, skills } = user;
  const [imgFailed, setImgFailed] = useState(false);

  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  const skillList = Array.isArray(skills)
    ? skills
    : typeof skills === "string" && skills
      ? skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  return (
    <div className="relative w-80 rounded-3xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-800 group">
      <div className="relative h-96 w-full overflow-hidden bg-gray-800">
        {!imgFailed && photoUrl ? (
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-gray-900">
            <span className="text-6xl font-bold text-white/30">{initials}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-2xl font-bold text-white leading-tight">
            {firstName} {lastName}
            {age && (
              <span className="text-white/60 font-normal text-lg ml-2">
                {age}
              </span>
            )}
          </h2>
          {gender && (
            <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 capitalize border border-white/10">
              {gender}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {about && about !== "This is a default about section" && (
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
            {about}
          </p>
        )}

        {skillList.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skillList.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button
            onClick={onIgnore}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-800 text-gray-300 hover:bg-red-950 hover:text-red-400 border border-gray-700 hover:border-red-800 transition-all duration-200"
          >
            ✕ Ignore
          </button>
          <button
            onClick={onInterested}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-900/40"
          >
            ♥ Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
