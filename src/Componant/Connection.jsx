import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addconnection } from "../utils/connectionslice";

const initials = (u) =>
  `${u.firstName?.[0] ?? ""}${u.lastName?.[0] ?? ""}`.toUpperCase();

const ConnectionCard = ({ user }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-sm transition-all duration-200">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3">
        {!imgFailed && user.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={initials(user)}
            onError={() => setImgFailed(true)}
            className="w-12 h-12 rounded-full object-cover border border-gray-100 shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm shrink-0">
            {initials(user)}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            {user.firstName} {user.lastName}
          </p>
          {user.age && (
            <p className="text-xs text-gray-400">
              {user.age} yrs · {user.gender}
            </p>
          )}
        </div>
      </div>

      {/* Skills */}
      {user.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {user.skills.map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 pt-1">
        <button className="flex-1 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          Message
        </button>
        <button className="flex-1 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
};

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
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
    fetch();
  }, []);

  const list = Array.isArray(connections) ? connections : [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Connections</h1>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {list.length} total
        </span>
      </div>

      {loading && (
        <p className="text-center text-gray-400 text-sm py-20">Loading...</p>
      )}

      {!loading && list.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-20">
          No connections yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {list.map((user, i) => (
          <ConnectionCard key={user._id ?? i} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Connection;
