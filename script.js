/* =========================================================
   GLORIA AUSTIN | PORTFOLIO
   Shared JavaScript for all pages
   ========================================================= */

const THEME_KEY = "portfolio-theme";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";


/* =========================================================
   00. THEME: APPLY EARLY
   Runs as soon as the script loads, before DOMContentLoaded,
   to reduce the light-theme flash in dark mode.
   ========================================================= */

document.documentElement.dataset.theme = getPreferredTheme();


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

    const isOpen = () =>
        menuToggle.getAttribute("aria-expanded") === "true";

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
        if (isOpen()) {
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

    /* Escape closes the menu and returns focus to the button */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            closeMenu();
            menuToggle.focus();
        }
    });

    /* Close mobile menu when returning to desktop */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900 && isOpen()) {
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

            if (link.dataset.pageLink === currentPage) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            }
        });
}


/* =========================================================
   03. DARK / LIGHT THEME
   A saved choice always wins. Without one, the site follows
   the system setting, including later changes to it.
   ========================================================= */

function getStoredTheme() {
    try {
        const theme = localStorage.getItem(THEME_KEY);

        return theme === "dark" || theme === "light"
            ? theme
            : null;
    } catch (error) {
        /* Storage can be blocked (private mode, strict settings) */
        return null;
    }
}


function storeTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
        /* Ignore: the theme still applies for this visit */
    }
}


function getPreferredTheme() {
    const stored = getStoredTheme();

    if (stored) return stored;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}


function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    updateThemeToggle(theme);
}


function initThemeToggle() {
    const toggle = document.querySelector(".theme-toggle");

    applyTheme(getPreferredTheme());

    if (!toggle) return;

    toggle.addEventListener("click", () => {
        const nextTheme =
            document.documentElement.dataset.theme === "dark"
                ? "light"
                : "dark";

        applyTheme(nextTheme);
        storeTheme(nextTheme);
    });

    /* Follow system changes until the visitor picks a theme */
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
            if (!getStoredTheme()) {
                applyTheme(event.matches ? "dark" : "light");
            }
        });
}


function updateThemeToggle(theme) {
    const toggle = document.querySelector(".theme-toggle");
    const icon = document.querySelector(".theme-icon");

    if (!toggle) return;

    const isDark = theme === "dark";
    const label = isDark
        ? "Switch to light mode"
        : "Switch to dark mode";

    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);

    /* The label already states the action, so a pressed state
       would be announced twice. */
    toggle.removeAttribute("aria-pressed");

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
        header.classList.toggle("scrolled", window.scrollY > 20);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, { passive: true });
}


/* =========================================================
   05. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    /* Show everything immediately if motion is reduced or the
       browser lacks IntersectionObserver, so nothing stays hidden */
    if (
        window.matchMedia(REDUCED_MOTION).matches ||
        !("IntersectionObserver" in window)
    ) {
        elements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);
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
    let button = document.querySelector(".back-to-top");

    /* Created automatically if the page doesn't include one */
    if (!button) {
        button = document.createElement("button");

        button.type = "button";
        button.className = "back-to-top";
        button.setAttribute("aria-label", "Back to top");
        button.setAttribute("title", "Back to top");

        button.textContent = "↑";

        document.body.appendChild(button);
    }

    const updateVisibility = () => {
        button.classList.toggle("visible", window.scrollY > 500);
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, { passive: true });

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(REDUCED_MOTION).matches
                ? "auto"
                : "smooth"
        });
    });
}


/* =========================================================
   07. EXTERNAL LINKS
   ========================================================= */

function initExternalLinks() {
    document
        .querySelectorAll('a[target="_blank"]')
        .forEach((link) => {

            const relValues = new Set(
                (link.getAttribute("rel") || "")
                    .split(" ")
                    .filter(Boolean)
            );

            relValues.add("noopener");
            relValues.add("noreferrer");

            link.setAttribute("rel", [...relValues].join(" "));
        });
}


/* =========================================================
   08. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {
    const year = new Date().getFullYear();

    document
        .querySelectorAll("[data-current-year]")
        .forEach((element) => {
            element.textContent = year;
        });
}


/* =========================================================
   09. SAME-PAGE SMOOTH ANCHORS
   Also moves keyboard focus to the target, which makes the
   "Skip to main content" link work.
   ========================================================= */

function initSmoothAnchors() {
    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const href = link.getAttribute("href");

                if (!href || href === "#") return;

                let id = href.slice(1);

                try {
                    id = decodeURIComponent(id);
                } catch (error) {
                    /* Keep the raw id if it can't be decoded */
                }

                const target = document.getElementById(id);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(REDUCED_MOTION).matches
                        ? "auto"
                        : "smooth",
                    block: "start"
                });

                /* Non-interactive elements need tabindex to take focus */
                if (!target.hasAttribute("tabindex")) {
                    target.setAttribute("tabindex", "-1");
                }

                target.focus({ preventScroll: true });

                /* Update the URL without jumping */
                history.pushState(null, "", href);
            });
        });
}
