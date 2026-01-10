import React from 'react';
import { 
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram, 
  FaRocket, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TOP SECTION: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b border-slate-800">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white text-2xl font-black italic tracking-tighter">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center not-italic">
                JN
              </div>
              JOB<span className="text-blue-500">NEST</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Connecting the world's best talent with the most innovative companies. Your next career move starts here.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<FaLinkedin />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaFacebook />} />
              <SocialIcon icon={<FaInstagram />} />
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterLinkGroup title="For Candidates" links={['Browse Jobs', 'Career Advice', 'Resume Builder', 'Job Alerts']} />
            <FooterLinkGroup title="For Employers" links={['Post a Job', 'Talent Pool', 'Pricing Plans', 'Hiring Solutions']} />
            <FooterLinkGroup title="Company" links={['About Us', 'Contact', 'Privacy Policy', 'Terms of Service']} />
          </div>
        </div>

        {/* MIDDLE SECTION: CONTACT INFO */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-500">
              <FaEnvelope />
            </div>
            <span>support@jobnest.com</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-500">
              <FaPhoneAlt />
            </div>
            <span>+1 (555) 000-1234</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-500">
              <FaMapMarkerAlt />
            </div>
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest text-slate-500">
          <p>© 2026 JobFlow Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Cookies</a>
            <a href="#" className="hover:text-white transition">Security</a>
            <a href="#" className="hover:text-white transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const FooterLinkGroup = ({ title, links }) => (
  <div className="space-y-4">
    <h4 className="text-white font-bold tracking-tight">{title}</h4>
    <ul className="space-y-2 text-sm">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="hover:text-blue-500 hover:translate-x-1 inline-block transition-all duration-200">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg">
    {icon}
  </a>
);

export default Footer;