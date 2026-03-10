import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  backToSelectedWorkLabel,
  nextProjectLabel,
  selectedWorkNavHref,
} from "@/app/content/siteNavigation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  getSelectedWorkProjectByRoute,
  getNextSelectedWorkProject,
} from "@/app/projects/content/selectedWorkProjects";

export function ProjectFooterNav() {
  const location = useLocation();
  const currentProject = getSelectedWorkProjectByRoute(location.pathname);

  if (!currentProject) {
    return null;
  }

  const nextProject = getNextSelectedWorkProject(currentProject.key);
  
  // Lighter card styling: thinner border perception (subtle border color), reduced padding, lower contrast background
  const rightCardClassName =
    "group flex min-w-0 flex-col gap-1.5 rounded-lg border border-[color:var(--surface-border-subtle)] bg-white/[0.01] px-4 py-2.5 transition-colors hover:border-[color:var(--project-accent-border)] hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--project-page-bg)] md:px-5 md:py-4";

  return (
    <section className="border-t border-[color:var(--surface-border-subtle)] bg-[var(--project-page-bg)] pb-8 pt-10 md:pb-20 md:pt-12">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
          
          {/* Left: Lightweight Link */}
          <Link
            to={selectedWorkNavHref}
            className="group flex w-max items-center gap-2.5 text-[var(--project-meta-text)] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--project-page-bg)]"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">{backToSelectedWorkLabel}</span>
          </Link>

          {/* Right: Main Navigation Card */}
          <Link
            to={nextProject.route}
            className={`${rightCardClassName} items-start md:items-end text-left md:text-right md:w-auto md:min-w-[20rem]`}
            aria-label={`Next project: ${nextProject.title}`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--project-meta-text)] transition-colors group-hover:text-white">
              {nextProjectLabel}
            </span>
            <div className="flex items-center gap-2.5">
              <p className="text-xl font-semibold text-white">
                {nextProject.title}
              </p>
              <ArrowRight className="h-5 w-5 shrink-0 text-[var(--project-meta-text)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
