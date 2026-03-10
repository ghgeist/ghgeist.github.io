import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/app/components/ui/utils";
import { ProjectFooterNav } from "@/app/projects/components/ProjectFooterNav";
import type { ProjectThemeName } from "@/app/projects/content/selectedWorkProjects";

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
      <ProjectFooterNav />
    </main>
  );
}
