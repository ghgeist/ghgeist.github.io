import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Approach } from "./components/Approach";
import { About } from "./components/About";
import { WorkWithMe } from "./components/WorkWithMe";
import { Footer } from "./components/footer";

import { WalkabilityIndexDetail } from "./projects/WalkabilityIndex";
import { StormSignal } from "./projects/StormSignal";
import { Bantr } from "./projects/Bantr";
import { ReplacementTrap } from "./projects/ReplacementTrap";

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
          <Route path="/projects/walkability-index" element={<WalkabilityIndexDetail />} />
          <Route path="/projects/replacement-trap" element={<ReplacementTrap />} />
          <Route path="/projects/bantr" element={<Bantr />} />
          <Route path="/projects/signal-storm" element={<StormSignal />} />
        </Routes>

        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}