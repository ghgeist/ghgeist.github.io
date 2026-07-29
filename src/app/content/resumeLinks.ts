/** Google Docs resume — single source for human share + LLM plain-text export. */
export const RESUME_GOOGLE_DOC_ID =
  "1H958fZBZwTCiWn7EyDVnV2KLZfgmZ9fYqpzZC6tAbGM" as const;

const resumeDocBase = `https://docs.google.com/document/d/${RESUME_GOOGLE_DOC_ID}`;

/** Formatted Doc for humans (footer). */
export const resumeShareHref = `${resumeDocBase}/edit?usp=sharing` as const;

/** Plain-text export for agents (llms.txt Elsewhere). */
export const resumePlainTextExportHref =
  `${resumeDocBase}/export?format=txt` as const;
