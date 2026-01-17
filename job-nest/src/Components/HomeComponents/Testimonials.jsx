import React from "react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      text: "JobNest helped me land my dream job within just 3 weeks. The AI matching is incredibly accurate!",
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Microsoft",
      text: "The direct communication feature saved me so much time. I was able to connect with hiring managers directly.",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer at Airbnb",
      text: "Best job platform I've ever used. The interface is beautiful and the job recommendations are spot on.",
    },
    {
      name: "David Miller",
      role: "Data Analyst at Amazon",
      text: "I received interview calls within days. JobNest’s verified companies feature gave me confidence.",
    },
    {
      name: "Ayesha Khan",
      role: "Frontend Developer at Spotify",
      text: "Remote opportunities are amazing. I found a global role that perfectly matches my skills.",
    },
    {
      name: "Ahmed Ali",
      role: "DevOps Engineer at Netflix",
      text: "Clean UI, fast applications, and real companies. This platform genuinely helps professionals grow.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            What Our Users <span className="text-blue-600">Say</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Join thousands of professionals who have transformed their careers
            with JobNest.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition flex flex-col justify-between"
            >
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400" />
                ))}
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                “{item.text}”
              </p>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
