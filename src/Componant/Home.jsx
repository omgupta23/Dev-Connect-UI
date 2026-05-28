import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-950 border-b border-gray-800">
        <span className="text-lg font-bold tracking-tight">DevConnect</span>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <span className="text-xs uppercase tracking-widest text-emerald-400 mb-4">
          For developers, by developers
        </span>
        <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight max-w-3xl">
          Meet developers <br />
          <span className="text-emerald-400">worth knowing.</span>
        </h1>
        <p className="mt-6 text-gray-400 text-base max-w-sm leading-relaxed">
          Real connections with real developers. No noise, no algorithm — just
          people building things.
        </p>
        <div className="mt-10 flex gap-3">
          <Link
            to="/signup"
            className="px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition"
          >
            Join for free
          </Link>
          <Link
            to="/login"
            className="px-7 py-3 rounded-xl border border-gray-800 hover:border-gray-600 text-gray-300 hover:text-white transition"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 pb-24 max-w-4xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: "🤝",
              title: "Real connections",
              desc: "No follower counts or clout. Just meaningful devs worth talking to.",
            },
            {
              icon: "🛠️",
              title: "Skill-based matching",
              desc: "Find people who work in your stack or the one you're learning.",
            },
            {
              icon: "🚀",
              title: "Build together",
              desc: "Find a co-founder, a teammate, or someone to review your code.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/40 hover:bg-gray-950 transition"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 font-semibold text-white text-base">
                {f.title}
              </h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
