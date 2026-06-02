import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addconnection } from "../utils/connectionslice";
import BASE_URL from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Connection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connections = useSelector((store) => store.connection);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      dispatch(addconnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  if (!connections || connections.length === 0) {
    return (
      <h1 className="text-center text-white mt-10">No Connections Found</h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center text-white mb-5">
        Connections
      </h1>

      {connections.map((user) => (
        <div
          key={user._id}
          className="flex justify-between items-center bg-white p-4 rounded-lg mb-3"
        >
          <div className="flex items-center gap-4">
            <img
              src={user.photoUrl}
              alt="profile"
              className="w-14 h-14 rounded-full"
            />

            <div>
              <h2 className="font-semibold">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-gray-500 text-sm">
                {user.age} {user.gender}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/chat/${user._id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Message
          </button>
        </div>
      ))}
    </div>
  );
};

export default Connection;
