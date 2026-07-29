import { siteIndexLinks } from "@/app/content/siteIndexLinks";

/**
 * Absolute first-hop links kept first in DOM source order for fetch-only
 * extractors. Excluded from human navigation and assistive technology.
 */
export function SiteIndexNav() {
  return (
    <div hidden data-agent-site-index>
      <ul>
        {siteIndexLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} tabIndex={-1}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
