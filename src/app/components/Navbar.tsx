import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Case Studies", href: "#page-top", variant: "link" },      // top = evidence tiles for now
    { name: "Approach", href: "#skills", variant: "link" },    // if Skills stays; otherwise point to your Design Language section
    { name: "About", href: "#about", variant: "link" },
    { name: "Work with me", href: "#work-with-me", variant: "cta" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
           window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
      return;
    }

    const element = document.querySelector(href) as HTMLElement | null;
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.scrollY - 96; // tweak 96 to your nav height
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      className={twMerge(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled 
          ? 'bg-[#0B0E14]/90 backdrop-blur-md border-white/10 py-4' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#page-top"
          className="text-xl font-bold tracking-tight text-white hover:text-[#0066cc] transition-colors"
          onClick={(e) => handleScrollTo(e, '#page-top')}
        >
          GRANT GEIST
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isCta = link.variant === "cta";
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={twMerge(
                  "text-xs font-medium uppercase tracking-[0.15em] transition-colors",
                  isCta
                    ? "text-white/90 hover:text-white border border-white/15 hover:border-white/30 rounded-md px-3.5 py-1.5"
                    : "text-gray-400 hover:text-[#0066cc]"
                )}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0B0E14] border-b border-gray-800 p-4 flex flex-col space-y-4 shadow-xl">
          {navLinks.map((link) => {
            const isCta = link.variant === "cta";
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={twMerge(
                  "font-medium uppercase tracking-wider transition-colors",
                  isCta
                    ? "text-white/90 hover:text-white border border-white/15 hover:border-white/30 rounded-md px-3 py-2"
                    : "text-gray-400 hover:text-[#0066cc]"
                )}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
