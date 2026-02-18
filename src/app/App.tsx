import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "./components/ui/sonner";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Approach } from "./components/Approach";
import { About } from "./components/About";
import { WorkWithMe } from "./components/WorkWithMe";
import { Footer } from "./components/footer";

// Lazy load project pages for better initial bundle size
const WalkabilityIndexDetail = lazy(() => import("./projects/WalkabilityIndex").then(module => ({ default: module.WalkabilityIndexDetail })));
const StormSignal = lazy(() => import("./projects/StormSignal").then(module => ({ default: module.StormSignal })));
const Bantr = lazy(() => import("./projects/Bantr").then(module => ({ default: module.Bantr })));
const ReplacementTrap = lazy(() => import("./projects/ReplacementTrap").then(module => ({ default: module.ReplacementTrap })));

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
      <About />
      <WorkWithMe />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-gray-300 bg-[#0B0E14] min-h-screen selection:bg-[#0066cc] selection:text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/projects/walkability-index" 
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <WalkabilityIndexDetail />
              </Suspense>
            } 
          />
          <Route 
            path="/projects/replacement-trap" 
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <ReplacementTrap />
              </Suspense>
            } 
          />
          <Route 
            path="/projects/bantr" 
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <Bantr />
              </Suspense>
            } 
          />
          <Route 
            path="/projects/signal-storm" 
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <StormSignal />
              </Suspense>
            } 
          />
        </Routes>

        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}