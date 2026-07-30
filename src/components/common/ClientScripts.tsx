"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Sticky header
const headerFixed2 = () => {
    const header = document.querySelector<HTMLElement>(".header-fixed");
    if (!header) return;

    const FIXED_AT = 80;
    const RELEASE_AT = 20;
    let isFixed = header.classList.contains("is-fixed");

    const onScroll = () => {
        const scrollY = window.scrollY;

        // Use separate enter/exit thresholds so small layout or touch-scroll
        // adjustments cannot continuously toggle the sticky header state.
        if (!isFixed && scrollY >= FIXED_AT) {
            header.classList.add("is-fixed");
            isFixed = true;
        } else if (isFixed && scrollY <= RELEASE_AT) {
            header.classList.remove("is-fixed");
            isFixed = false;
        }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
};

// Animate elements when visible
const animateImgItem = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delayAttr = entry.target.getAttribute("data-delay");
                    const delay = parseFloat(delayAttr ?? "0") || 0;
                    setTimeout(() => {
                        entry.target.classList.add("active-animate");
                    }, delay * 1000);
                }
            });
        },
        { threshold: 0.1 }
    );

    const elements = document.querySelectorAll<HTMLElement>(
        ".tf-animate-1, .tf-animate-2, .tf-animate-3, .tf-animate-4"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
};

// Wishlist toggle
const wishList = () => {
    const wishlistElements = document.querySelectorAll<HTMLElement>(
        ".card-house .wishlist"
    );

    wishlistElements.forEach((el) => {
        el.addEventListener("click", function () {
            this.classList.toggle("addwishlist");

            const icon = this.querySelector<HTMLElement>(".icon");
            const tooltip = this.querySelector<HTMLElement>(".tooltip");

            if (this.classList.contains("addwishlist")) {
                icon?.classList.replace("icon-Heart", "icon-trash-alt-solid");
                if (tooltip) tooltip.textContent = "Remove Wishlist";
            } else {
                icon?.classList.replace("icon-trash-alt-solid", "icon-Heart");
                if (tooltip) tooltip.textContent = "Add to Wishlist";
            }
        });
    });
};

export default function ClientScripts() {
    const pathname = usePathname();

    // Splitting text library
    useEffect(() => {
        import("splitting").then((Splitting) => {
            const splittingElements = document.querySelectorAll(".splitting");
            if (splittingElements.length > 0) {
                Splitting.default();
            }
        });
    }, []);

    // Button hover effect
    useEffect(() => {
        const buttons = document.querySelectorAll(".tf-btn");
        const listeners: (() => void)[] = [];

        buttons.forEach((button) => {
            const btn = button as HTMLElement;
            const bgEffect = btn.querySelector(".bg-effect");

            const setPosition = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const relX = e.clientX - rect.left;
                const relY = e.clientY - rect.top;
                if (bgEffect) {
                    (bgEffect as HTMLElement).style.top = relY + "px";
                    (bgEffect as HTMLElement).style.left = relX + "px";
                }
            };

            btn.addEventListener("mouseenter", setPosition);
            btn.addEventListener("mouseout", setPosition);

            listeners.push(() => {
                btn.removeEventListener("mouseenter", setPosition);
                btn.removeEventListener("mouseout", setPosition);
            });
        });

        return () => {
            listeners.forEach((cleanup) => cleanup());
        };
    }, [pathname]);

    // Init animations on mount
    useEffect(() => {
        const cleanupHeader = headerFixed2();
        animateImgItem();
        wishList();

        return () => {
            cleanupHeader?.();
        };
    }, [pathname]);

    return null;
}
