import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user=useSelector((store)=>store.user);
  return (
    <div><div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">
  Dev Connect
</Link>
  </div>
  <div className="flex gap-2">
   
  {user && (
  <div className="flex items-center gap-3">


    <span className="hidden md:block text-sm opacity-80">
      Welcome, <span className="font-semibold">{user.firstName}</span> 👋
    </span>

  
    <div className="dropdown dropdown-end mx-2">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={user.photoUrl} alt="profile" />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
      >
        <li><Link to="/profile">Profile</Link></li>
        <li><a>Settings</a></li>
        <li><a className="text-red-500">Logout</a></li>
      </ul>
    </div>

  </div>
)}
  </div>
</div></div>
  )
}

export default Navbar