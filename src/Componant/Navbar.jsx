import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../utils/constant";
import { removeUser } from "../utils/userslice";

const NAV_LINKS = [
  { to: "/feed", label: "Feed" },
  { to: "/connection", label: "Connections" },
  { to: "/request", label: "Requests" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const dropdownRef = useRef(null);

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-white text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-black">
            D
          </span>
          DevConnect
        </Link>

        {user && (
          <>
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-150"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 bg-indigo-900 flex items-center justify-center">
                  {!imgFailed && user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={initials}
                      className="w-full h-full object-cover"
                      onError={() => setImgFailed(true)}
                    />
                  ) : (
                    <span className="text-xs font-bold text-indigo-300">
                      {initials}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-300 font-medium hidden sm:block">
                  {user.firstName}
                </span>

                <svg
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-sm font-semibold text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {user.email || "Developer"}
                    </p>
                  </div>

                  <div className="p-1.5 flex flex-col gap-0.5">
                    <DropdownLink
                      to="/profile"
                      onClick={() => setOpen(false)}
                      icon="👤"
                    >
                      Profile
                    </DropdownLink>
                    <DropdownLink
                      to="/connection"
                      onClick={() => setOpen(false)}
                      icon="🔗"
                    >
                      Connections
                    </DropdownLink>
                    <DropdownLink
                      to="/request"
                      onClick={() => setOpen(false)}
                      icon="📬"
                    >
                      Requests
                    </DropdownLink>
                  </div>

                  <div className="p-1.5 border-t border-gray-800">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors duration-150"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {user && (
        <div className="md:hidden flex border-t border-gray-800 bg-gray-950">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex-1 py-2.5 text-center text-xs font-medium transition-colors ${
                  active
                    ? "text-indigo-400 border-t-2 border-indigo-500 -mt-px"
                    : "text-gray-500"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

const DropdownLink = ({ to, onClick, icon, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150"
  >
    <span>{icon}</span>
    {children}
  </Link>
);

export default Navbar;
