import React from 'react'
import {
  Search,
  Users,
  Zap,
  ShieldCheck,
  Globe,
  TrendingUp,
  Star,
  Quote,
} from "lucide-react";

export default function WhyUs() {

    const features = [
    {
      title: "Smart Job Matching",
      desc: "Our AI-powered algorithm matches you with jobs that fit your skills and preferences perfectly.",
      icon: <Search className="w-6 h-6 text-white" />,
      bg: "bg-blue-500",
    },
    {
      title: "Direct Communication",
      desc: "Connect directly with hiring managers and recruiters. No middlemen, faster responses.",
      icon: <Users className="w-6 h-6 text-white" />,
      bg: "bg-purple-500",
    },
    {
      title: "Instant Applications",
      desc: "Apply to multiple jobs with one click using your saved profile. Save time, get noticed.",
      icon: <Zap className="w-6 h-6 text-white" />,
      bg: "bg-orange-500",
    },
    {
      title: "Verified Companies",
      desc: "Every company on our platform is verified to ensure legitimate and quality opportunities.",
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      bg: "bg-emerald-500",
    },
    {
      title: "Remote & Global",
      desc: "Find remote opportunities worldwide or local jobs in your area. Work from anywhere.",
      icon: <Globe className="w-6 h-6 text-white" />,
      bg: "bg-pink-500",
    },
    {
      title: "Career Growth",
      desc: "Access resources, salary insights, and career advice to accelerate your professional growth.",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      bg: "bg-indigo-500",
    },
  ];

    return (
        <section className="bg-gradient-to-b from-white to-blue-50 py-24 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  Why Choose Us
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  Why Choose <span className="text-blue-600">JobNest?</span>
                </h2>
                <p className="mt-6 text-lg text-gray-600">
                  We’re more than just a job board. We’re your career partner,
                  helping you find opportunities that align with your goals and
                  values.
                </p>
              </div>
    
              {/* Cards */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition"
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-xl ${item.bg}`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
  )
}
