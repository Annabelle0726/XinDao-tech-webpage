window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header.header');
    const dropdown = document.getElementById('productCenterDropdown');
    const megamenu = document.getElementById('megamenuPanel');

    if (!dropdown || !megamenu || !header) return;

    dropdown.addEventListener('mouseenter', () => {
        megamenu.style.display = 'block';
        updateHeaderTransparency();
    });

    dropdown.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!dropdown.matches(':hover') && !megamenu.matches(':hover')) {
                megamenu.style.display = 'none';
            }
            updateHeaderTransparency();
        }, 200);
    });

    megamenu.addEventListener('mouseenter', () => {
        megamenu.style.display = 'block';
        updateHeaderTransparency();
    });

    megamenu.addEventListener('mouseleave', () => {
        megamenu.style.display = 'none';
        updateHeaderTransparency();
    });

    function updateHeaderTransparency() {
        const shouldBeTransparent = window.scrollY <= 50 &&
            !dropdown.matches(':hover') &&
            !megamenu.matches(':hover');

        if (shouldBeTransparent) {
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent');
        }
    }

    window.addEventListener('scroll', updateHeaderTransparency);
});

window.onload = () => {
    document.querySelector('header.header').classList.remove('no-transition');
}
