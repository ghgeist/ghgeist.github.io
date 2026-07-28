import { Link } from "react-router-dom";
import { selectedWorkProjects } from "@/app/projects/content/selectedWorkProjects";

/** In-app not-found page for client-side navigation to unknown paths. */
export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center px-6 py-24 lg:px-8">
      <p className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-500">
        <Link to="/" className="hover:text-[#0066cc] focus-visible:text-[#0066cc]">
          Grant Geist
        </Link>
      </p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
        Page not found
      </h1>
      <p className="mb-8 text-base leading-relaxed text-gray-400 md:text-lg">
        That URL isn’t on this site. Try one of these pages instead.
      </p>
      <nav aria-label="Site pages" className="flex flex-col gap-3">
        <Link
          to="/"
          className="font-bold text-[#0066cc] hover:text-[#0052a3] hover:underline focus-visible:text-[#0052a3]"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="font-bold text-[#0066cc] hover:text-[#0052a3] hover:underline focus-visible:text-[#0052a3]"
        >
          About
        </Link>
        <h2 className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-500">
          Selected work
        </h2>
        {selectedWorkProjects.map((project) => (
          <Link
            key={project.route}
            to={project.route}
            className="font-bold text-[#0066cc] hover:text-[#0052a3] hover:underline focus-visible:text-[#0052a3]"
          >
            {project.title}
          </Link>
        ))}
      </nav>
    </main>
  );
}
