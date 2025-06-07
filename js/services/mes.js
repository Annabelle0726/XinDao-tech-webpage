// ======================== pain ========================

document.addEventListener("DOMContentLoaded", function () {
    // 设置进度条宽度
    const progressFills = document.querySelectorAll(".progress-fill");
    progressFills.forEach((fill) => {
        const width = fill.getAttribute("data-width");
        if (width) {
            fill.style.width = width;
        }
    });

    // 添加滚动动画
    const painpointCards = document.querySelectorAll('.painpoint-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.style.animation = `fadeInUp 0.8s ${delay}ms forwards`;
                }, delay);
            }
        });
    }, {threshold: 0.1});

    painpointCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.dataset.delay = index * 150;
        observer.observe(card);
    });

    // 绘制Z字型连线
    function drawZConnector() {
        const cards = document.querySelectorAll('.painpoint-card');
        if (cards.length < 6) return;

        const svg = document.querySelector('.z-connector');
        const path = svg.querySelector('.z-line');

        // 获取卡片位置
        const cardPositions = Array.from(cards).map(card => {
            const rect = card.getBoundingClientRect();
            const containerRect = svg.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2 - containerRect.left,
                y: rect.top + rect.height / 2 - containerRect.top
            };
        });

        // 创建Z字型路径
        let d = `M ${cardPositions[0].x} ${cardPositions[0].y}`;

        // 第一段到第二张卡
        d += ` L ${cardPositions[1].x} ${cardPositions[1].y}`;

        // 第二段到第三张卡
        d += ` L ${cardPositions[2].x} ${cardPositions[2].y}`;

        // 第三段到第四张卡
        d += ` L ${cardPositions[3].x} ${cardPositions[3].y}`;

        // 第四段到第五张卡
        d += ` L ${cardPositions[4].x} ${cardPositions[4].y}`;

        // 第五段到第六张卡
        d += ` L ${cardPositions[5].x} ${cardPositions[5].y}`;

        path.setAttribute('d', d);
    }

    drawZConnector();
    window.addEventListener('resize', drawZConnector);
});
// ======================== end pain ========================


// ======================== process ========================

function toggleCard(card) {
    if (card.classList.contains('active')) {
        card.classList.remove('active');
        return;
    }

    document.querySelectorAll('.mes-process-card').forEach(item => {
        item.classList.remove('active');
    });

    card.classList.add('active');
}

document.addEventListener('click', function (event) {
    if (!event.target.closest('.mes-process-card')) {
        document.querySelectorAll('.mes-process-card').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// ======================== end process ========================

// ======================== core ========================
document.addEventListener('DOMContentLoaded', function () {
    const cube = document.getElementById('cube');
    const controlItems = document.querySelectorAll('.control-item');
    let isDragging = false;
    let startX, startY;
    let rotateX = -25;
    let rotateY = -25;
    let autoRotate = false;
    let animationId;

    const views = {
        front: {x: -25, y: -25},
        back: {x: -25, y: 155},
        right: {x: -25, y: -115},
        left: {x: -25, y: 65},
        top: {x: -115, y: -25},
        bottom: {x: 65, y: -25}
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
        item.addEventListener('click', function () {
            const view = this.getAttribute('data-view');

            rotateX = views[view].x;
            rotateY = views[view].y;

            rotateCube(rotateX, rotateY);
            updateDetail(view);
        });
    });

    // 鼠标拖动事件
    cube.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        autoRotate = false;
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;

        rotateCube(rotateX, rotateY);

        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', function () {
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
    cube.addEventListener('touchstart', function (e) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        autoRotate = false;
        e.preventDefault();
    });

    document.addEventListener('touchmove', function (e) {
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

    document.addEventListener('touchend', function () {
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


// ======================== highlights ========================
document.addEventListener('DOMContentLoaded', function () {
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
                label: '实施芯导MES后',
                data: [95, 90, 95, 92, 88, 93],
                fill: true,
                backgroundColor: 'rgba(0, 201, 255, 0.2)',
                borderColor: 'rgb(0, 201, 255)',
                pointBackgroundColor: 'rgb(0, 201, 255)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(0, 201, 255)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        },
                        color: '#c2e0ff'
                    },
                    ticks: {
                        display: false,
                        stepSize: 20
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        },
                        color: '#c2e0ff'
                    }
                }
            }
        }
    });

    // 手风琴功能
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // 关闭所有项目
            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });

            // 如果点击的不是当前活动项，则打开它
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    const firstContent = document.querySelector('.accordion-item.active .accordion-content');
    firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
});
// ======================== end highlights ========================


// ===================================== benefits ==================================
document.addEventListener('DOMContentLoaded', function () {
    // 进度条动画
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });

    // 高亮术语悬停效果
    const terms = document.querySelectorAll('.highlight-term');
    terms.forEach(term => {
        term.addEventListener('mouseenter', function () {
            this.style.color = 'var(--highlight)';
            this.style.fontWeight = '700';
        });

        term.addEventListener('mouseleave', function () {
            this.style.color = '';
            this.style.fontWeight = '';
        });
    });
});

// 手风琴切换函数
function toggleAccordion(id, element) {
    const content = document.getElementById(id);
    const isActive = content.style.maxHeight && content.style.maxHeight !== '0px';

    // 关闭所有手风琴
    document.querySelectorAll('.accordion-content').forEach(item => {
        item.style.maxHeight = null;
    });

    // 重置所有切换按钮
    document.querySelectorAll('.accordion-toggle').forEach(toggle => {
        toggle.classList.remove('active');
        toggle.textContent = '查看更多详情';
    });

    // 打开当前手风琴
    if (!isActive) {
        content.style.maxHeight = content.scrollHeight + 'px';
        element.classList.add('active');
        element.textContent = '收起详情';
    }
}


// ===================================== benefits ==================================


// ===================================== sidebar ==================================
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-mes");
    const navList = document.getElementById("mes-List");

    toggleBtn.addEventListener("click", function () {
        navList.classList.toggle("collapsed");
    });
});

// ======================================== end sidebar ==========================