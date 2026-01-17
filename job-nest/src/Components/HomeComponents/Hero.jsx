import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* subtle dots background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#cfe8ff_1px,transparent_0)] [background-size:40px_40px] opacity-40"></div>

      <div
        ref={heroRef}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
          🏆 #1 Job Platform for Professionals
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Find Your <span className="text-blue-600">Dream Career</span>
        </h1>
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-500 mt-2">
          Today
        </h2>
        <div className="flex justify-center mt-4">
          <div className="h-1 w-32 rounded-full bg-gradient-to-r from-blue-600 to-orange-400"></div>
        </div>
        <p className="mt-8 text-lg text-gray-600 max-w-3xl mx-auto">
          Connect with top companies and discover opportunities that match your
          skills. Join millions of professionals building their careers with
          JobNest.
        </p>
        <div className="mt-10">
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-4 rounded-xl shadow-lg transition">
            Explore Jobs →
          </button>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-3xl font-bold text-blue-600">10M+</h3>
            <p className="mt-2 text-gray-600">Active Job Seekers</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-3xl font-bold text-blue-600">500K+</h3>
            <p className="mt-2 text-gray-600">Partner Companies</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-3xl font-bold text-blue-600">2M+</h3>
            <p className="mt-2 text-gray-600">Jobs Filled</p>
          </div>
        </div>
      </div>
    </section>
  );
}
