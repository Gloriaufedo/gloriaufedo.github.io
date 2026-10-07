/*
    Gloria Austin Portfolio
    Small vanilla JavaScript layer.

    The site remains readable and navigable when JavaScript
    is disabled.
*/


(() => {

    "use strict";


    /* =====================================================
       SET JS-ENABLED STATE
    ===================================================== */

    document.documentElement.classList.add("js-enabled");


    document.addEventListener("DOMContentLoaded", () => {

        initTheme();
        initMobileNavigation();
        initReveal();
        initCurrentYear();
        initExternalLinks();

    });


    /* =====================================================
       THEME
    ===================================================== */

    function initTheme() {

        const toggle = document.getElementById("theme-toggle");

        if (!toggle) {
            return;
        }


        const storedTheme =
            localStorage.getItem("gloria-theme");


        if (storedTheme === "dark") {

            document.documentElement.dataset.theme = "dark";

            toggle.setAttribute(
                "aria-pressed",
                "true"
            );

        } else if (storedTheme === "light") {

            document.documentElement.dataset.theme = "light";

            toggle.setAttribute(
                "aria-pressed",
                "false"
            );

        } else {

            const prefersDark =
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches;


            if (prefersDark) {

                document.documentElement.dataset.theme = "dark";

                toggle.setAttribute(
                    "aria-pressed",
                    "true"
                );

            }

        }


        toggle.addEventListener("click", () => {

            const isDark =
                document.documentElement.dataset.theme === "dark";


            if (isDark) {

                document.documentElement.dataset.theme = "light";

                localStorage.setItem(
                    "gloria-theme",
                    "light"
                );

                toggle.setAttribute(
                    "aria-pressed",
                    "false"
                );

            } else {

                document.documentElement.dataset.theme = "dark";

                localStorage.setItem(
                    "gloria-theme",
                    "dark"
                );

                toggle.setAttribute(
                    "aria-pressed",
                    "true"
                );

            }

        });

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function initMobileNavigation() {

        const toggle =
            document.getElementById("menu-toggle");

        const navigation =
            document.getElementById("main-navigation");


        if (!toggle || !navigation) {
            return;
        }


        const closeMenu = () => {

            navigation.classList.remove("is-open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        };


        toggle.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("is-open");


            toggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        navigation
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });


        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    navigation.classList.contains("is-open")
                ) {

                    closeMenu();

                    toggle.focus();

                }

            }
        );


        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 760) {
                    closeMenu();
                }

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    function initReveal() {

        const elements =
            document.querySelectorAll(".reveal");


        if (!elements.length) {
            return;
        }


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {

            elements.forEach((element) => {
                element.classList.add("is-visible");
            });

            return;
        }


        if (!("IntersectionObserver" in window)) {

            elements.forEach((element) => {
                element.classList.add("is-visible");
            });

            return;
        }


        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        elements.forEach((element) => {
            observer.observe(element);
        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    function initCurrentYear() {

        const yearElements =
            document.querySelectorAll(
                "[data-current-year]"
            );


        const currentYear =
            new Date().getFullYear();


        yearElements.forEach((element) => {

            element.textContent =
                currentYear;

        });

    }


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    function initExternalLinks() {

        const links =
            document.querySelectorAll(
                'a[target="_blank"]'
            );


        links.forEach((link) => {

            const rel =
                link.getAttribute("rel") || "";


            const values =
                new Set(
                    rel
                        .split(" ")
                        .filter(Boolean)
                );


            values.add("noopener");
            values.add("noreferrer");


            link.setAttribute(
                "rel",
                Array.from(values).join(" ")
            );

        });

    }

})();/* =========================================================
GLORIA AUSTIN — PORTFOLIO
SHARED MULTI-PAGE JAVASCRIPT

Used across:

* index.html
* projects.html
* experience.html
* research.html
* about.html
* contact.html

Page-specific JavaScript should be kept separate.
========================================================= */

/* =========================================================
01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

```
initMobileMenu();
initActiveNavigation();
initThemeToggle();
initNavbarScroll();
initScrollReveal();
initBackToTop();
```

});

/* =========================================================
02. MOBILE NAVIGATION
========================================================= */

function initMobileMenu() {

```
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuOverlay = document.querySelector(".menu-overlay");

if (!menuToggle || !navLinks) {
    return;
}

const menuIcon = menuToggle.querySelector("i");
const navItems = navLinks.querySelectorAll("a");

function openMenu() {

    navLinks.classList.add("active");

    if (menuOverlay) {
        menuOverlay.classList.add("active");
    }

    menuToggle.setAttribute("aria-expanded", "true");

    if (menuIcon) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
    }

    document.body.style.overflow = "hidden";
}


function closeMenu() {

    navLinks.classList.remove("active");

    if (menuOverlay) {
        menuOverlay.classList.remove("active");
    }

    menuToggle.setAttribute("aria-expanded", "false");

    if (menuIcon) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }

    document.body.style.overflow = "";
}


function toggleMenu() {

    const isOpen = navLinks.classList.contains("active");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

}


menuToggle.setAttribute("aria-expanded", "false");

menuToggle.addEventListener("click", toggleMenu);


if (menuOverlay) {

    menuOverlay.addEventListener("click", closeMenu);

}


navItems.forEach(link => {

    link.addEventListener("click", closeMenu);

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
        closeMenu();
    }

});
```

}

/* =========================================================
03. ACTIVE PAGE NAVIGATION
========================================================= */

/*
Each HTML page should have:

```
<body data-page="home">
<body data-page="projects">
<body data-page="experience">
<body data-page="research">
<body data-page="about">
<body data-page="contact">

And each navigation link should have:

<a href="index.html" data-page-link="home">Home</a>
```

*/

function initActiveNavigation() {

```
const currentPage = document.body.dataset.page;

if (!currentPage) {
    return;
}

const navLinks = document.querySelectorAll("[data-page-link]");

navLinks.forEach(link => {

    const linkPage = link.dataset.pageLink;

    if (linkPage === currentPage) {

        link.classList.add("active");

        link.setAttribute("aria-current", "page");

    } else {

        link.classList.remove("active");

        link.removeAttribute("aria-current");

    }

});
```

}

/* =========================================================
04. DARK / LIGHT MODE
========================================================= */

function initThemeToggle() {

```
const toggle = document.querySelector(".theme-toggle");

if (!toggle) {
    return;
}

const icon = toggle.querySelector("i");


function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-mode");

        if (icon) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }

        toggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        toggle.setAttribute(
            "title",
            "Switch to dark mode"
        );

    } else {

        document.body.classList.remove("light-mode");

        if (icon) {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

        toggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        toggle.setAttribute(
            "title",
            "Switch to light mode"
        );

    }

}


const savedTheme = localStorage.getItem("theme");


if (savedTheme === "light") {

    setTheme("light");

} else if (savedTheme === "dark") {

    setTheme("dark");

} else {

    /*
        If the visitor has never selected a theme,
        respect their operating-system preference.
    */

    const prefersLight =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;

    setTheme(prefersLight ? "light" : "dark");

}


toggle.addEventListener("click", () => {

    const isLight =
        document.body.classList.contains("light-mode");

    const newTheme = isLight ? "dark" : "light";

    localStorage.setItem("theme", newTheme);

    setTheme(newTheme);

});
```

}

/* =========================================================
05. NAVBAR ON SCROLL
========================================================= */

function initNavbarScroll() {

```
const navbar = document.querySelector(".navbar");

if (!navbar) {
    return;
}


function updateNavbar() {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


updateNavbar();
```

}

/* =========================================================
06. SCROLL REVEAL
========================================================= */

function initScrollReveal() {

```
const elements = document.querySelectorAll(".reveal");

if (!elements.length) {
    return;
}


/*
    Respect reduced-motion preferences.
    If enabled, everything stays visible.
*/

const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (prefersReducedMotion) {

    elements.forEach(element => {

        element.classList.add("show");

    });

    return;

}


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


elements.forEach(element => {

    revealObserver.observe(element);

});
```

}

/* =========================================================
07. BACK TO TOP
========================================================= */

function initBackToTop() {

```
const button = document.querySelector(".back-to-top");

if (!button) {
    return;
}


function updateButton() {

    if (window.scrollY > 500) {

        button.classList.add("show");

    } else {

        button.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    updateButton,
    { passive: true }
);


button.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


updateButton();
```

}

/* =========================================================
08. EXTERNAL LINKS
========================================================= */

/*
External links open in a new tab only when they have:

```
target="_blank"

This helper automatically adds the recommended
security attributes.
```

*/

function initExternalLinks() {

```
const externalLinks =
    document.querySelectorAll(
        'a[target="_blank"]'
    );

externalLinks.forEach(link => {

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
        Array.from(relValues).join(" ")
    );

});
```

}

initExternalLinks();

/* =========================================================
09. IMAGE LOADING
========================================================= */

/*
Adds a loaded class when images finish loading.
Useful for subtle image transitions later.

```
Images should have normal HTML alt text.
```

*/

function initImageLoading() {

```
const images =
    document.querySelectorAll("img");

if (!images.length) {
    return;
}


images.forEach(image => {

    if (image.complete) {

        image.classList.add("loaded");

    } else {

        image.addEventListener(
            "load",
            () => {
                image.classList.add("loaded");
            },
            { once: true }
        );

    }

});
```

}

initImageLoading();

/* =========================================================
10. CURRENT YEAR
========================================================= */

/*
Add:

```
<span data-current-year></span>

anywhere in the footer.

The year will update automatically.
```

*/

function initCurrentYear() {

```
const yearElements =
    document.querySelectorAll(
        "[data-current-year]"
    );

if (!yearElements.length) {
    return;
}


const currentYear =
    new Date().getFullYear();


yearElements.forEach(element => {

    element.textContent = currentYear;

});
```

}

initCurrentYear();

/* =========================================================
11. SMOOTH INTERNAL LINKS
========================================================= */

/*
This is only for links to an anchor on the SAME page.

```
Multi-page navigation itself does NOT depend on
scroll-position detection anymore.
```

*/

function initInternalAnchors() {

```
const anchorLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );

anchorLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});
```

}

initInternalAnchors();

/* =========================================================
12. OPTIONAL HERO IMAGE PARALLAX
========================================================= */

/*
Disabled by default.

```
To use it on a page, add:

<div class="hero-image" data-parallax>
    ...
</div>

It automatically respects reduced-motion settings.
```

*/

function initParallax() {

```
const element =
    document.querySelector("[data-parallax]");

if (!element) {
    return;
}


const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (prefersReducedMotion) {
    return;
}


let ticking = false;


document.addEventListener("mousemove", event => {

    if (ticking) {
        return;
    }

    ticking = true;


    requestAnimationFrame(() => {

        const x =
            (window.innerWidth / 2 - event.clientX)
            / 80;

        const y =
            (window.innerHeight / 2 - event.clientY)
            / 80;


        element.style.transform =
            `translate3d(${x}px, ${y}px, 0)`;


        ticking = false;

    });

});
```

}

initParallax();

/* =========================================================
END OF SHARED JAVASCRIPT
========================================================= */
