document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash;
    if (hash) {
        // 所有 collapse 全部关闭
        document.querySelectorAll('.accordion-collapse').forEach(el => {
            el.classList.remove('show');
        });

        // 展开锚点对应的内容
        const targetHeader = document.querySelector(hash);
        if (targetHeader && targetHeader.nextElementSibling) {
            targetHeader.scrollIntoView({ behavior: 'smooth' });
            targetHeader.nextElementSibling.classList.add('show');
        }
    }
});