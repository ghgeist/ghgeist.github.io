import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, ComponentType } from "react";
import { Toaster } from "@/app/components/ui/sonner";

import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { Approach } from "@/app/components/Approach";
import { WorkWithMe } from "@/app/components/WorkWithMe";
import { Footer } from "@/app/components/Footer";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { RouteScrollManager } from "@/app/components/RouteScrollManager";
import {
  bantrProject,
  replacementTrapProject,
  stormSignalProject,
  walkabilityIndexProject,
} from "@/app/projects/content/selectedWorkProjects";

/**
 * Wraps a dynamic import with retry logic for chunk load failures.
 * Automatically retries failed chunk loads once before propagating the error.
 */
function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries = 1
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error as Error;
        
        // Check if it's a chunk load error
        const isChunkError = 
          error instanceof Error &&
          (/Loading chunk/i.test(error.message) ||
           /ChunkLoadError/i.test(error.message) ||
           /Failed to fetch dynamically imported module/i.test(error.message) ||
           /Loading CSS chunk/i.test(error.message));
        
        // Only retry chunk load errors
        if (isChunkError && attempt < retries) {
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        
        // Re-throw if not a chunk error or out of retries
        throw error;
      }
    }
    
    // Should never reach here, but TypeScript needs it
    throw lastError || new Error("Failed to load module");
  });
}

// Lazy load project pages for better initial bundle size
const WalkabilityIndexDetail = lazyWithRetry(() => import("./projects/WalkabilityIndex").then(module => ({ default: module.WalkabilityIndexDetail })));
const StormSignal = lazyWithRetry(() => import("./projects/StormSignal").then(module => ({ default: module.StormSignal })));
const Bantr = lazyWithRetry(() => import("./projects/Bantr").then(module => ({ default: module.Bantr })));
const ReplacementTrap = lazyWithRetry(() => import("./projects/ReplacementTrap").then(module => ({ default: module.ReplacementTrap })));
const About = lazyWithRetry(() => import("./components/About").then(module => ({ default: module.About })));

// Loading fallback for lazy-loaded routes
function RouteLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
      <div className="text-gray-400">Loading...</div>
    </div>
  );
}

// Create a Home component to keep App clean
function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <WorkWithMe />
    </>
  );
}

const projectRoutes = [
  {
    path: walkabilityIndexProject.route,
    element: (
      <Suspense fallback={<RouteLoadingFallback />}>
        <WalkabilityIndexDetail />
      </Suspense>
    ),
  },
  {
    path: replacementTrapProject.route,
    element: (
      <Suspense fallback={<RouteLoadingFallback />}>
        <ReplacementTrap />
      </Suspense>
    ),
  },
  {
    path: bantrProject.route,
    element: (
      <Suspense fallback={<RouteLoadingFallback />}>
        <Bantr />
      </Suspense>
    ),
  },
  {
    path: stormSignalProject.route,
    element: (
      <Suspense fallback={<RouteLoadingFallback />}>
        <StormSignal />
      </Suspense>
    ),
  },
] as const;

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RouteScrollManager />
        <div className="font-sans text-gray-300 bg-[#0B0E14] min-h-screen selection:bg-[#0066cc] selection:text-white">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/about"
              element={
                <Suspense fallback={<RouteLoadingFallback />}>
                  <About />
                </Suspense>
              }
            />
            {projectRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>

          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
