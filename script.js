/* =========================================================
   GLORIA AUSTIN — PORTFOLIO
   Shared JavaScript for all pages
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initActiveNavigation();
    initThemeToggle();
    initNavbarScroll();
    initScrollReveal();
    initBackToTop();
    initExternalLinks();
    initCurrentYear();
    initSmoothAnchors();
});


/* =========================================================
   01. MOBILE NAVIGATION
   ========================================================= */

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const overlay = document.querySelector(".menu-overlay");

    if (!menuToggle || !navLinks) return;

    const openMenu = () => {
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");

        navLinks.classList.add("open");

        if (overlay) {
            overlay.classList.add("open");
        }

        document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        navLinks.classList.remove("open");

        if (overlay) {
            overlay.classList.remove("open");
        }

        document.body.style.overflow = "";
    };

    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener("click", closeMenu);
    }

    /* Close after selecting a navigation link */
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    /* Escape key closes the menu */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    /* Close mobile menu when returning to desktop */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
}


/* =========================================================
   02. ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {
    const currentPage = document.body.dataset.page;

    if (!currentPage) return;

    document
        .querySelectorAll("[data-page-link]")
        .forEach((link) => {

            const page = link.dataset.pageLink;

            if (page === currentPage) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            }
        });
}


/* =========================================================
   03. DARK / LIGHT THEME
   ========================================================= */

function initThemeToggle() {
    const toggle = document.querySelector(".theme-toggle");

    if (!toggle) return;

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        setTheme(prefersDark ? "dark" : "light");
    }

    toggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.dataset.theme;

        setTheme(
            currentTheme === "dark"
                ? "light"
                : "dark"
        );
    });
}


function setTheme(theme) {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(
        "portfolio-theme",
        theme
    );

    updateThemeToggle(theme);
}


function updateThemeToggle(theme) {
    const toggle = document.querySelector(".theme-toggle");
    const icon = document.querySelector(".theme-icon");

    if (!toggle) return;

    const isDark = theme === "dark";

    toggle.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

    toggle.setAttribute(
        "title",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

    if (icon) {
        icon.textContent = isDark ? "☾" : "☼";
    }
}


/* =========================================================
   04. NAVBAR ON SCROLL
   ========================================================= */

function initNavbarScroll() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    const updateHeader = () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}


/* =========================================================
   05. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {
    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;

    /* Respect reduced-motion preference */
    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        elements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

    elements.forEach((element) => {
        observer.observe(element);
    });
}


/* =========================================================
   06. BACK TO TOP
   ========================================================= */

function initBackToTop() {
    let button =
        document.querySelector(".back-to-top");

    /*
     * The button isn't required in the HTML.
     * Create it automatically if the page doesn't
     * already contain one.
     */

    if (!button) {
        button = document.createElement("button");

        button.type = "button";
        button.className = "back-to-top";
        button.setAttribute(
            "aria-label",
            "Back to top"
        );
        button.setAttribute(
            "title",
            "Back to top"
        );

        button.innerHTML = "↑";

        document.body.appendChild(button);
    }

    const updateVisibility = () => {
        if (window.scrollY > 500) {
            button.classList.add("visible");
        } else {
            button.classList.remove("visible");
        }
    };

    updateVisibility();

    window.addEventListener(
        "scroll",
        updateVisibility,
        { passive: true }
    );

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================================================
   07. EXTERNAL LINKS
   ========================================================= */

function initExternalLinks() {
    const links =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    links.forEach((link) => {

        const existingRel =
            link.getAttribute("rel") || "";

        const relValues =
            new Set(
                existingRel
                    .split(" ")
                    .filter(Boolean)
            );

        relValues.add("noopener");
        relValues.add("noreferrer");

        link.setAttribute(
            "rel",
            [...relValues].join(" ")
        );
    });
}


/* =========================================================
   08. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {
    const year =
        new Date().getFullYear();

    document
        .querySelectorAll("[data-current-year]")
        .forEach((element) => {
            element.textContent = year;
        });
}


/* =========================================================
   09. SAME-PAGE SMOOTH ANCHORS
   ========================================================= */

function initSmoothAnchors() {
    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    /*
                     * Update URL without jumping.
                     */
                    history.pushState(
                        null,
                        "",
                        targetId
                    );
                }
            );
        });
}


/* =========================================================
   10. IMAGE LOADING
   ========================================================= */

function initImageLoading() {
    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        if (image.complete) {
            image.classList.add("loaded");
            return;
        }

        image.addEventListener(
            "load",
            () => {
                image.classList.add("loaded");
            },
            { once: true }
        );
    });
}


/* =========================================================
   11. OPTIONAL PARALLAX
   ========================================================= */

function initParallax() {
    const elements =
        document.querySelectorAll(
            "[data-parallax]"
        );

    if (!elements.length) return;

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }

    window.addEventListener(
        "scroll",
        () => {

            const scrollY =
                window.scrollY;

            elements.forEach((element) => {

                const speed =
                    parseFloat(
                        element.dataset.parallax
                    ) || 0.08;

                element.style.transform =
                    `translateY(${scrollY * speed}px)`;
            });
        },
        { passive: true }
    );
}


/* =========================================================
   12. INITIALIZE OPTIONAL FEATURES
   ========================================================= */

initImageLoading();
initParallax();
