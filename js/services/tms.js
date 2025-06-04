// ============================= hero =================

// =================== btn ========================
const ctaButton = document.querySelector('.btn-primary');
setInterval(() => {
    ctaButton.style.transform = 'scale(1.05)';
    setTimeout(() => {
        ctaButton.style.transform = 'scale(1)';
    }, 500);
}, 3000);
// --------------------- end btn --------------------

// ==================== end hero ======================



// ================================ pain ==============
// 可选交互效果：让 .truck-icon 在每次动画结束后改变背景色或方向（提高视觉吸引力）
const truck = document.querySelector('.truck-icon');
truck.addEventListener('animationiteration', () => {
    truck.style.background = `linear-gradient(to bottom, ${Math.random() > 0.5 ? '#4a8cff' : '#ff6b6b'}, #ff6b6b)`;
});

// ==================================== end pain ==============


// ============================ core =====================================
// 添加悬浮动画效果
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.3}s`;
});

// 添加鼠标跟随效果
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

//============================== end core ====================================

// =================================== benefits ==============================

const benefitContainers = document.querySelectorAll('.benefit-container');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

benefitContainers.forEach((container, index) => {
    container.style.opacity = 0;
    container.style.transform = 'translateY(30px)';
    container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    container.style.transitionDelay = `${index * 0.2}s`;

    observer.observe(container);
});



// =================================== end benefits ==============================







// ===================================== sidebar ==================================

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-tms");
    const navList = document.getElementById("tms-List");

    toggleBtn.addEventListener("click", function () {
        navList.classList.toggle("collapsed");
    });
});

// ======================================== end sidebar ==========================