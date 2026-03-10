import { useEffect, useState, type MouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { prefersReducedMotion } from "./prefersReducedMotion";

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
    { name: "Selected Work", to: "/#page-top", variant: "link" },
    { name: "Approach", to: "/#skills", variant: "link" },
    { name: "About", to: "/about", variant: "link" },
    { name: "Work with me", to: "/#work-with-me", variant: "cta" },
  ];

  const handleNavLinkClick = (event: MouseEvent<HTMLAnchorElement>, to: string) => {
    setIsMobileMenuOpen(false);

    const isModifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    if (isModifiedClick) {
      return;
    }

    const [targetPathname, targetHash = ""] = to.split("#");
    const normalizedTargetPathname = targetPathname.length > 0 ? targetPathname : "/";

    if (normalizedTargetPathname !== window.location.pathname || targetHash.length === 0) {
      return;
    }

    event.preventDefault();
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

    if (targetHash === "page-top") {
      window.scrollTo({ top: 0, left: 0, behavior });
      return;
    }

    const target = document.getElementById(targetHash);
    if (target) {
      target.scrollIntoView({ block: "start", behavior });
    }
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
          onClick={(event) => handleNavLinkClick(event, "/#page-top")}
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
                onClick={(event) => handleNavLinkClick(event, link.to)}
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
                onClick={(event) => handleNavLinkClick(event, link.to)}
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
