import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert, MapPin, Lock, Crown } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface HeaderProps {
  onOpenAdminLoginModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdminLoginModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdminLoggedIn } = useAdminAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Bangalore', path: '/bangalore/' },
    { name: 'Areas', path: '/bangalore/#areas' },
    { name: 'Profiles', path: '/bangalore/#profiles' },
    { name: 'About', path: '/about/' },
    { name: 'Safety', path: '/safety/' },
    { name: 'Contact', path: '/contact/' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path.replace('#areas', '').replace('#profiles', ''))) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top 18+ Alert Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 flex justify-between items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">18+</span>
            <span>Bangalore Call Girls & Escort Service Directory</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={12} className="text-rose-400" /> Bangalore, KA</span>
            <Link to="/safety/" className="hover:text-rose-400 transition-colors flex items-center gap-1">
              <ShieldAlert size={12} /> Safety Policy
            </Link>
            
            {/* Admin Login Trigger */}
            <button
              onClick={onOpenAdminLoginModal}
              className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Lock size={12} className="text-amber-400" />
              <span>{isAdminLoggedIn ? 'Admin Panel' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Custom Crown Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25 group-hover:scale-105 transition-all">
            <Crown size={22} className="text-amber-200 fill-amber-200/30" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
              Bangalore <span className="text-rose-600">Call Girls & Escorts</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase -mt-0.5">
              Verified 18+ Escort Directory
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'text-rose-600 bg-rose-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm"
          >
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-rose-600 bg-rose-50 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdminLoginModal) onOpenAdminLoginModal();
              }}
              className="w-full bg-slate-900 text-amber-400 font-semibold py-2.5 rounded-xl text-center flex items-center justify-center gap-2 text-xs"
            >
              <Lock size={14} />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
