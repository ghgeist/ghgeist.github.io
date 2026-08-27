export const CLOUDFLARE_WEB_ANALYTICS_BEACON_SRC: string;
export const CLOUDFLARE_WEB_ANALYTICS_TOKEN: string;
export function cloudflareWebAnalyticsSnippet(): string;
export function assertCloudflareWebAnalyticsInHtml(
  html: string,
  context: string
): void;
