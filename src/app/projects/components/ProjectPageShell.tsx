import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/app/components/ui/utils";

export type ProjectThemeName = "walkability" | "replacement" | "bantr";

type ProjectPageShellProps = {
  theme: ProjectThemeName;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ProjectPageShell({
  theme,
  children,
  className,
  style,
}: ProjectPageShellProps) {
  return (
    <main
      className={cn(
        "project-theme min-h-screen bg-[var(--project-page-bg)] text-[var(--project-body-text)]",
        `project-theme--${theme}`,
        className
      )}
      style={style}
    >
      {children}
    </main>
  );
}
