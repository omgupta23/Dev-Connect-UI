import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedslice";
import { removefeed } from "../utils/feedslice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(null);

  const getfeed = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addfeed(res.data.data));
    } catch (err) {
      console.error("Feed error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);

  const handleAction = async (type, userId) => {
    setAnimating(type === "ignore" ? "left" : "right");

    setTimeout(async () => {
      try {
        await axios.post(
          `${BASE_URL}/request/send/${type === "ignore" ? "ignored" : "interested"}/${userId}`,
          {},
          { withCredentials: true },
        );
      } catch (err) {
        console.error(err);
      }
      dispatch(removefeed(userId));
      setAnimating(null);
    }, 350);
  };

  const currentUser = feed?.[0];

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
      {loading && (
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-8 h-8 border-2 border-gray-700 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-sm">Finding people for you...</p>
        </div>
      )}

      {!loading && (!feed || feed.length === 0) && (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-4xl">
            🎉
          </div>
          <h2 className="text-white text-xl font-semibold">
            You're all caught up!
          </h2>
          <p className="text-gray-500 text-sm max-w-xs">
            No more profiles to show right now. Check back later for new
            connections.
          </p>
          <button
            onClick={getfeed}
            className="mt-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Refresh Feed
          </button>
        </div>
      )}

      {!loading && currentUser && (
        <div className="flex flex-col items-center gap-6">
          <p className="text-xs text-gray-600 tracking-widest uppercase">
            {feed.length} {feed.length === 1 ? "profile" : "profiles"} left
          </p>

          <div
            className="transition-all duration-300 ease-in-out"
            style={{
              opacity: animating ? 0 : 1,
              transform:
                animating === "left"
                  ? "translateX(-80px) rotate(-8deg)"
                  : animating === "right"
                    ? "translateX(80px) rotate(8deg)"
                    : "translateX(0) rotate(0deg)",
            }}
          >
            <div className="relative">
              {feed[2] && (
                <div className="absolute inset-0 rounded-3xl bg-gray-800 border border-gray-700 scale-95 translate-y-4 -z-10" />
              )}
              {feed[1] && (
                <div className="absolute inset-0 rounded-3xl bg-gray-850 border border-gray-700 scale-[0.97] translate-y-2 -z-10" />
              )}

              <UserCard
                user={currentUser}
                onIgnore={() => handleAction("ignore", currentUser._id)}
                onInterested={() => handleAction("interested", currentUser._id)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-700">
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-red-500">
                ✕
              </span>
              Ignore
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-800" />
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-indigo-400">
                ♥
              </span>
              Interested
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
