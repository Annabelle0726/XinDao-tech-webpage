// 新增全局状态管理
let activeToasts = [];

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card[data-desc]");
    const toastContainer = document.querySelector(".toast-container");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            // 新增：禁止重复触发逻辑
            if (activeToasts.length > 0) return;

            const message = card.getAttribute("data-desc");
            if (message && toastContainer) {
                const toast = document.createElement("div");
                toast.className = "toast";
                toast.innerText = message;

                // 新增：状态管理
                activeToasts.push(toast);

                toastContainer.appendChild(toast);

                // 修改：使用更精确的动画时间控制
                toast.addEventListener('transitionend', () => {
                    toast.remove();
                    activeToasts = activeToasts.filter(t => t !== toast);
                }, { once: true });

                setTimeout(() => {
                    if (toast.parentElement) {
                        toast.remove();
                        activeToasts = activeToasts.filter(t => t !== toast);
                    }
                }, 4000);
            }
        });
    });
});