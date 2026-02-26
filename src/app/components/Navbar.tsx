import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

type NavLink = {
  name: string;
  to: string;
  variant: "link" | "cta";
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = "primary-navigation-menu";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const navLinks: NavLink[] = [
    { name: "Case Studies", to: "/#page-top", variant: "link" },
    { name: "Approach", to: "/#skills", variant: "link" },
    { name: "About", to: "/about", variant: "link" },
    { name: "Work with me", to: "/#work-with-me", variant: "cta" },
  ];

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      aria-label="Primary"
      data-site-navbar
      className={twMerge(
        "fixed left-0 right-0 top-0 z-50 border-b border-transparent transition-all duration-300",
        isScrolled
          ? "bg-[#0B0E14]/90 py-4 backdrop-blur-md border-white/10"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          to="/#page-top"
          className="text-xl font-bold tracking-tight text-white transition-colors hover:text-[#0066cc]"
          onClick={handleNavLinkClick}
        >
          GRANT GEIST
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => {
            const isCta = link.variant === "cta";
            return (
              <Link
                key={link.name}
                to={link.to}
                onClick={handleNavLinkClick}
                className={twMerge(
                  "text-xs font-medium uppercase tracking-[0.12em] transition-colors",
                  isCta
                    ? "inline-flex h-10 items-center rounded-md border border-white/20 bg-white/5 px-5 text-sm tracking-[0.08em] text-white/95 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    : "text-gray-300 hover:text-[#0066cc]"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-controls={mobileMenuId}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="p-2 text-gray-300 hover:text-white md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id={mobileMenuId}
          className="absolute left-0 right-0 top-full flex flex-col gap-3 border-b border-white/10 bg-[#0B0E14] p-5 shadow-xl md:hidden"
        >
          {navLinks.map((link) => {
            const isCta = link.variant === "cta";
            return (
              <Link
                key={link.name}
                to={link.to}
                onClick={handleNavLinkClick}
                className={twMerge(
                  "text-xs font-medium uppercase tracking-[0.12em] transition-colors",
                  isCta
                    ? "inline-flex h-10 items-center rounded-md border border-white/20 bg-white/5 px-5 text-sm tracking-[0.08em] text-white/95 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    : "text-gray-300 hover:text-[#0066cc]"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
