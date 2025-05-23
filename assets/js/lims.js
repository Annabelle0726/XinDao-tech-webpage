const steps = document.querySelectorAll('.timeline-step');
const tooltip = document.getElementById('timelineTooltip');

steps.forEach(step => {
    step.addEventListener('mouseenter', (e) => {
        const title = step.dataset.title;
        const content = step.dataset.content;
        tooltip.innerHTML = `<strong>${title}</strong><br>${content}`;
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.pageX - 100}px`;
        tooltip.style.top = `${e.pageY - 120}px`;
    });

    step.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    step.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.pageX - 100}px`;
        tooltip.style.top = `${e.pageY - 120}px`;
    });
});
