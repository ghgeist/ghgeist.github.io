import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserverMock }).IntersectionObserver = IntersectionObserverMock;
