// ============================================= hero =====================

const canvas = document.getElementById('hero-bg');
const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 300;

const particlesCount = 2000; // 数量加大
const geometry = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particlesCount; i++) {
    positions.push(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000
    );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 3.5, // 放大粒子
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0004;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// ================================ end hero=====================================

// =========================== loop ======================================


// 添加悬停效果增强科技感
document.querySelectorAll('.path-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 15px 30px rgba(0, 114, 255, 0.4)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
});

// 创建科技感连接线
function createConnectors() {
    const container = document.querySelector('.path-container');
    const items = document.querySelectorAll('.path-item');
    const svgNS = "http://www.w3.org/2000/svg";

    // 创建SVG元素
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "connectors");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    container.appendChild(svg);

    // 在卡片之间创建连接线
    for (let i = 0; i < items.length - 1; i++) {
        const rect1 = items[i].getBoundingClientRect();
        const rect2 = items[i + 1].getBoundingClientRect();

        const containerRect = container.getBoundingClientRect();

        const x1 = rect1.right - containerRect.left;
        const y1 = rect1.top + rect1.height / 2 - containerRect.top;
        const x2 = rect2.left - containerRect.left;
        const y2 = rect2.top + rect2.height / 2 - containerRect.top;

        // 创建线条
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("class", "connector pulse");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        svg.appendChild(line);
    }
}

// 页面加载完成后创建连接线
window.addEventListener('load', createConnectors);
window.addEventListener('resize', function () {
    document.querySelector('.connectors')?.remove();
    createConnectors();
});


// ========================== end loop =================================


// 配置参数
const TOAST_CONFIG = {
    displayDuration: 3000,  // 显示持续时间 (ms)
    fadeDuration: 300,      // 淡出动画时间 (ms)
    maxToasts: 3            // 最大同时显示数量
};

let activeToasts = [];

function showToast(message) {
    // 新增：禁止重复触发逻辑
    if (activeToasts.length > 0) return;

    // 如果达到最大数量，移除最旧的 toast
    if (activeToasts.length >= TOAST_CONFIG.maxToasts) {
        const oldestToast = activeToasts.shift();
        hideToast(oldestToast);
    }

    // 创建 toast 元素
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;

    // 添加到容器和活动列表
    const container = document.querySelector('.toast-container') || createToastContainer();
    container.appendChild(toast);
    activeToasts.push(toast);

    // 延迟激活 show class
    setTimeout(() => toast.classList.add('show'), 10);

    // 设置自动隐藏
    const autoHide = setTimeout(() => {
        hideToast(toast);
    }, TOAST_CONFIG.displayDuration);

    // 点击提前关闭
    toast.addEventListener('click', () => {
        clearTimeout(autoHide);
        hideToast(toast);
    });
}

function hideToast(toast) {
    if (!toast) return;

    toast.classList.remove('show');
    toast.classList.add('hide');

    // 动画结束后移除
    setTimeout(() => {
        toast.remove();
        activeToasts = activeToasts.filter(t => t !== toast);
    }, TOAST_CONFIG.fadeDuration);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// 绑定点击事件
document.querySelectorAll('.item-only[data-desc]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const desc = item.getAttribute('data-desc');
        showToast(desc);
    });
});

// ===============================================================
// sidebar