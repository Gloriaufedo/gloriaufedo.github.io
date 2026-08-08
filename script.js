/* ==========================================
   PORTFOLIO JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
          COUNTERS
       ========================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = parseFloat(counter.dataset.target);

            if (isNaN(target)) return;

            let current = 0;
            const increment = target / 80;

            function updateCounter() {

                current += increment;

                if (current < target) {

                    if (target === 15.7) {
                        counter.textContent = current.toFixed(1);
                    } else {
                        counter.textContent = Math.floor(current);
                    }

                    requestAnimationFrame(updateCounter);

                } else {

                    if (target === 15.7) {
                        counter.textContent = "15.7M+";
                    } else if (target === 100) {
                        counter.textContent = "100%";
                    } else {
                        counter.textContent = target + "+";
                    }

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        });

    }, { threshold: 0.1 }); // Lowered to 0.1 to trigger reliably

    counters.forEach(counter => counterObserver.observe(counter));



    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".project-card, .skill-card, .stat-card, .timeline-item, .highlight-card"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {

        el.classList.add("hidden");

        revealObserver.observe(el);

    });



// ==========================
// Active Navigation on Scroll
// ==========================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", setActiveNav);

setActiveNav();



    /* ==========================================
       NAVBAR SHRINK
    ========================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {

            if (window.scrollY > 60) {

                navbar.style.padding = "10px 25px";
                navbar.style.background = "rgba(15,23,42,.92)";

            } else {

                navbar.style.padding = "18px 35px";
                navbar.style.background = "rgba(15,23,42,.55)";

            }

        });
    }



    /* ==========================================
       DARK / LIGHT MODE
    ========================================== */

    const toggle = document.getElementById("theme-toggle");

    if (toggle) {
        const icon = toggle.querySelector("i");

        if (localStorage.getItem("theme") === "light") {

            document.body.classList.add("light-mode");

            if (icon) icon.classList.replace("fa-moon", "fa-sun");

        }

        toggle.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {

                localStorage.setItem("theme", "light");

                if (icon) icon.classList.replace("fa-moon", "fa-sun");

            } else {

                localStorage.setItem("theme", "dark");

                if (icon) icon.classList.replace("fa-sun", "fa-moon");

            }

        });
    }



    /* ==========================================
       HERO PARALLAX
    ========================================== */

    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {
        document.addEventListener("mousemove", (e) => {

            const x = (window.innerWidth / 2 - e.clientX) / 45;

            const y = (window.innerHeight / 2 - e.clientY) / 45;

            heroImage.style.transform = `translate(${x}px, ${y}px)`;

        });
    }



    /* ==========================================
       BACK TO TOP BUTTON
    ========================================== */

    const topButton = document.querySelector(".back-to-top");

    if (topButton) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 600) {

                topButton.classList.add("show-top");

            } else {

                topButton.classList.remove("show-top");

            }

        });

        topButton.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

});

// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuOverlay = document.querySelector(".menu-overlay");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");
    menuOverlay.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});

menuOverlay.addEventListener("click", closeMenu);

navItems.forEach(link => {

    link.addEventListener("click", closeMenu);

});

function closeMenu(){

    navLinks.classList.remove("active");
    menuOverlay.classList.remove("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

}

window.addEventListener("resize", () => {

    if(window.innerWidth > 900){

        closeMenu();

    }

});