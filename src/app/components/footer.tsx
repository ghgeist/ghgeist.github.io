import React from "react";
import { Linkedin, Github, FileText, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const links = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/grantgeist/",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/ghgeist",
      icon: Github,
    },
    {
      name: "Resume",
      href: "https://docs.google.com/document/d/1H958fZBZwTCiWn7EyDVnV2KLZfgmZ9fYqpzZC6tAbGM/edit?usp=sharing",
      icon: FileText,
    },
    {
      name: "Email",
      href: "mailto:granthgeist@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-[#0B0E14] text-white border-t border-white/5">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Copyright */}
          <p className="text-sm text-gray-500">
            © {year} Grant Geist. All rights reserved.
          </p>

          {/* Right: Social Links */}
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.name}
                className="group relative flex flex-col items-center justify-center outline-none"
              >
                {/* Tooltip */}
                <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#151921] px-2 py-1 text-[11px] font-medium text-gray-200 border border-white/10 opacity-0 translate-y-2 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0">
                  {link.name}
                </span>

                {/* Icon */}
                <link.icon 
                  size={18} 
                  className="text-gray-500 transition-colors duration-200 group-hover:text-[#0066cc] group-focus:text-[#0066cc]" 
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
