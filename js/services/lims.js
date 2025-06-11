// hero
// ============================ count ===================================================

const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const speed = 20;
        const increment = Math.ceil(target / speed);

        if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, 40);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});


// =================== 架构图 ==================

const itemDescriptions = {
    "供应商合格率": "统计各类供应商质检通过情况",
    "SPC分析": "利用统计过程控制发现异常波动",
    "产品合格率": "产品质检合格比率分析",
    "质量偏离": "分析检测数据偏离标准范围的情况",
    "质量数据分布": "展示检测数据的整体分布趋势",
    "质量日报": "每日质量数据的综合汇总",
    "质量月报": "每月质量趋势分析",
    "质量损失": "因质量问题造成的经济损失统计",
    "风险监控": "监控潜在质量或合规风险",
    "抽检计划": "制定和管理抽样检测计划",
    "客户管理": "客户信息和质量反馈管理",
    "风险检查": "开展高风险区域的专项质量排查",

    "生产报检": "生产环节提交检测申请",
    "样品提醒": "提醒待检测样品任务",
    "样品管理": "样品入库、出库和留样记录",
    "结果审批": "检测结果的确认与审核流程",
    "异常处理": "检测异常的分类与处理机制",
    "成本核算": "检测服务的成本计算与分摊",
    "调配半成品/环境": "检测前物料或环境的准备工作",
    "样品接收": "检测中心接收样品入库",
    "结果录入": "人工或自动采集检测结果",
    "异常提醒": "自动预警检测异常数据",
    "留样管理": "对留样的保存与追溯管理",
    "签名签章": "检测记录电子签名、签章留痕",
    "委托/临时加样": "客户委托样品或紧急加样处理",
    "任务分配": "检测任务按能力自动分配",
    "数据采集": "仪器或接口自动采集检测数据",
    "报告审批": "检测报告的逐级审批流程",
    "变更管理": "对检测方法/流程变更的控制",
    "委外管理": "委外检测任务的全过程管控",

    "人员管理": "实验人员基本信息与资质管理",
    "设备管理": "实验设备生命周期管理",
    "耗材管理": "实验耗材的库存与领用",
    "方法标准": "检测方法与国家标准管理",
    "项目管理": "检测项目立项与流程管理",
    "能力库管理": "人员检测能力的能力矩阵配置",
    "原料检验": "原料入厂的质量检测流程",
    "方法验证": "新检测方法的验证及记录",
    "外部送检": "外部实验室样品检测管理",
    "包装验证": "包装材料的质量合规验证",

    "质量监控": "全过程质量监控数据汇总",
    "内部审核": "内部质量体系自查",
    "管理评审": "管理层对质量工作的评估",
    "不符合项": "识别并记录不符合项",
    "纠正措施": "对质量问题的纠正方案",
    "新公正性": "体系的独立性和公正性管理",
    "不确定度": "检测过程误差估计",
    "能力验证": "外部检测比对确保能力稳定",
    "满意度调查": "客户反馈调查与分析",
    "外部审核": "接受外部质量审核",
    "风险和机遇": "基于ISO的风险管理思路",

    "组织架构": "配置系统组织结构",
    "用户管理": "系统用户账号管理",
    "角色管理": "定义各类用户的功能权限",
    "权限管理": "精细化权限配置与控制",
    "日志管理": "系统操作记录追踪",
    "移动应用": "支持移动端质检作业",
    "多语言": "支持多语言国际化配置",
    "审计追踪": "关键行为的审计日志管理",
    "消息中心": "系统内消息推送与提醒",
    "电子签名": "电子化签名，满足法规要求",
    "安全管理": "系统访问与数据安全控制",
    "系统配置": "平台参数与模块启用配置",
    "报表工具": "配置化报表生成与导出",
    "工作流": "流程建模与任务驱动执行"
};

document.addEventListener('DOMContentLoaded', () => {
    const MAX_TOASTS = 3;
    let activeToasts = [];
    // 新增：记录当前正在显示的 Toast 对应的 item
    const activeToastItems = new Set();

    function createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    const toastContainer = document.querySelector('.toast-container') || createToastContainer();

    function removeToast(toast, item) {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
            activeToasts = activeToasts.filter(t => t !== toast);
            // 移除时从 Set 中删除对应 item
            if (item) activeToastItems.delete(item);
        }, 400);
    }

    function showToast(message, item = null) {
        // 新增：如果这个 item 已经有 Toast 在显示，则不再创建
        if (item && activeToastItems.has(item)) return;

        while (activeToasts.length >= MAX_TOASTS) {
            removeToast(activeToasts[0]);
        }

        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.innerHTML = `<div class="toast-content">${message}</div>`;

        toastContainer.appendChild(toast);
        activeToasts.push(toast);
        // 新增：记录这个 item 有 Toast 在显示
        if (item) activeToastItems.add(item);

        setTimeout(() => toast.classList.add('show'), 10);

        const autoRemove = setTimeout(() => {
            removeToast(toast, item);
        }, 4000);
    }

    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();

            const key = item.getAttribute('data-desc');
            const value = itemDescriptions[key];
            // 修改：传入当前点击的 item 作为参数
            showToast(value ? `${key}: ${value}` : key, item);
        });
    });
});

// =================== end architecture ========================



// ------------------------------ core --------------------------------------- js animation
// wave
function initDataWave() {
    const canvas = document.getElementById('dataWaveCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    let phase = 0;

    // 动态计算波浪高度
    function calculateAmplitude() {
        return window.innerWidth > 768 ? 12 : 8;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 主波浪线（科技蓝）
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(72, 202, 228, 0.7)';
        ctx.lineWidth = 2;
        for (let x = 0; x < canvas.width; x++) {
            const y = Math.sin(x * 0.03 + phase) * calculateAmplitude() + 30;
            ctx.lineTo(x, y);
        }
        ctx.stroke();

        // 辅助波纹（浅色光晕）
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(202, 240, 248, 0.3)';
        ctx.lineWidth = 4;
        for (let x = 0; x < canvas.width; x++) {
            const y = Math.sin(x * 0.03 + phase + 1) * (calculateAmplitude() - 2) + 30;
            ctx.lineTo(x, y);
        }
        ctx.stroke();

        phase += 0.08;
        requestAnimationFrame(draw);
    }

    function updateIntegrity() {
        let value = 97.5; // 初始值更高
        const element = document.getElementById('integrityValue');
        const meter = document.getElementById('integrityMeter');

        const interval = setInterval(() => {
            // 波动增长算法（最终趋近100%）
            value = Math.min(100, value + (Math.random() * 0.15 - 0.05));
            element.textContent = value.toFixed(1);

            // 更新仪表圆环
            const dashValue = (value / 100) * 50; // 周长计算
            meter.setAttribute('stroke-dasharray', `${dashValue} 100`);

            // 颜色反馈
            if (value > 99) {
                meter.setAttribute('stroke', '#4cc9f0');
            } else if (value > 95) {
                meter.setAttribute('stroke', '#00b4d8');
            }
        }, 1800);
    }

    draw();
    updateIntegrity();
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
    });
}

// 页面加载后启动
document.addEventListener('DOMContentLoaded', initDataWave);

// -------------------------------------- 智能采样路径动画集成 ----------------------------------------------------
function animateSamplePath() {
    const path = document.getElementById('samplePath');
    const dot = document.getElementById('sampleDot');
    const pathLength = path.getTotalLength();

    // 初始化路径
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    // 使用GSAP动画
    gsap.to(path, {
        strokeDashoffset: 0,
        duration: 6,
        ease: "power2.inOut",
        onComplete: () => {
            // 路径绘制完成后启动圆点动画
            gsap.to(dot, {
                motionPath: {
                    path: "#samplePath",
                    align: "#samplePath"
                },
                duration: 8,
                repeat: -1,
                ease: "none"
            });
        }
    });
}

// 滚动到该区域时触发
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateSamplePath();
            observer.unobserve(entries[0].target);
        }
    }, {threshold: 0.3});

    observer.observe(document.querySelector('.sample-path-container'));
});

// =========================================================================================

// flip card
document.querySelectorAll('.timeline-item').forEach(step => {
    const dot = step.querySelector('.timeline-dot');
    const card = step.querySelector('.flip-card-inner');

    dot.addEventListener('click', () => {
        const isActive = dot.classList.contains('active');

        // 清除所有
        document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('active'));
        document.querySelectorAll('.flip-card-inner').forEach(c => c.classList.remove('flipped'));

        // 激活当前（如果之前不是 active）
        if (!isActive) {
            dot.classList.add('active');
            card.classList.add('flipped');
        }
    });
});

//  --------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.pain-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.3});

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
});

// ========================= end core ================================================================




// process
// =============================== 采集动画 ========================== 

document.addEventListener("DOMContentLoaded", function () {
    function animateStat(stat) {
        const target = +stat.dataset.target;
        const hasPercent = stat.textContent.includes('%');
        let current = 0;
        const stepSize = 0.5; // 控制速度：值越小越慢
        const interval = 30; // 控制渲染间隔（毫秒）

        const updateValue = () => {
            current = Math.min(current + stepSize, target);
            stat.textContent = Math.floor(current) + (hasPercent ? '%' : '');

            if (current < target) {
                setTimeout(updateValue, interval); // 改用setTimeout控制帧率
            }
        };

        updateValue();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-value').forEach(animateStat);
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});

    const section = document.querySelector('.stats-section');
    if (section) observer.observe(section);
});

// highlights
// ================================ 切换内容 ================================

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.highlight-item');
    const details = document.querySelectorAll('.highlight-detail');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const index = item.getAttribute('data-index');

            // 1. 左侧高亮
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 2. 切换右侧内容
            details.forEach(detail => {
                if (detail.getAttribute('data-index') === index) {
                    detail.classList.add('active');
                } else {
                    detail.classList.remove('active');
                }
            });
        });
    });
});
// ========================================== end highlights ========================================



// ========================================== sidebar ========================================

// 字颜色
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("lims-sidebar");

    if (!sidebar) return; // 如果没找到元素，提前退出

    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const threshold = window.innerHeight * 0.5;

        if (scrollY > threshold) {
            sidebar.classList.add("dark-hero-mode");
        } else {
            sidebar.classList.remove("dark-hero-mode"); // 其余变亮
        }
    });
});


// sidebar toggle
document.getElementById("toggle-lims").addEventListener("click", function () {
    const list = document.getElementById("limsList");
    list.style.display = list.style.display === "none" ? "block" : "none";
});
