import React from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl px-10 py-20 text-center shadow-2xl"
        >
          {/* Decorative blur */}
          <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />

          {/* Content */}
          <h2 className="relative text-4xl md:text-5xl font-extrabold text-white tracking-wide">
            READY TO START YOUR JOURNEY
          </h2>

          <p className="relative mt-6 text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join millions of professionals who found their dream jobs through
            JobNest. Your next opportunity is just a click away.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-12"
          >
            <button
              className="bg-white text-blue-700 font-semibold text-lg px-12 py-4 rounded-xl
              transition-all duration-300
              hover:bg-blue-900 hover:text-white
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
            >
              Get Started Now
            </button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
