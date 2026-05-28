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
  { to: "/premium", label: "Go Premium" },
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
    <nav className="sticky top-0 z-50 w-full bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold text-white text-base tracking-tight hover:opacity-90 transition-opacity flex-shrink-0"
        >
          <span className="w-7 h-7 bg-lime-400 flex items-center justify-center text-zinc-950 font-black text-sm rounded-md rotate-3 hover:rotate-0 transition-transform duration-200">
            D
          </span>
          <span className="text-zinc-100 font-semibold tracking-tight">
            Dev<span className="text-lime-400">Connect</span>
          </span>
        </Link>

        {user && (
          <>
            <div className="hidden md:flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
              {NAV_LINKS.map(({ to, label }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`px-4 py-1.5 rounded-md text-xs font-medium tracking-wide uppercase transition-all duration-150 ${
                      active
                        ? "bg-lime-400 text-zinc-950 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800"
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
                className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl border transition-all duration-150 ${
                  open
                    ? "bg-zinc-800 border-lime-400/30"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                }`}
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  {!imgFailed && user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={initials}
                      className="w-full h-full object-cover"
                      onError={() => setImgFailed(true)}
                    />
                  ) : (
                    <span className="text-xs font-bold text-lime-400">
                      {initials}
                    </span>
                  )}
                </div>

                <span className="text-xs text-zinc-300 font-medium hidden sm:block tracking-wide">
                  {user.firstName}
                </span>

                <svg
                  className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180 text-lime-400" : ""}`}
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
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                      {!imgFailed && user.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          alt={initials}
                          className="w-full h-full object-cover"
                          onError={() => setImgFailed(true)}
                        />
                      ) : (
                        <span className="text-xs font-bold text-lime-400">
                          {initials}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-100 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-zinc-600 truncate">
                        {user.email || "developer"}
                      </p>
                    </div>
                  </div>

                  <div className="p-1.5 flex flex-col gap-0.5">
                    <DropdownLink to="/profile" onClick={() => setOpen(false)}>
                      <ProfileIcon /> Profile
                    </DropdownLink>
                    <DropdownLink
                      to="/connection"
                      onClick={() => setOpen(false)}
                    >
                      <ConnectionIcon /> Connections
                    </DropdownLink>
                    <DropdownLink to="/request" onClick={() => setOpen(false)}>
                      <RequestIcon /> Requests
                    </DropdownLink>
                  </div>

                  <div className="p-1.5 border-t border-zinc-800">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-950/40 hover:text-red-400 transition-colors duration-150 uppercase tracking-wide"
                    >
                      <LogoutIcon /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {user && (
        <div className="md:hidden flex border-t border-zinc-800 bg-zinc-950">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex-1 py-2.5 text-center text-xs font-medium uppercase tracking-widest transition-colors ${
                  active
                    ? "text-lime-400 border-t-2 border-lime-400 -mt-px"
                    : "text-zinc-600 hover:text-zinc-400"
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

const DropdownLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-lime-400 transition-colors duration-150 uppercase tracking-wide"
  >
    {children}
  </Link>
);

const ProfileIcon = () => (
  <svg
    className="w-3.5 h-3.5 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const ConnectionIcon = () => (
  <svg
    className="w-3.5 h-3.5 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3M8 11c-1.66 0-3-1.34-3-3s1.34-3 3-3M20 19c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4" />
  </svg>
);

const RequestIcon = () => (
  <svg
    className="w-3.5 h-3.5 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-3.5 h-3.5 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
    <path d="M9 20H5a2 2 0 01-2-2V6a2 2 0 012-2h4" />
  </svg>
);

export default Navbar;
