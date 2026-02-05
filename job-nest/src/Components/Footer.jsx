import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-slate-600 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-8 border-b border-slate-200">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 text-xl font-extrabold tracking-tight">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm">
                JN
              </div>
              JOB<span className="text-blue-600">NEST</span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Connecting top talent with innovative companies. Your next career
              move starts here.
            </p>

            <div className="flex gap-3">
              <SocialIcon icon={<FaLinkedin />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaFacebook />} />
              <SocialIcon icon={<FaInstagram />} />
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* <FooterLinkGroup
              title="For Candidates"
              links={["Browse Jobs", "Career Advice", "Resume Builder", "Job Alerts"]}
            /> */}
            {/* <FooterLinkGroup
              title="For Employers"
              links={["Post a Job", "Talent Pool", "Pricing Plans", "Hiring Solutions"]}
            /> */}
            <FooterLinkGroup
              title="Company"
              links={["About Us", "Contact", "Privacy Policy", "Terms of Service"]}
            />
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-500">
          <ContactItem icon={<FaEnvelope />} text="support@jobnest.com" />
          <ContactItem icon={<FaPhoneAlt />} text="+1 (555) 000-1234" />
          <ContactItem icon={<FaMapMarkerAlt />} text="San Francisco, CA" />
        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <p>© 2026 JobNest Inc. All rights reserved.</p>
          {/* <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600 transition">
              Cookies
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Security
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Sitemap
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

/* Helper Components */

const FooterLinkGroup = ({ title, links }) => (
  <div className="space-y-3">
    <h4 className="text-slate-900 font-semibold">{title}</h4>
    <ul className="space-y-1 text-sm">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center
    text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
  >
    {icon}
  </a>
);

const ContactItem = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600">
      {icon}
    </div>
    <span>{text}</span>
  </div>
);

export default Footer;
