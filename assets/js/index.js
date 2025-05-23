document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".count-box");
    const bgImg = document.getElementById("counts-bg-img");
    const root = document.body; // 或 document.querySelector('.counts')

    boxes.forEach(box => {
        box.addEventListener("click", function () {
            // 切换 active
            boxes.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            // 背景图片切换
            const newBg = this.getAttribute("data-bg");
            if (bgImg.src !== newBg) {
                bgImg.style.opacity = 0;
                setTimeout(() => {
                    bgImg.src = newBg;
                    bgImg.style.opacity = 1;
                }, 170);
            }

            // 设置阴影类型（反差原则）
            const bgType = this.getAttribute("data-bg-type");
            if (bgType === "dark") {
                root.classList.add("shadow-light");
                root.classList.remove("shadow-dark");
            } else {
                root.classList.add("shadow-dark");
                root.classList.remove("shadow-light");
            }
        });
    });
});


document.getElementById("loadMoreBtn").addEventListener("click", function () {
    const hiddenItems = document.querySelectorAll(".more-item");
    const icon = document.getElementById("loadMoreIcon");
    const text = document.getElementById("loadMoreText");

    const isExpanded = !hiddenItems[0].classList.contains("d-none");

    if (isExpanded) {
        // 折叠系统
        hiddenItems.forEach(el => el.classList.add("d-none"));
        icon.classList.remove("bi-dash-circle");
        icon.classList.add("bi-plus-circle");
        text.textContent = "查看更多系统";
    } else {
        // 展开系统
        hiddenItems.forEach(el => el.classList.remove("d-none"));
        icon.classList.remove("bi-plus-circle");
        icon.classList.add("bi-dash-circle");
        text.textContent = "收起更多系统";
    }
});


VANTA.NET({
    el: "#hero-bg",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x4154f1,       // 主色调蓝
    backgroundColor: 0xffffff, // 背景白
    points: 12.0,
    maxDistance: 20.0,
    spacing: 18.0
});

new Typed("#typed", {
    strings: ["芯导数字化系统", "连接数据 驱动智能", "数字化一站式解决方案"],
    typeSpeed: 120,
    backSpeed: 100,
    backDelay: 1500,
    loop: true
});