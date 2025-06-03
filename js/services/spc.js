
// =================================== process ==========================================

// 页面加载后初始化动画
document.addEventListener('DOMContentLoaded', function() {
    // 初始化GSAP插件
    gsap.registerPlugin(ScrollTrigger);

    // 设置流程卡片动画
    gsap.utils.toArray('.process-group').forEach((group, index) => {
        gsap.from(group, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: group,
                start: "top 85%"
            }
        });
    });

    // 设置流程步骤动画
    gsap.utils.toArray('.phase-step').forEach((step, index) => {
        gsap.from(step, {
            opacity: 0,
            x: -20,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: step,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    // 设置服务卡片动画
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top 90%"
            }
        });
    });

    // 设置图标动画
    gsap.utils.toArray('.service-icon').forEach((icon) => {
        gsap.to(icon, {
            y: 5,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "power1.inOut"
        });
    });

    // 设置流程线动画
    const processLine = document.querySelector('.process-line');
    gsap.to(processLine, {
        height: "100%",
        scrollTrigger: {
            trigger: ".process-container",
            start: "top center",
            end: "bottom center",
            scrub: 1
        }
    });
});


// =========================== end process ============================



// ======================= ad =============================


    document.querySelectorAll('#spc-advantages .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // 切换按钮高亮
        document.querySelectorAll('#spc-advantages .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 切换内容
        const tabId = btn.getAttribute('data-tab');
        document.querySelectorAll('#spc-advantages .tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.querySelector(`#spc-advantages #${tabId}`).classList.add('active');
    });
});



// ========================== end ad =========================

// ============================ toast =======================================


const itemDescriptions = {
    "生产数据采集": "采集生产过程实时数据",
    "SPC控制图分析": "生成X̄-R等控制图分析过程",
    "质量趋势监控": "监控产品质量变化趋势",
    "过程能力分析": "评估生产过程能力指数",
    "统计报表生成": "自动生成质量统计报表",
    "实时数据监控": "监控生产数据实时变化",
    "历史数据查询": "查询历史质量数据记录",
    "异常数据标记": "自动标记异常数据点",
    "数据导出": "导出数据到外部文件",
    "数据导入": "从文件导入历史数据",
    "X̄-R 控制图": "监控均值和极差变化",
    "P 控制图": "监控不合格品率变化",
    "C 控制图": "监控缺陷数量变化",
    "CUSUM 控制图": "累积和检测微小偏移",
    "EWMA 控制图": "指数加权移动平均检测",
    "数据滤波处理": "过滤噪声干扰数据",
    "极差计算": "计算样本极差值",
    "统计分析报告": "生成过程能力报告",
    "过程趋势预测": "基于历史数据预测",
    "异常波动检测": "识别过程异常波动",
    "超限报警": "参数超限时触发报警",
    "趋势报警": "检测趋势性异常变化",
    "邮件通知": "通过邮件发送报警信息",
    "短信通知": "通过短信发送报警信息",
    "现场声光报警": "触发现场报警装置",
    "用户权限管理": "配置系统访问权限",
    "角色配置": "管理系统用户角色",
    "报警阈值设置": "调整报警触发条件",
    "图表模板管理": "自定义可视化模板",
    "操作日志审计": "记录系统操作日志",
    "移动监控看板": "手机端查看监控数据",
    "实时过程曲线": "显示实时过程曲线图",
    "报警推送": "推送报警信息到终端",
    "MES系统集成": "对接制造执行系统",
    "ERP系统集成": "对接企业资源系统",
    "设备数据对接": "连接生产设备数据"
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


// =================================== end toast =========================================


// ======================================== compact ============================================


document.addEventListener('DOMContentLoaded', function () {
    // 初始化GSAP插件
    gsap.registerPlugin(ScrollTrigger);

    // 设置雷达图动画
    const radarArea = document.getElementById('radar-area');
    gsap.to(radarArea, {
        clipPath: "polygon(50% 0%, 10% 100%, 90% 100%)",
        scrollTrigger: {
            trigger: "#benefits",
            start: "top center",
            end: "bottom center",
            scrub: 1
        }
    });

    // 设置痛点卡片动画
    gsap.utils.toArray('.pain-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top 90%"
            }
        });
    });

    // 设置效益卡片动画
    gsap.utils.toArray('.benefit-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top 90%"
            }
        });
    });

    // 设置时间线动画
    gsap.utils.toArray('.timeline-content').forEach((content, index) => {
        gsap.from(content, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.3,
            scrollTrigger: {
                trigger: content,
                start: "top 90%"
            }
        });
    });

    // 设置统计数字动画
    gsap.utils.toArray('.stat-value').forEach((stat) => {
        const targetValue = parseFloat(stat.textContent);
        let currentValue = 0;

        gsap.to({}, {
            duration: 2,
            scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            onUpdate: function () {
                currentValue = gsap.utils.interpolate(currentValue, targetValue, 0.1);
                stat.textContent = Math.round(currentValue) + (stat.textContent.includes('%') ? '%' : '');
            }
        });
    });
});

// ================================= end compact ====================================

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // 滚动时触发动画
    window.addEventListener('scroll', function () {
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.8;

            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // 初始触发一次
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 300);
});



// ===================== sidebar ======================

// sidebar toggle

document.getElementById("toggle-spc").addEventListener("click", function () {
    const list = document.getElementById("spcList");
    list.style.display = list.style.display === "none" ? "block" : "none";
});


