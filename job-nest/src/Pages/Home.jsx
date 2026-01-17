import React from "react";
import Hero from "../Components/HomeComponents/hero";
import WhyUs from "../Components/HomeComponents/WhyUs";
import Testimonials from "../Components/HomeComponents/Testimonials";
import FinalCTA from "../Components/HomeComponents/FinalCTA";
import { useSelector } from "react-redux";
import LoggedHero from "../Components/HomeComponents/LoggedHero";

export default function HeroSection() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser ? (
        <div>
          <LoggedHero />
        </div>
      ) : (
        <div>
          <Hero />
          <WhyUs />
          <Testimonials />
          <FinalCTA />
        </div>
      )}
    </>
  );
}
