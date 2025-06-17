

// =============================================== consulting ==============================================
// ============================================= hero =====================

// ================================ end hero=====================================


// ================================ products ===========================================

// ================================= end products ============================================






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

window.addEventListener('load', createConnectors);
window.addEventListener('resize', function () {
    document.querySelector('.connectors')?.remove();
    createConnectors();
});
// ========================== end loop =================================
document.addEventListener('DOMContentLoaded', function () {

    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('click', function (e) {
            /* 如果已有 .ripple 元素，复用；否则先创建 */
            let ripple = this.querySelector('.ripple');
            if (!ripple) {
                ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
            }
            /* 确保每次点击都重置动画 */
            ripple.classList.remove('animate');

            /* 计算波纹半径及位置 */
            const rect = this.getBoundingClientRect();
            const diameter = Math.max(rect.width, rect.height);
            const radius = diameter / 2;
            ripple.style.width = ripple.style.height = `${diameter}px`;
            const offsetX = e.clientX - rect.left - radius;
            const offsetY = e.clientY - rect.top - radius;
            ripple.style.left = `${offsetX}px`;
            ripple.style.top = `${offsetY}px`;

            /* 触发动画 */
            ripple.classList.add('animate');

            /* 如果需要在点击后展开或折叠更多信息，可在此添加逻辑 */
            // this.classList.toggle('expanded');
        });
    });

    /* =============================
       3. 可选：为 value-item 添加点击展开/折叠详细内容
       ============================= */
    // 如需“点击展开/折叠”功能，可利用以下示例逻辑，并在 CSS 中配合 .expanded 类设置更多样式
    /*
    valueItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
            // CSS 中可针对 .value-item.expanded 设置额外样式，例如修改高度、背景色，或显示隐藏内容等
        });
    });
    */
});
// ========================================== end consulting =================================================



// ========================================= toast==================================================
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
// ========================== end toast ===============================


// =========================== foundation =======================

// 基础建设标签切换功能
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#foundation .tab-label').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('#foundation .tab-label').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll('#foundation .content-item').forEach(item => item.classList.remove('active'));

            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');

            const colors = [
                'linear-gradient(145deg, rgba(23, 42, 69, 0.9), rgba(18, 35, 58, 0.85))',
                'linear-gradient(145deg, rgba(25, 45, 75, 0.9), rgba(20, 38, 65, 0.85))',
                'linear-gradient(145deg, rgba(28, 50, 85, 0.9), rgba(23, 42, 70, 0.85))',
                'linear-gradient(145deg, rgba(30, 55, 90, 0.9), rgba(25, 45, 75, 0.85))'
            ];

            const index = Array.from(this.parentElement.children).indexOf(this);
            document.getElementById('foundation').style.background = colors[index];
        });
    });
});
// =========================== end foundation =======================

// ========================== intelligent ===============================

function createConnections() {
    const container = document.querySelector('.pentagon-container');
    const center = document.querySelector('.center-area');
    const items = document.querySelectorAll('.ring-item');

    // 如果不存在或条件不满足则跳过
    if (!container || !center || items.length === 0) return;

    // 移动端不显示连接线（如 CSS 中已隐藏）
    if (window.innerWidth <= 768) return;

    // 清除旧连接线
    document.querySelector('.connections')?.remove();

    // 创建新的 SVG 容器
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("connections");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    Object.assign(svg.style, {
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "1"
    });
    container.appendChild(svg);

    // 计算中心点
    const centerRect = center.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2 - containerRect.left;
    const centerY = centerRect.top + centerRect.height / 2 - containerRect.top;

    // 绘制每条连接线
    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemX = itemRect.left + itemRect.width / 2 - containerRect.left;
        const itemY = itemRect.top + itemRect.height / 2 - containerRect.top;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.classList.add("connection");
        line.setAttribute("x1", centerX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", itemX);
        line.setAttribute("y2", itemY);
        svg.appendChild(line);
    });
}

// 统一初始化和响应窗口变化
function initPentagonDiagram() {
    createConnections();
}

// 页面加载时初始化
window.addEventListener('load', initPentagonDiagram);

window.addEventListener('resize', initPentagonDiagram);


function setupMobileToggle() {
    if (window.innerWidth > 768) return;

    const items = document.querySelectorAll('.ring-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            // switch
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
}

window.addEventListener('load', setupMobileToggle);
window.addEventListener('resize', () => {
    document.querySelectorAll('.ring-item').forEach(i => i.classList.remove('active'));
    setupMobileToggle();
});

// ======================== end intelligent ===============================

// ======================= optimize =============================
document.addEventListener('DOMContentLoaded', function () {
    function enhanceNodeHover() {
        const nodes = document.querySelectorAll('.optimization-node');

        nodes.forEach(node => {
            const icon = node.querySelector('.node-icon');
            const title = node.querySelector('.node-title');
            const desc = node.querySelector('.node-desc');
            const stats = node.querySelectorAll('.stat-value');

            node.addEventListener('mouseenter', function () {
                icon.style.transform = 'scale(1.15)';
                icon.style.boxShadow = '0 0 40px rgba(0, 168, 255, 0.4)';
                icon.style.background = 'linear-gradient(135deg, rgba(0, 168, 255, 0.2), rgba(100, 181, 246, 0.25))';

                title.style.color = '#00a8ff';
                title.style.transform = 'translateY(-5px)';

                desc.style.color = '#0088cc';

                stats.forEach(stat => {
                    stat.style.transform = 'scale(1.2)';
                    stat.style.color = '#0066ff';
                });
            });

            node.addEventListener('mouseleave', function () {
                icon.style.transform = 'scale(1)';
                icon.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.1)';
                icon.style.background = 'linear-gradient(135deg, rgba(0, 168, 255, 0.1), rgba(100, 181, 246, 0.15))';

                title.style.color = '#0066cc';
                title.style.transform = 'translateY(0)';

                desc.style.color = '#336699';

                stats.forEach(stat => {
                    stat.style.transform = 'scale(1)';
                    stat.style.color = '#00a8ff';
                });
            });
        });
    }

    enhanceNodeHover();

    // 添加动态背景光效
    const container = document.querySelector('.optimization-container');
    let mouseX = 0, mouseY = 0;

    container.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const centralCircle = document.querySelector('.central-circle');
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (mouseX - centerX) / 50;
        const deltaY = (mouseY - centerY) / 50;

        centralCircle.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
    });
});
// ========================= end optimize ======================================


// =================================== sidebar =======================

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("dx-sidebar");
    const lightSections = ["architecture", "optimization"]; // 偏深色背景
    const darkSections = ["hero", "consulting", "framework","products", "foundation", "intelligent"]; // 偏浅色背景

    function getCurrentSection() {
        const scrollY = window.scrollY + window.innerHeight / 2;

        for (const id of [...lightSections, ...darkSections]) {
            const section = document.getElementById(id);
            if (section) {
                const rect = section.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const bottom = top + rect.height;
                if (scrollY > top && scrollY < bottom) {
                    return id;
                }
            }
        }
        return null;
    }

    function updateSidebarStyle() {
        const current = getCurrentSection();
        if (lightSections.includes(current)) {
            sidebar.classList.remove("dx-sidebar-dark");
        } else if (darkSections.includes(current)) {
            sidebar.classList.add("dx-sidebar-dark");
        }
    }

    window.addEventListener("scroll", updateSidebarStyle);
    updateSidebarStyle();
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-dx");
    const navList = document.getElementById("dx-List");

    toggleBtn.addEventListener("click", function () {
        navList.classList.toggle("collapsed");
    });
});
// ============================ end sidebar ========================