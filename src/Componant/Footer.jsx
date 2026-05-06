import React from "react";
import { Link } from "react-router-dom";
import { github, linkdin } from "../utils/constant";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold text-white">DevConnect</h2>
          <p className="mt-2 text-sm text-gray-400">
            Connect. Build. Grow with developers worldwide.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-white">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={github} className="hover:text-white">
                GitHub
              </Link>
            </li>
            <li>
              <Link to={linkdin} className="hover:text-white">
                Linkdin
              </Link>
            </li>
            <li>
              <Link to={github} className="hover:text-white">
                Twitter
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-700 text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} DevConnect. Built by Om Gupta , All rights
        are Reserved
      </div>
    </footer>
  );
}

export default Footer;
