import { Contact, Globe, Linkedin, Mail } from "lucide-react";

const actionLinkClass =
  "inline-flex min-h-14 w-full items-center gap-3 rounded-md px-4 text-left font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151921]";

const secondaryActionClass = `${actionLinkClass} border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10`;

export function BusinessCard() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#0B0E14] px-6 py-12">
      <div className="w-full max-w-md rounded-lg border border-white/5 bg-[#151921] p-6">
        <img
          src="/assets/headshot.jpg"
          alt="Grant Geist"
          width={80}
          height={80}
          className="mb-5 h-20 w-20 rounded-full object-cover object-center ring-1 ring-white/10"
        />
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Grant Geist
        </h1>
        <p className="mt-2 text-base text-gray-400">Tech Strategy and AI Consulting</p>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="/grant_geist.vcf"
            type="text/vcard"
            className={`${actionLinkClass} justify-center bg-[#0066cc] text-white hover:bg-[#0052a3]`}
          >
            <Contact className="h-5 w-5 shrink-0" aria-hidden="true" />
            Save Contact
          </a>

          <a href="mailto:hello@grantgeist.com" className={secondaryActionClass}>
            <Mail className="h-5 w-5 shrink-0 text-[#0066cc]" aria-hidden="true" />
            <span className="flex min-w-0 flex-col">
              <span>Email</span>
              <span className="break-all text-sm font-normal text-gray-400">
                hello@grantgeist.com
              </span>
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/grantgeist/"
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryActionClass}
          >
            <Linkedin className="h-5 w-5 shrink-0 text-[#0066cc]" aria-hidden="true" />
            LinkedIn
          </a>

          <a href="https://grantgeist.com" className={secondaryActionClass}>
            <Globe className="h-5 w-5 shrink-0 text-[#0066cc]" aria-hidden="true" />
            Website
          </a>
        </div>
      </div>
    </main>
  );
}
