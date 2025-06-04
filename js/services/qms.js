











// ============================ ==============================
// toast
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


// ============================ end toast =====================================

// ============================  =====================================





// ==================================== ad ================================

// 简单的滚动动画效果
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // 为每个亮点行添加动画
    document.querySelectorAll('.highlight-row').forEach((row, index) => {
        row.style.opacity = 0;
        row.style.transform = 'translateY(30px)';
        row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        row.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(row);
    });
});



// ==================================== end ad ================================









