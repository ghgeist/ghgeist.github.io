import { useCallback } from "react";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type UseBackToCaseStudiesOptions = {
  topAnchorSelector?: string;
  offsetPx?: number;
  delayMs?: number;
};

export function useBackToCaseStudies(
  options: UseBackToCaseStudiesOptions = {},
) {
  const {
    topAnchorSelector = "#page-top",
    offsetPx = 96,
    delayMs = 100,
  } = options;
  const navigate = useNavigate();

  return useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(topAnchorSelector);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - offsetPx;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, delayMs);
    },
    [navigate, topAnchorSelector, offsetPx, delayMs],
  );
}
