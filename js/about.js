// certs
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out'
    });

    const toggleBtn = document.getElementById('toggleCerts');
    const hiddenCerts = document.querySelectorAll('.extra-cert');
    const labelSpan = toggleBtn.querySelector('.btn-label');
    const countSpan = toggleBtn.querySelector('.cert-count');

    // 初始加载时显示 +N
    const hiddenCount = hiddenCerts.length;
    if (hiddenCount > 0) {
        countSpan.textContent = `+${hiddenCount}`;
    }

    toggleBtn.addEventListener('click', function () {
        hiddenCerts.forEach(el => el.classList.toggle('d-none'));

        const isExpanded = labelSpan.textContent === '查看更多';
        labelSpan.textContent = isExpanded ? '收起部分' : '查看更多';
        countSpan.textContent = isExpanded ? '' : `+${hiddenCount}`;
    });
});
