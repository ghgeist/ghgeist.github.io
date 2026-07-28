import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, getRouteMeta } from "@/app/content/routeMetadata";

const MANAGED_META_ATTR = "data-managed-meta";

function setMetaDescription(content: string) {
  let description = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]'
  );

  if (!description) {
    description = document.createElement("meta");
    description.setAttribute("name", "description");
    document.head.appendChild(description);
  }

  description.setAttribute("content", content);
}

function clearManagedMeta() {
  document
    .querySelectorAll(`[${MANAGED_META_ATTR}]`)
    .forEach((node) => node.remove());
}

function appendManagedMeta(el: HTMLElement) {
  el.setAttribute(MANAGED_META_ATTR, "");
  document.head.appendChild(el);
}

function applyRouteMeta(pathname: string) {
  const meta = getRouteMeta(pathname);
  const pageUrl = absoluteUrl(pathname);

  document.title = meta.title;
  setMetaDescription(meta.description);

  clearManagedMeta();

  if (meta.robots) {
    const robots = document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", meta.robots);
    appendManagedMeta(robots);
  }

  const link = document.createElement("link");
  link.setAttribute("rel", "canonical");
  link.setAttribute("href", pageUrl);
  appendManagedMeta(link);

  const ogTags: Array<[string, string]> = [
    ["og:title", meta.title],
    ["og:description", meta.description],
    ["og:image", meta.ogImage],
    ["og:url", pageUrl],
    ["og:type", meta.ogType],
  ];

  for (const [property, content] of ogTags) {
    const el = document.createElement("meta");
    el.setAttribute("property", property);
    el.setAttribute("content", content);
    appendManagedMeta(el);
  }

  const twitterTags: Array<[string, string]> = [
    ["twitter:card", "summary_large_image"],
    ["twitter:title", meta.title],
    ["twitter:description", meta.description],
    ["twitter:image", meta.ogImage],
  ];

  for (const [name, content] of twitterTags) {
    const el = document.createElement("meta");
    el.setAttribute("name", name);
    el.setAttribute("content", content);
    appendManagedMeta(el);
  }

  const graph = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
  for (const node of graph) {
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(node);
    appendManagedMeta(script);
  }
}

/** Syncs document title, description, OG/Twitter tags, canonical, and JSON-LD to the active route. */
export function DocumentMeta() {
  const location = useLocation();

  useEffect(() => {
    applyRouteMeta(location.pathname);
  }, [location.pathname]);

  return null;
}
