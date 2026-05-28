import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addfeed, removefeed } from "../utils/feedslice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getFeed = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addfeed(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleAction = async (type, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${type}/${userId}`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
    }
    dispatch(removefeed(userId));
  };

  const currentUser = feed?.[0];

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-gray-700 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  // Empty
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4 text-center px-6">
        <span className="text-5xl">🎉</span>
        <h2 className="text-white text-xl font-semibold">
          You're all caught up!
        </h2>
        <p className="text-gray-500 text-sm max-w-xs">
          No more profiles right now. Check back later.
        </p>
        <button
          onClick={getFeed}
          className="mt-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition"
        >
          Refresh
        </button>
      </div>
    );
  }

  // Feed
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 gap-6">
      <p className="text-xs text-gray-600 uppercase tracking-widest">
        {feed.length} {feed.length === 1 ? "profile" : "profiles"} left
      </p>

      <UserCard
        user={currentUser}
        onIgnore={() => handleAction("ignored", currentUser._id)}
        onInterested={() => handleAction("interested", currentUser._id)}
      />

      <div className="flex gap-4">
        <button
          onClick={() => handleAction("ignored", currentUser._id)}
          className="px-6 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:border-red-500/40 hover:text-red-400 text-sm font-medium transition"
        >
          ✕ Ignore
        </button>
        <button
          onClick={() => handleAction("interested", currentUser._id)}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition"
        >
          ♥ Interested
        </button>
      </div>
    </div>
  );
};

export default Feed;
