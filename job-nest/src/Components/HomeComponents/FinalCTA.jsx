import React from "react";

export default function FinalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-blue-600 rounded-3xl px-10 py-20 text-center shadow-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            READY TO START YOUR JOURNEY
          </h2>
          <p className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto">
            Join millions of professionals who found their dream jobs through
            JobNest. Your next opportunity is just a click away.
          </p>
          <div className="mt-10">
            <button className="bg-white text-blue-600 font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-300 hover:bg-blue-700 hover:text-white">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
