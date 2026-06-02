import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { toast } from "react-toastify";

const Request = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });

      setRequests(res.data.data);
    } catch (err) {
      console.error(err);

      toast.error("Failed to fetch requests");
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        },
      );

      toast.success(`Request ${status}`);

      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center text-xl">
        No Connection Requests
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10">
        Connection Requests
      </h1>

      <div className="max-w-3xl mx-auto space-y-5">
        {requests.map((request) => {
          const user = request.fromUserId;

          return (
            <div
              key={request._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={user?.photoUrl}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover border border-gray-700"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {user?.age}, {user?.gender}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">{user.about}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
