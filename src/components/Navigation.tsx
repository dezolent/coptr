import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/music', label: 'Music' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/press-kit', label: 'Press Kit' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#70ffdf]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img
              src="/coptr-black-circle-logo.png"
              alt="Coptr Logo"
              className="h-12 w-12 mr-3 brightness-0 invert"
            />
            <img
              src="/coptr-white-text-logo.png"
              alt="Coptr"
              className="h-8"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wider transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-[#70ffdf] border-b-2 border-[#70ffdf]'
                    : 'text-gray-300 hover:text-[#70ffdf]'
                } pb-1`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/98 border-t border-[#70ffdf]/20">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium tracking-wider transition-all ${
                  isActive(item.path)
                    ? 'bg-[#70ffdf]/10 text-[#70ffdf]'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
