import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Case Studies", href: "#page-top", variant: "link" },
    { name: "Approach", href: "#skills", variant: "link" },
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

    const y = element.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      className={twMerge(
        "fixed left-0 right-0 top-0 z-50 border-b border-transparent transition-all duration-300",
        isScrolled
          ? "bg-[#0B0E14]/90 py-4 backdrop-blur-md border-white/10"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <a
          href="#page-top"
          className="text-xl font-bold tracking-tight text-white transition-colors hover:text-[#0066cc]"
          onClick={(e) => handleScrollTo(e, "#page-top")}
        >
          GRANT GEIST
        </a>

        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => {
            const isCta = link.variant === "cta";
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={twMerge(
                  "text-xs font-medium uppercase tracking-[0.12em] transition-colors",
                  isCta
                    ? "inline-flex h-10 items-center rounded-md border border-white/20 bg-white/5 px-5 text-sm tracking-[0.08em] text-white/95 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    : "text-gray-300 hover:text-[#0066cc]"
                )}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        <button
          className="p-2 text-gray-300 hover:text-white md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-3 border-b border-white/10 bg-[#0B0E14] p-5 shadow-xl md:hidden">
          {navLinks.map((link) => {
            const isCta = link.variant === "cta";
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={twMerge(
                  "text-xs font-medium uppercase tracking-[0.12em] transition-colors",
                  isCta
                    ? "inline-flex h-10 items-center rounded-md border border-white/20 bg-white/5 px-5 text-sm tracking-[0.08em] text-white/95 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    : "text-gray-300 hover:text-[#0066cc]"
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
