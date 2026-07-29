import { siteIndexLinks } from "@/app/content/siteIndexLinks";

/**
 * Absolute first-hop links kept first in DOM source order for fetch-only
 * extractors. Visually hidden so human UX is unchanged.
 */
export function SiteIndexNav() {
  return (
    <nav aria-label="Site pages" className="sr-only">
      <ul>
        {siteIndexLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
