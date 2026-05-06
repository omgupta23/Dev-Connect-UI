import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-indigo-400">DevConnect</h1>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
          >
            Signup
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Connect With
            <span className="text-indigo-400"> Developers</span>
            <br />
            Around The World
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Discover developers, build connections, collaborate on projects, and
            grow your tech network.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition text-lg font-semibold"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl border border-gray-700 hover:border-gray-500 hover:bg-gray-900 transition text-lg font-semibold"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-indigo-500 transition">
            <div className="text-5xl">🤝</div>

            <h2 className="mt-6 text-2xl font-bold">Smart Connections</h2>

            <p className="mt-4 text-gray-400">
              Connect with developers who match your interests and skills.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-indigo-500 transition">
            <div className="text-5xl">💻</div>

            <h2 className="mt-6 text-2xl font-bold">Showcase Skills</h2>

            <p className="mt-4 text-gray-400">
              Create your developer profile and highlight your technologies.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-indigo-500 transition">
            <div className="text-5xl">🚀</div>

            <h2 className="mt-6 text-2xl font-bold">Collaborate</h2>

            <p className="mt-4 text-gray-400">
              Find teammates for hackathons, startups, and side projects.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {
              number: "12K+",
              label: "Developers",
            },
            {
              number: "5K+",
              label: "Connections",
            },
            {
              number: "120+",
              label: "Skills",
            },
            {
              number: "24/7",
              label: "Networking",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center"
            >
              <h2 className="text-3xl font-black text-indigo-400">
                {item.number}
              </h2>

              <p className="mt-2 text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
