import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addconnection } from "../utils/connectionslice";

const COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-red-100", text: "text-red-700" },
];

const initials = (user) =>
  `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

const colorFor = (i) => COLORS[i % COLORS.length];

const ConnectionCard = ({ user, index }) => {
  const col = colorFor(index);
  const init = initials(user);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md hover:border-gray-200 transition-all duration-200">
      <div className="flex items-center gap-3">
        {!imgFailed && user.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={init}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 ${col.bg} ${col.text}`}
          >
            {init}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-gray-900 text-base leading-tight">
            {user.firstName} {user.lastName}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {user.age && (
              <span className="text-xs text-gray-500">{user.age} yrs</span>
            )}
            {user.age && user.gender && (
              <span className="text-gray-300">·</span>
            )}
            {user.gender && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize">
                {user.gender}
              </span>
            )}
          </div>
        </div>
      </div>

      {user.about && user.about !== "This is a default about section" && (
        <p className="text-sm text-gray-500 leading-relaxed">{user.about}</p>
      )}

      {user.skills?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {user.skills.map((s) => (
            <span
              key={s}
              className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          disabled
          title="Coming soon"
          className="flex-1 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
        >
          Message
        </button>
        <button className="flex-1 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-150">
          View Profile
        </button>
      </div>
    </div>
  );
};

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      try {
        const res = await axios.get(BASE_URL + "/user/connection", {
          withCredentials: true,
        });
        dispatch(addconnection(res.data.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

  const filtered = (Array.isArray(connections) ? connections : []).filter(
    (c) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return `${c.firstName} ${c.lastName} ${c.skills?.join(" ") ?? ""}`
        .toLowerCase()
        .includes(q);
    },
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Connections</h1>
        <span className="text-sm text-gray-500 bg-gray-100 border border-gray-200 px-4 py-1 rounded-full">
          {filtered.length} connections
        </span>
      </div>

      <input
        type="text"
        placeholder="Search by name or skill..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 outline-none focus:border-indigo-400 focus:bg-white transition-all mb-7"
      />

      {loading && (
        <p className="text-center text-gray-400 text-sm py-16">
          Loading your connections...
        </p>
      )}

      {!loading && Array.isArray(connections) && filtered.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-16">
          No connections found.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((user, i) => (
          <ConnectionCard key={user._id ?? i} user={user} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Connection;
