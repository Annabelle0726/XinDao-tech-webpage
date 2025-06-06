// ======================== hero ========================

// 3D立方体旋转
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图表
    const ctx = document.getElementById('benefitChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['生产效率', '质量管控', '设备效率', '交付速度', '数据可视', '流程优化'],
            datasets: [{
                label: '实施前',
                data: [65, 59, 70, 62, 58, 60],
                fill: true,
                backgroundColor: 'rgba(106, 174, 255, 0.2)',
                borderColor: 'rgb(106, 174, 255)',
                pointBackgroundColor: 'rgb(106, 174, 255)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(106, 174, 255)'
            }, {
                label: '实施后',
                data: [95, 90, 95, 92, 88, 93],
                fill: true,
                backgroundColor: 'rgba(0, 102, 204, 0.2)',
                borderColor: 'rgb(0, 102, 204)',
                pointBackgroundColor: 'rgb(0, 102, 204)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(0, 102, 204)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });

    // 滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s forwards';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .advantage-card, .company-container').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // 统计数字动画
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(value => {
        const target = +value.innerText.replace(/[^0-9.-]/g, '');
        const suffix = value.innerText.replace(/[0-9.-]/g, '');
        let current = 0;

        if (value.innerText.includes('-')) {
            current = target * 2;
        }

        const updateStat = () => {
            let increment = target / 30;

            if (value.innerText.includes('-')) {
                current = Math.max(current - Math.abs(increment), target);
            } else {
                current = Math.min(current + increment, target);
            }

            value.innerText = value.innerText.includes('-') ?
                `-${Math.abs(Math.round(current))}${suffix}` :
                `${Math.round(current)}${suffix}`;

            if ((value.innerText.includes('-') && current > target) ||
                (!value.innerText.includes('-') && current < target)) {
                requestAnimationFrame(updateStat);
            }
        };

        setTimeout(updateStat, 500);
    });
});

// ======================== end hero ========================


// ======================== core ========================

    document.addEventListener('DOMContentLoaded', function() {
    const cube = document.getElementById('cube');
    const controlItems = document.querySelectorAll('.control-item');
    let isDragging = false;
    let startX, startY;
    let rotateX = -25;
    let rotateY = -25;
    let autoRotate = false;
    let animationId;

    const views = {
    front: { x: -25, y: -25 },
    back: { x: -25, y: 155 },
    right: { x: -25, y: -115 },
    left: { x: -25, y: 65 },
    top: { x: -115, y: -25 },
    bottom: { x: 65, y: -25 }
};

    const details = {
    front: document.getElementById('front-detail'),
    back: document.getElementById('back-detail'),
    right: document.getElementById('right-detail'),
    left: document.getElementById('left-detail'),
    top: document.getElementById('top-detail'),
    bottom: document.getElementById('bottom-detail')
};

    // 设置立方体旋转
    function rotateCube(x, y) {
    cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
}

    // 初始旋转
    rotateCube(rotateX, rotateY);

    // 更新详细描述
    function updateDetail(view) {
    // 隐藏所有描述
    Object.values(details).forEach(detail => {
    if (detail) detail.style.display = 'none';
});

    // 显示当前视图的描述
    if (details[view]) {
    details[view].style.display = 'block';
}

    // 更新控制按钮状态
    controlItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-view') === view) {
    item.classList.add('active');
}
});
}

    // 初始显示正面描述
    updateDetail('front');

    // 控制按钮事件
    controlItems.forEach(item => {
    item.addEventListener('click', function() {
    const view = this.getAttribute('data-view');

    rotateX = views[view].x;
    rotateY = views[view].y;

    rotateCube(rotateX, rotateY);
    updateDetail(view);
});
});

    // 鼠标拖动事件
    cube.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    autoRotate = false;
});

    document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    rotateY += deltaX * 0.5;
    rotateX -= deltaY * 0.5;

    rotateCube(rotateX, rotateY);

    startX = e.clientX;
    startY = e.clientY;
});

    document.addEventListener('mouseup', function() {
    isDragging = false;
    // 简单判断当前视图
    if (rotateX > 30) {
    updateDetail('top');
} else if (rotateX < -30) {
    updateDetail('bottom');
} else if (Math.abs(rotateY) < 45) {
    updateDetail('front');
} else if (rotateY > 45 && rotateY < 135) {
    updateDetail('right');
} else if (rotateY > 135 || rotateY < -135) {
    updateDetail('back');
} else {
    updateDetail('left');
}
});

    // 触摸设备支持
    cube.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    autoRotate = false;
    e.preventDefault();
});

    document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;

    rotateY += deltaX * 0.5;
    rotateX -= deltaY * 0.5;

    rotateCube(rotateX, rotateY);

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    e.preventDefault();
});

    document.addEventListener('touchend', function() {
    isDragging = false;
    // 简单判断当前视图
    if (rotateX > 30) {
    updateDetail('top');
} else if (rotateX < -30) {
    updateDetail('bottom');
} else if (Math.abs(rotateY) < 45) {
    updateDetail('front');
} else if (rotateY > 45 && rotateY < 135) {
    updateDetail('right');
} else if (rotateY > 135 || rotateY < -135) {
    updateDetail('back');
} else {
    updateDetail('left');
}
});
});


// ======================== end core ========================


// ===================================== sidebar ==================================

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-mes");
    const navList = document.getElementById("mes-List");

    toggleBtn.addEventListener("click", function () {
        navList.classList.toggle("collapsed");
    });
});

// ======================================== end sidebar ==========================