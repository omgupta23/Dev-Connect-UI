import { Link } from "react-router-dom";
import { github, linkdin } from "../utils/constant";

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-10">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-white font-bold text-lg">
            Dev<span className="text-emerald-400">Connect</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-xs">
            A platform for developers to connect, collaborate, and grow
            together.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-3">
              Pages
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-emerald-400 transition"
                >
                  SignUp
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-3">
              Socials
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={linkdin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 px-6 py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} DevConnect — Built by{" "}
        <span className="text-gray-400">Om Gupta</span>
      </div>
    </footer>
  );
}

export default Footer;
