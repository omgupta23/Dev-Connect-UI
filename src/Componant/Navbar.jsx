import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../utils/constant";
import { removeUser } from "../utils/userslice";

const NAV_LINKS = [
  { to: "/feed", label: "Feed" },
  { to: "/connection", label: "Connections" },
  { to: "/request", label: "Requests" },
  { to: "/premium", label: "Premium" },
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
    <nav className="sticky top-0 z-50 w-full bg-gray-950 border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-lg tracking-tight">
          Dev<span className="text-emerald-400">Connect</span>
        </Link>

        {/* Nav links - desktop */}
        {user && (
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Avatar dropdown */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-600 transition"
            >
              {/* Avatar */}
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                {!imgFailed && user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={initials}
                    className="w-full h-full object-cover"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  <span className="text-xs font-bold text-emerald-400">
                    {initials}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-300 hidden sm:block">
                {user.firstName}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-52 bg-gray-950 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-sm font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  {user?.isPremium && (
                    <span className="inline-block mt-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      ✦ Premium
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="p-1.5 flex flex-col">
                  {[
                    { to: "/profile", label: "Profile" },
                    { to: "/connection", label: "Connections" },
                    { to: "/request", label: "Requests" },
                  ].map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
                    >
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Logout */}
                <div className="p-1.5 border-t border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile bottom nav */}
      {user && (
        <div className="md:hidden flex border-t border-gray-800">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex-1 py-2.5 text-center text-xs font-medium transition-colors ${
                  active
                    ? "text-emerald-400 border-t-2 border-emerald-400 -mt-px"
                    : "text-gray-600 hover:text-gray-400"
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

export default Navbar;
