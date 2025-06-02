particlesJS("particles-js", {
    particles: {
        number: {value: 20, density: {enable: true, value_area: 800}},
        color: {value: "#caf0f8"},
        shape: {type: "circle"},
        opacity: {value: 0.5},
        size: {value: 4},
        line_linked: {enable: true, distance: 120, color: "#00cfff", opacity: 0.4, width: 2},
        move: {enable: true, speed: 1}
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {enable: true, mode: "repulse"},
            onclick: {enable: true, mode: "push"}
        },
        modes: {
            repulse: {distance: 100},
            push: {particles_nb: 4}
        }
    },
    retina_detect: true
});

particlesJS("particles-js1", {
    particles: {
        number: {value: 30, density: {enable: true, value_area: 800}},
        color: {value: "#90e0ef"},
        shape: {type: "circle"},
        opacity: {value: 0.5},
        size: {value: 4},
        line_linked: {enable: true, distance: 120, color: "#00cfff", opacity: 0.4, width: 2},
        move: {enable: true, speed: 1}
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {enable: true, mode: "repulse"},
            onclick: {enable: true, mode: "push"}
        },
        modes: {
            repulse: {distance: 100},
            push: {particles_nb: 4}
        }
    },
    retina_detect: true
});

// ======================== card ===============================

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.diagnostic-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
});


//====================== sidebar ==============================

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("consulting-sidebar");
    const sectionsToWatch = [
        document.getElementById("consulting-process"),
        document.getElementById("lean-consulting"),
        document.getElementById("footer"),
        document.getElementById("div-2"),
        document.getElementById("div-3"),
    ];

    function checkSidebarBackground() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        let shouldHighlight = false;

        sectionsToWatch.forEach(section => {
            const rect = section.getBoundingClientRect();
            const offsetTop = rect.top + scrollY;
            const offsetBottom = offsetTop + rect.height;

            const inViewport = scrollY + windowHeight / 2 > offsetTop && scrollY + windowHeight / 2 < offsetBottom;

            if (inViewport) {
                shouldHighlight = true;
            }
        });

        if (shouldHighlight) {
            sidebar.classList.add("sidebar-highlighted");
        } else {
            sidebar.classList.remove("sidebar-highlighted");
        }
    }

    window.addEventListener("scroll", checkSidebarBackground);
    checkSidebarBackground(); 
});