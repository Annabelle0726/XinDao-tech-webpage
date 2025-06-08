// ===================== pain =====================

function makeCrackDraggable(crack) {
    let isDragging = false;
    let isClick = true;
    let offsetX = 0, offsetY = 0;
    let startX = 0, startY = 0;

    crack.style.position = 'absolute';
    crack.style.cursor = 'grab';

    const wall = document.querySelector('.energy-wall');

    const onMouseMove = (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            isClick = false;

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // 限制在 wall 内
            const maxX = wall.clientWidth - crack.offsetWidth;
            const maxY = wall.clientHeight - crack.offsetHeight;

            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));

            crack.style.left = `${newX}px`;
            crack.style.top = `${newY}px`;

            drawHookConnectors();
        }
    };

    const onMouseUp = () => {
        if (!isDragging) return;
        isDragging = false;
        crack.style.cursor = 'grab';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (isClick) crack.click();
    };

    crack.addEventListener('mousedown', (e) => {
        isDragging = true;
        isClick = true;

        offsetX = e.clientX - crack.offsetLeft;
        offsetY = e.clientY - crack.offsetTop;
        startX = e.clientX;
        startY = e.clientY;

        crack.style.cursor = 'grabbing';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

function initCrackAnimations() {
    const cracks = document.querySelectorAll('.wall-crack');

    cracks.forEach((crack, index) => {
        crack.style.opacity = '0';
        crack.style.transform = 'scale(0.8)';
        crack.style.transition = 'all 0.5s ease-out';

        setTimeout(() => {
            crack.style.opacity = '1';
            crack.style.transform = 'scale(1)';
        }, 300 * index);

        makeCrackDraggable(crack);
    });

    drawHookConnectors();
}

function drawHookConnectors() {
    const connectors = document.querySelector('.connectors');
    const wall = document.querySelector('.energy-wall');
    const cracks = document.querySelectorAll('.wall-crack');

    connectors.innerHTML = '';

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", `0 0 ${wall.offsetWidth} ${wall.offsetHeight}`);
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.zIndex = "1";
    connectors.appendChild(svg);

    const centerX = wall.offsetWidth / 2;
    const centerY = wall.offsetHeight / 2;

    cracks.forEach(crack => {
        const crackRect = crack.getBoundingClientRect();
        const wallRect = wall.getBoundingClientRect();

        const crackCenterX = crackRect.left - wallRect.left + crackRect.width / 2;
        const crackCenterY = crackRect.top - wallRect.top + crackRect.height / 2;

        const dx = centerX - crackCenterX;
        const dy = centerY - crackCenterY;
        const offsetX = Math.abs(dx) * 0.3;
        const offsetY = Math.abs(dy) * 0.3;

        let pathD = `M ${crackCenterX} ${crackCenterY}`;

        if (crackCenterX < centerX && crackCenterY < centerY) {
            pathD += ` C ${crackCenterX + offsetX} ${crackCenterY} ${centerX} ${crackCenterY + offsetY} ${centerX} ${centerY}`;
        } else if (crackCenterX > centerX && crackCenterY < centerY) {
            pathD += ` C ${crackCenterX - offsetX} ${crackCenterY} ${centerX} ${crackCenterY + offsetY} ${centerX} ${centerY}`;
        } else if (crackCenterX < centerX && crackCenterY > centerY) {
            pathD += ` C ${crackCenterX} ${crackCenterY - offsetY} ${crackCenterX + offsetX} ${centerY} ${centerX} ${centerY}`;
        } else if (crackCenterX > centerX && crackCenterY > centerY) {
            pathD += ` C ${crackCenterX} ${crackCenterY - offsetY} ${crackCenterX - offsetX} ${centerY} ${centerX} ${centerY}`;
        } else {
            // 垂直方向连线
            pathD += ` L ${crackCenterX} ${crackCenterY + 50}`;
            pathD += ` C ${crackCenterX} ${crackCenterY + 50} ${centerX} ${crackCenterY + 50} ${centerX} ${centerY}`;
        }

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathD);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "var(--energy-danger)");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("stroke-dasharray", "10,5");
        path.setAttribute("opacity", "0");

        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = "stroke-dashoffset 1.5s ease-in-out, opacity 0.5s ease";

        svg.appendChild(path);

        // 启动动画
        requestAnimationFrame(() => {
            path.style.strokeDashoffset = "0";
            path.style.opacity = "0.7";
        });
    });
}

function initAccordions() {
    const impactHeaders = document.querySelectorAll('.impact-header');

    impactHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const current = this.closest('.crack-impact');

            // 关闭其他所有手风琴
            document.querySelectorAll('.crack-impact.active').forEach(item => {
                if (item !== current) {
                    item.classList.remove('active');
                }
            });

            // 切换当前项
            current.classList.toggle('active');
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    initCrackAnimations();
    initAccordions();

    window.addEventListener('resize', function() {
        drawHookConnectors();
    });
});

// ======================= end pain ==================================



// ======================= core ==================================

// 创建电路板背景
function createCircuitBoard() {
    const container = document.getElementById('circuit');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 创建水平线
    for (let y = 100; y < height; y += 120) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        line.style.width = `${width}px`;
        line.style.height = '1px';
        line.style.top = `${y}px`;
        line.style.left = '0';
        container.appendChild(line);
    }

    // 创建垂直线
    for (let x = 100; x < width; x += 120) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        line.style.width = '1px';
        line.style.height = `${height}px`;
        line.style.left = `${x}px`;
        line.style.top = '0';
        container.appendChild(line);
    }

    // 创建节点
    for (let y = 80; y < height; y += 120) {
        for (let x = 80; x < width; x += 120) {
            if (Math.random() > 0.7) {
                const node = document.createElement('div');
                node.className = 'circuit-node';
                node.style.top = `${y}px`;
                node.style.left = `${x}px`;
                container.appendChild(node);
            }
        }
    }
}

// 创建连接线
function createConnections() {
    const nodes = [
        {id: 1, element: document.querySelector('.node-1')},
        {id: 2, element: document.querySelector('.node-2')},
        {id: 3, element: document.querySelector('.node-3')},
        {id: 4, element: document.querySelector('.node-4')},
        {id: 5, element: document.querySelector('.node-5')},
        {id: 6, element: document.querySelector('.node-6')},
        {id: 7, element: document.querySelector('.node-7')},
        {id: 8, element: document.querySelector('.node-8')}
    ];

    const central = document.querySelector('.energy-central');
    const container = document.querySelector('.core-highlights-container');

    const centralRect = central.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const centralX = centralRect.left - containerRect.left + centralRect.width / 2;
    const centralY = centralRect.top - containerRect.top + centralRect.height / 2;

    nodes.forEach(node => {
        const nodeRect = node.element.getBoundingClientRect();
        const nodeX = nodeRect.left - containerRect.left + nodeRect.width / 2;
        const nodeY = nodeRect.top - containerRect.top + nodeRect.height / 2;

        const dx = nodeX - centralX;
        const dy = nodeY - centralY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        const connection = document.createElement('div');
        connection.className = 'energy-connection';
        connection.style.width = `${distance}px`;
        connection.style.transform = `rotate(${angle}deg)`;
        connection.style.left = `${centralX}px`;
        connection.style.top = `${centralY}px`;
        container.appendChild(connection);

        const pulseDot = document.createElement('div');
        pulseDot.className = 'pulse-dot';
        pulseDot.style.left = `${centralX}px`;
        pulseDot.style.top = `${centralY}px`;
        pulseDot.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(pulseDot);

        const flowEffect = document.createElement('div');
        flowEffect.className = 'flow-effect';
        flowEffect.style.position = 'absolute';
        flowEffect.style.width = '20px';
        flowEffect.style.height = '3px';
        flowEffect.style.background = 'var(--energy-accent)';
        flowEffect.style.borderRadius = '3px';
        flowEffect.style.left = '0';
        flowEffect.style.top = '0';
        flowEffect.style.animation = `flow ${3 + Math.random() * 2}s linear infinite`;
        connection.appendChild(flowEffect);
    });
}


// 手风琴效果
function setupAccordion() {
    const nodes = document.querySelectorAll('.core-node');

    nodes.forEach(node => {
        const header = node.querySelector('.node-header');

        header.addEventListener('click', function () {
            // 如果点击的是当前活动节点，则关闭它
            if (node.classList.contains('active')) {
                node.classList.remove('active');
            } else {
                // 关闭所有其他节点
                nodes.forEach(n => n.classList.remove('active'));
                // 打开当前节点
                node.classList.add('active');
            }
        });
    });
}

// 初始化函数
function init() {
    createCircuitBoard();
    createConnections();
    setupAccordion();

    // 添加节点动画
    const nodes = document.querySelectorAll('.core-node');
    nodes.forEach((node, index) => {
        node.style.opacity = "0";
        node.style.transform = "scale(0.8)";

        setTimeout(() => {
            node.style.opacity = "1";
            node.style.transform = "scale(1)";
            node.style.transition = "all 0.5s ease-out";
        }, 300 * index);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 窗口大小变化时重新创建电路板
window.addEventListener('resize', function () {
    const circuit = document.getElementById('circuit');
    circuit.innerHTML = '';
    createCircuitBoard();

    const connections = document.querySelectorAll('.energy-connection, .pulse-dot, .flow-effect');
    connections.forEach(el => el.remove());
    createConnections();
});
// ===================================== end core ==================================


// ===================================== benefits ==================================

// 手风琴效果
function setupAccordion2() {
    const modules = document.querySelectorAll('.benefit-module');

    modules.forEach(module => {
        const toggle = module.querySelector('.toggle-details');

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();

            // 如果点击的是当前活动模块，则关闭它
            if (module.classList.contains('active')) {
                module.classList.remove('active');
            } else {
                // 关闭所有其他模块
                modules.forEach(m => m.classList.remove('active'));
                // 打开当前模块
                module.classList.add('active');
            }
        });
    });
}

// 创建能源流动
function createEnergyFlows() {
    const station = document.querySelector('.energy-station');

    // 创建更多管道
    for (let i = 0; i < 8; i++) {
        const topPos = 20 + (i % 4) * 20;
        const isLeft = i < 4;
        const leftPos = isLeft ? '25%' : '75%';
        const rotation = isLeft ? 0 : 180;

        const pipeline = document.createElement('div');
        pipeline.className = 'energy-pipeline';
        pipeline.style.top = `${topPos}%`;
        pipeline.style.left = leftPos;
        pipeline.style.width = '200px';
        pipeline.style.transform = `rotate(${rotation}deg)`;
        station.appendChild(pipeline);

        const flow = document.createElement('div');
        flow.className = 'energy-flow';
        flow.style.top = `${topPos}%`;
        flow.style.left = isLeft ? '25%' : '75%';
        flow.style.animationDelay = `${i * 0.3}s`;
        station.appendChild(flow);
    }
}

// 初始化动画
function initAnimations() {
    const modules = document.querySelectorAll('.benefit-module');

    modules.forEach((module, index) => {
        module.style.opacity = '0';
        module.style.transform = 'translateY(30px)';

        setTimeout(() => {
            module.style.opacity = '1';
            module.style.transform = 'translateY(0)';
            module.style.transition = 'all 0.5s ease-out';
        }, 300 * index);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    setupAccordion2();
    createEnergyFlows();
    initAnimations();
});

// ===================================== end benefits ==================================

// ===================================== sidebar ==================================

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-ems");
    const navList = document.getElementById("ems-List");

    toggleBtn.addEventListener("click", function () {
        navList.classList.toggle("collapsed");
    });
});

// ======================================== end sidebar ==========================