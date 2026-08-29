import {
  Contact,
  Globe,
  Linkedin,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

/**
 * Action rows with a shared leading-icon column (Material / Primer list
 * pattern). Labels share one x-position; primary differs by color only.
 */
const actionLinkClass =
  "grid min-h-14 w-full grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-3 rounded-md px-5 text-left font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151921]";

const primaryActionClass = `${actionLinkClass} bg-[#0066cc] text-white hover:bg-[#0052a3]`;

const secondaryActionClass = `${actionLinkClass} border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10`;

function CardAction({
  href,
  icon: Icon,
  children,
  variant,
  external = false,
  type,
}: {
  href: string;
  icon: LucideIcon;
  children: ReactNode;
  variant: "primary" | "secondary";
  external?: boolean;
  type?: string;
}) {
  const iconClass =
    variant === "primary"
      ? "h-5 w-5"
      : "h-5 w-5 text-[#0066cc]";

  return (
    <a
      href={href}
      type={type}
      className={
        variant === "primary" ? primaryActionClass : secondaryActionClass
      }
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <Icon className={iconClass} aria-hidden="true" />
      <span className="min-w-0">{children}</span>
    </a>
  );
}

export function BusinessCard() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#0B0E14] px-6 py-12">
      <div className="w-full max-w-md rounded-lg border border-white/5 bg-[#151921] p-6 text-center">
        <img
          src="/assets/headshot.jpg"
          alt="Grant Geist"
          width={80}
          height={80}
          className="mx-auto mb-5 h-20 w-20 rounded-full object-cover object-center ring-1 ring-white/10"
        />
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Grant Geist
        </h1>
        <p className="mt-2 text-base text-gray-400">Tech Strategy and AI Adoption</p>

        <div className="mx-auto mt-8 flex w-full max-w-xs flex-col gap-3">
          <CardAction
            href="/grant_geist.vcf"
            type="text/vcard"
            icon={Contact}
            variant="primary"
          >
            Save Contact
          </CardAction>

          <CardAction
            href="https://www.linkedin.com/in/grantgeist/"
            icon={Linkedin}
            variant="secondary"
            external
          >
            LinkedIn
          </CardAction>

          <CardAction
            href="https://grantgeist.com"
            icon={Globe}
            variant="secondary"
          >
            Website
          </CardAction>

          <CardAction
            href="tel:+17865394140"
            icon={Phone}
            variant="secondary"
          >
            <span className="flex flex-col">
              <span>Call</span>
              <span className="text-sm font-normal text-gray-400">
                +1 786-539-4140
              </span>
            </span>
          </CardAction>

          <CardAction
            href="mailto:hello@grantgeist.com"
            icon={Mail}
            variant="secondary"
          >
            <span className="flex flex-col">
              <span>Email</span>
              <span className="text-sm font-normal text-gray-400">
                hello@grantgeist.com
              </span>
            </span>
          </CardAction>
        </div>
      </div>
    </main>
  );
}
