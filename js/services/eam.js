// hero
// ==============================================

particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {enable: true, value_area: 800}
        },
        color: {value: "#00a8ff"},
        shape: {
            type: "circle",
            stroke: {width: 0, color: "#000000"},
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {enable: false}
        },
        size: {
            value: 3,
            random: true,
            anim: {enable: false}
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00a8ff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {enable: true, mode: "grab"},
            onclick: {enable: true, mode: "push"}
        },
        modes: {
            grab: {distance: 140, line_linked: {opacity: 0.5}},
            push: {particles_nb: 4}
        }
    },
    retina_detect: true
});

// pain cards
// ==================================================

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.stack-panel-cards');
    let cards = Array.from(cardContainer.querySelectorAll('.stack-panel-card'));
    let isAnimating = false;

    function getTransform(index) {
        if (index === 0) return 'translateY(0) rotateX(0) scale(1)';
        if (index === 1) return 'translateY(20px) rotateX(-6deg) scale(0.97)';
        if (index === 2) return 'translateY(40px) rotateX(-12deg) scale(0.94)';
        if (index === 3) return 'translateY(60px) rotateX(-18deg) scale(0.91)';
        if (index === 4) return 'translateY(80px) rotateX(-24deg) scale(0.88)';
        return `translateY(${index * 20}px) rotateX(-${index * 6}deg) scale(${1 - index * 0.03})`;
    }


    function updateStack() {
        cards.forEach((card, i) => {
            card.dataset.index = i;
            card.style.zIndex = cards.length - i;
            card.style.transform = getTransform(i);
            card.classList.remove('active', 'slide-out');
        });
        // 添加 active 到堆顶卡片
        if (cards[0]) {
            cards[0].classList.add('active');
        }
    }

    function handleCardClick() {
        if (isAnimating) return;
        isAnimating = true;

        const topCard = cards[0];
        topCard.classList.add('slide-out');

        // 等待动画结束后执行 DOM 顺序调整
        topCard.addEventListener('animationend', () => {
            topCard.classList.remove('slide-out');

            // 移动到数组最后
            cards.push(cards.shift());

            // 重新挂载顺序
            cards.forEach(card => cardContainer.appendChild(card));

            updateStack();
            isAnimating = false;
        }, {once: true});
    }


    // 添加点击事件（只允许顶部卡片点击）
    cardContainer.addEventListener('click', () => {
        handleCardClick();
    });

    // 初始化
    updateStack();
});


// ======================== ad ===================================

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".ad-card-inner");
    setTimeout(() => {
        cards.forEach(card => card.classList.add("enter"));
    }, 100); // 延迟100ms触发，确保页面元素加载
});

// ===================== end ad ============================

// ====================== process========================================
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.step-nav-item');
    const detailCard = document.querySelector('.step-detail-card');

    // 步骤数据
    const stepData = [
        {
            title: "设备主数据",
            icon: "fas fa-database",
            tasks: [
                "建立设备全生命周期档案，统一编码体系",
                "设备参数标准化，实现一机一档管理",
                "设备分类与资产树构建，建立层级关系",
                "设备技术文档与图纸电子化管理"
            ],
            stats: [
                {label: "实施周期", value: "10-15天"},
                {label: "数据准确率", value: "≥99%"},
                {label: "覆盖设备", value: "100%"},
                {label: "建档效率", value: "↑60%"}
            ]
        },
        {
            title: "库存管理",
            icon: "fas fa-boxes",
            tasks: [
                "备件分类与编码标准化",
                "库存动态可视化看板搭建",
                "智能补货策略与安全库存设置",
                "呆滞物料识别与处理机制"
            ],
            stats: [
                {label: "实施周期", value: "8-12天"},
                {label: "库存周转率", value: "+35%"},
                {label: "呆滞库存", value: "↓40%"},
                {label: "库存准确率", value: "↑55%"}
            ]
        },
        {
            title: "计划维护",
            icon: "fas fa-calendar-check",
            tasks: [
                "预防性维护计划模板配置",
                "基于设备状态的预测性维护",
                "维保日历与资源调度优化",
                "特种设备年检提醒与追踪"
            ],
            stats: [
                {label: "实施周期", value: "12-15天"},
                {label: "计划达成率", value: "↑45%"},
                {label: "意外停机", value: "↓60%"},
                {label: "维保效率", value: "↑50%"}
            ]
        },
        {
            title: "设备维修",
            icon: "fas fa-tools",
            tasks: [
                "故障报修移动化与流程闭环",
                "维修知识库与解决方案积累",
                "维修绩效与响应时效管理",
                "外协维修管理标准化"
            ],
            stats: [
                {label: "实施周期", value: "10-14天"},
                {label: "平均响应时间", value: "↓55%"},
                {label: "维修成本", value: "↓30%"},
                {label: "首次修复率", value: "↑65%"}
            ]
        },
        {
            title: "备件管理",
            icon: "fas fa-cogs",
            tasks: [
                "备件全生命周期跟踪管理",
                "领用与退库流程数字化",
                "备件消耗分析与预测",
                "供应商协同与采购优化"
            ],
            stats: [
                {label: "实施周期", value: "8-10天"},
                {label: "备件利用率", value: "↑50%"},
                {label: "采购成本", value: "↓25%"},
                {label: "库存周转", value: "↑40%"}
            ]
        },
        {
            title: "统计分析",
            icon: "fas fa-chart-line",
            tasks: [
                "设备OEE（综合效率）分析",
                "MTTR/MTBF关键指标监控",
                "维护成本多维分析",
                "自定义报表与数据看板"
            ],
            stats: [
                {label: "实施周期", value: "7-10天"},
                {label: "决策效率", value: "↑70%"},
                {label: "数据可视化", value: "100%"},
                {label: "报告生成时间", value: "↓80%"}
            ]
        },
        {
            title: "看板拉动",
            icon: "fas fa-tachometer-alt",
            tasks: [
                "车间级设备状态可视化看板",
                "移动端实时预警与通知",
                "Andon系统集成与异常响应",
                "绩效指标动态排名"
            ],
            stats: [
                {label: "实施周期", value: "5-8天"},
                {label: "问题响应速度", value: "↑80%"},
                {label: "异常处理时效", value: "↓65%"},
                {label: "停机通知时间", value: "↓90%"}
            ]
        }
    ];

    // 初始化第一个步骤为激活状态
    navItems[0].classList.add('active');

    // 添加点击事件
    navItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            // 移除所有激活状态
            navItems.forEach(nav => nav.classList.remove('active'));

            // 添加当前激活状态
            this.classList.add('active');

            // 更新详情卡片
            updateDetailCard(index);
        });
    });

    // 更新详情卡片函数
    function updateDetailCard(index) {
        const step = stepData[index];

        // 更新标题和图标
        const detailHeader = detailCard.querySelector('.detail-header');
        detailHeader.innerHTML = `
                    <div class="detail-icon">
                        <i class="${step.icon}"></i>
                    </div>
                    <h2 class="detail-title">${step.title}</h2>
                `;

        // 更新任务列表
        const tasksHtml = step.tasks.map(task => `<li>${task}</li>`).join('');

        // 更新统计信息
        const statsHtml = step.stats.map(stat => `
                    <div class="stat-item">
                        <div class="stat-label">${stat.label}</div>
                        <div class="stat-value">${stat.value}</div>
                    </div>
                `).join('');

        // 更新内容区域
        const detailContent = detailCard.querySelector('.detail-content');
        detailContent.innerHTML = `
                    <div class="detail-section">
                        <h4><i class="fas fa-tasks"></i> 核心任务</h4>
                        <ul>${tasksHtml}</ul>
                    </div>
                    <div class="detail-stats">${statsHtml}</div>
                `;

        // 添加动画效果
        detailCard.style.opacity = 0;
        setTimeout(() => {
            detailCard.style.transition = 'opacity 0.5s ease';
            detailCard.style.opacity = 1;
        }, 10);
    }
});

// ====================== end process =============================


// ================================= maintain ================


// 权限数据定义
const permissions = {
    admin: {
        emergency: [
            "工厂、车间、产线主数据",
            "仓库主数据"],
        planned: [
            "账户、权限、开通",
            "设备台账",
            "备件主数据"
        ]
    },
    supervisor: {
        emergency: ["故障报修",
            "故障树维护",],
        planned: [
            "点检计划",
            "保养计划",
            "维修单分配",
            "维修工单",
            "保养项目",
            "点检项目",
            "故障类型"
        ]
    },
    operator: {
        emergency: ["应急报修", "维修完成确认"],
        planned: ["开机点检"]
    },
    maintainer: {
        emergency: ["故障报修"],
        planned: [
            "点检单",
            "巡检单",
            "维修工单",
            "备件申请",
            "备件退还",
            "故障类型确认"
        ]
    },
    maintenance: {
        emergency: ["故障报修"],
        planned: [
            "保养单",
            "备件申请",
            "备件退还"
        ]
    },
    warehouse: {
        emergency: [],
        planned: [
            "采购入库",
            "备件出库确认",
            "备件退还确认",
            "库存盘点"
        ]
    }
};

// 权限图标映射
const permissionIcons = {
    "账户、权限、开通": "user-shield",
    "设备台账": "cogs",
    "工厂、车间、产线主数据": "industry",
    "仓库主数据": "warehouse",
    "备件主数据": "box-open",
    "点检计划": "clipboard-list",
    "保养计划": "calendar-alt",
    "维修单分配": "tasks",
    "故障树维护": "sitemap",
    "维修工单": "wrench",
    "保养项目": "oil-can",
    "点检项目": "clipboard-check",
    "故障类型": "bug",
    "应急报修": "first-aid",
    "维修完成确认": "check-circle",
    "开机点检": "power-off",
    "点检单": "clipboard",
    "巡检单": "search",
    "备件申请": "boxes",
    "备件退还": "undo",
    "故障类型确认": "check-circle",
    "保养单": "clipboard",
    "故障报修": "file-medical",
    "采购入库": "truck-loading",
    "备件出库确认": "box-open",
    "备件退还确认": "check-double",
    "库存盘点": "clipboard-list"
};

document.addEventListener('DOMContentLoaded', function () {
    const roleItems = document.querySelectorAll('.role-item');
    const emergencyContainer = document.getElementById('emergency-permissions');
    const plannedContainer = document.getElementById('planned-permissions');

    // 初始加载系统管理员权限
    updatePermissions('admin');

    // 添加点击事件
    roleItems.forEach(item => {
        item.addEventListener('click', function () {
            // 移除所有激活状态
            roleItems.forEach(role => role.classList.remove('active'));

            // 添加当前激活状态
            this.classList.add('active');

            // 更新权限显示
            const role = this.dataset.role;
            updatePermissions(role);
        });
    });

    function updatePermissions(role) {
        // 清空容器
        emergencyContainer.innerHTML = '';
        plannedContainer.innerHTML = '';

        // 获取当前角色的权限
        const rolePermissions = permissions[role];

        // 渲染应急维修权限
        if (rolePermissions.emergency.length > 0) {
            rolePermissions.emergency.forEach(permission => {
                const item = createPermissionItem(permission);
                emergencyContainer.appendChild(item);
            });
        } else {
            emergencyContainer.innerHTML = '<div class="empty-permission">该角色没有应急维修权限</div>';
        }

        // 渲染计划性维修权限
        if (rolePermissions.planned.length > 0) {
            rolePermissions.planned.forEach(permission => {
                const item = createPermissionItem(permission);
                plannedContainer.appendChild(item);
            });
        } else {
            plannedContainer.innerHTML = '<div class="empty-permission">该角色没有计划性维修权限</div>';
        }
    }

    function createPermissionItem(permission) {
        const item = document.createElement('div');
        item.className = 'permission-item';

        const iconName = permissionIcons[permission] || 'cog';

        item.innerHTML = `
          <div class="permission-icon">
            <i class="fas fa-${iconName}"></i>
          </div>
          <div class="permission-text">${permission}</div>
        `;

        return item;
    }
});
// =========================== end maintain =======================

// ============================================================================
// sidebar toggle
// =============================================================
document.getElementById("toggle-eam").addEventListener("click", function () {
    const list = document.getElementById("eamList");
    list.style.display = list.style.display === "none" ? "block" : "none";
});
