document.querySelectorAll('a.scrollto[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetID);

        if (targetEl) {
            const headerOffset = document.querySelector('#header')?.offsetHeight || 80;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


particlesJS("particles-js", {
    particles: {
        number: {value: 60, density: {enable: true, value_area: 800}},
        color: {value: "#00cfff"},
        shape: {type: "circle"},
        opacity: {value: 0.3},
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


document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.diagnostic-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
});
