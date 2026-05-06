import React from "react";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">

      <div className="w-full md:w-1/2">
        {user && <EditProfile user={user} />}
      </div>

    </div>
  );
};

export default Profile;