import React from "react";
import Hero from "../Components/HomeComponents/hero";
import WhyUs from "../Components/HomeComponents/WhyUs";
import Testimonials from "../Components/HomeComponents/Testimonials";
import FinalCTA from "../Components/HomeComponents/FinalCTA";

export default function HeroSection() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
