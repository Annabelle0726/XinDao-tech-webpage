document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".count-box");
    const bgImg = document.getElementById("counts-bg-img");

    boxes.forEach(box => {
        box.addEventListener("click", function () {
            // 切换 active 样式
            boxes.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            // 切换背景图
            const newBg = this.getAttribute("data-bg");
            if (bgImg.src !== newBg) {
                bgImg.style.opacity = 0;
                setTimeout(() => {
                    bgImg.src = newBg;
                    bgImg.style.opacity = 1;
                }, 100);
            }
        });
    });
});
