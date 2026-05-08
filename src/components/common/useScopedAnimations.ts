"use client";

import { type DependencyList, type RefObject, useEffect } from "react";

type Revertible = {
  revert: () => void;
};

type SplitTextInstance = Revertible & {
  split: (vars: { type: string }) => void;
  chars: Element[];
  words: Element[];
  lines: Element[];
};

function getScrollSettings(element: HTMLElement) {
  const settings: Record<string, number | string> = {
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  };

  if (element.classList.contains("effectRight")) {
    settings.x = 80;
  } else if (element.classList.contains("effectLeft")) {
    settings.x = -80;
  } else if (element.classList.contains("effectBottom")) {
    settings.y = 80;
  } else if (element.classList.contains("effectTop")) {
    settings.y = -80;
  } else if (element.classList.contains("effectZoomIn")) {
    settings.scale = 0.9;
  }

  return settings;
}

function getSplitTarget(element: HTMLElement, split: SplitTextInstance) {
  if (element.classList.contains("split-lines-transform")) {
    split.split({ type: "lines" });
    return split.lines;
  }

  if (element.classList.contains("split-lines-rotation-x")) {
    split.split({ type: "lines" });
    return split.lines;
  }

  if (element.classList.contains("split-words-scale")) {
    split.split({ type: "words" });
    return split.words;
  }

  if (element.classList.contains("effect-blur-fade")) {
    split.split({ type: "words" });
    return split.words;
  }

  split.split({ type: "chars, words" });
  return split.chars;
}

function getSplitFromVars(element: HTMLElement) {
  if (element.classList.contains("effect-blur-fade")) {
    return {
      opacity: 0,
      y: 18,
      filter: "blur(8px)",
      stagger: 0.04,
    };
  }

  if (element.classList.contains("split-words-scale")) {
    return {
      opacity: 0,
      scale: 0.82,
      y: 12,
      stagger: 0.05,
    };
  }

  if (element.classList.contains("split-lines-rotation-x")) {
    return {
      opacity: 0,
      rotationX: -80,
      transformOrigin: "50% 50% -40px",
      stagger: 0.08,
    };
  }

  if (element.classList.contains("split-lines-transform")) {
    return {
      opacity: 0,
      yPercent: 100,
      stagger: 0.08,
    };
  }

  return {
    opacity: 0,
    y: 18,
    rotationX: element.classList.contains("effect-rotate") ? -45 : 0,
    transformOrigin: "50% 50% -20px",
    stagger: 0.03,
  };
}

export function useScopedAnimations(
  rootRef: RefObject<HTMLElement | null>,
  dependencies: DependencyList = [],
) {
  useEffect(() => {
    let active = true;
    let context: Revertible | undefined;
    let frame = 0;
    const splitInstances: Revertible[] = [];

    const initAnimations = async () => {
      const root = rootRef.current;
      if (!root) return;

      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);

      if (!active || !rootRef.current) return;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      context = gsap.context(() => {
        root
          .querySelectorAll<HTMLElement>(".scrolling-effect")
          .forEach((element) => {
            gsap.from(element, {
              ...getScrollSettings(element),
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          });

        root.querySelectorAll<HTMLElement>(".split-text").forEach((element) => {
          const split = new SplitText(element, {
            type: "chars, words, lines",
          }) as SplitTextInstance;
          splitInstances.push(split);
          const target = getSplitTarget(element, split);

          gsap.from(target, {
            ...getSplitFromVars(element),
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

        ScrollTrigger.refresh();
      }, root);
    };

    frame = window.requestAnimationFrame(() => {
      void initAnimations();
    });

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      context?.revert();
      splitInstances.forEach((split) => split.revert());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
