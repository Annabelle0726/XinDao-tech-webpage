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

// 痛点数据
const painPoints = [
    {
        title: "运输效率低下",
        icon: "fas fa-tachometer-alt",
        desc: "人工调度效率低，车辆空驶率高，路线规划不合理，导致运输成本增加15-25%。传统调度方式无法实时响应路况变化，造成大量时间浪费和资源闲置。",
        stats: [
            {value: "25%↑", label: "运输成本"},
            {value: "40%↓", label: "车辆利用率"},
            {value: "3.5%", label: "货物损耗率"}
        ]
    },
    {
        title: "过程不可控",
        icon: "fas fa-eye-slash",
        desc: "运输过程缺乏实时监控，异常处理滞后，货物丢失损坏率高达3.5%。无法及时掌握运输状态，导致客户投诉率增加，品牌形象受损。",
        stats: [
            {value: "3.5%", label: "货物损耗率"},
            {value: "60%↑", label: "客户投诉"},
            {value: "2h", label: "异常响应时间"}
        ]
    },
    {
        title: "成本核算困难",
        icon: "fas fa-calculator",
        desc: "运输成本分散在多系统中，难以精准核算，成本分析滞后15-30天。缺乏统一数据平台，导致决策依据不足，成本优化困难。",
        stats: [
            {value: "30天", label: "分析延迟"},
            {value: "15%", label: "核算误差"},
            {value: "50+", label: "数据来源"}
        ]
    },
    {
        title: "对账流程复杂",
        icon: "fas fa-file-invoice",
        desc: "承运商对账依赖人工，错误率高，结算周期长达30-45天。纸质单据管理混乱，纠纷处理耗时耗力，影响资金周转效率。",
        stats: [
            {value: "45天", label: "结算周期"},
            {value: "12%", label: "对账错误"},
            {value: "80%", label: "纸质单据"}
        ]
    },
    {
        title: "车辆调度失衡",
        icon: "fas fa-traffic-light",
        desc: "高峰期调度不及时，部分线路车辆资源浪费，影响整体运输效率。缺乏智能预测，无法提前规划运力，导致旺季运力不足，淡季资源闲置。",
        stats: [
            {value: "35%↓", label: "旺季运力"},
            {value: "20%↑", label: "淡季闲置"},
            {value: "50%", label: "调度延迟"}
        ]
    }
];

// 获取DOM元素
const painPointElements = document.querySelectorAll('.pain-point');
const painDetailElement = document.getElementById('painDetail');

// 添加点击事件
painPointElements.forEach(point => {
    point.addEventListener('click', function () {
        const index = this.getAttribute('data-index') - 1;
        const painData = painPoints[index];

        // 更新详情内容（包含关闭按钮）
        painDetailElement.innerHTML = `
            <div class="pain-close" id="painCloseBtn">✕</div>
            <h3><i class="${painData.icon}"></i> ${painData.title}</h3>
            <p class="pain-desc">${painData.desc}</p>
            <div class="pain-stats">
                ${painData.stats.map(stat => `
                    <div class="pain-stat">
                        <div class="stat-value">${stat.value}</div>
                        <div class="stat-label">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // 添加关闭按钮事件
        document.getElementById('painCloseBtn').addEventListener('click', function (e) {
            e.stopPropagation(); // 阻止事件冒泡
            painDetailElement.classList.remove('active');
            painPointElements.forEach(p => p.classList.remove('active'));
        });

        // 移除所有active类
        painPointElements.forEach(p => p.classList.remove('active'));
        // 添加active类到当前点
        this.classList.add('active');
        // 显示详情
        painDetailElement.classList.add('active');
    });
});

// 点击空白处关闭详情
document.addEventListener('click', function (e) {
    if (!e.target.closest('.pain-point') && !e.target.closest('.pain-detail')) {
        painDetailElement.classList.remove('active');
        painPointElements.forEach(p => p.classList.remove('active'));
    }
});

// 卡车经过痛点时的动画
const truck = document.querySelector('.truck');
const painPointsPositions = [10, 30, 50, 70, 90]; // 百分比位置

setInterval(() => {
    const truckLeft = parseFloat(getComputedStyle(truck).left) / parseFloat(getComputedStyle(truck.parentElement).width) * 100;

    painPointsPositions.forEach((pos, index) => {
        if (Math.abs(truckLeft - pos) < 2) { // 卡车接近痛点时
            const point = document.querySelector(`.pain-point[data-index="${index + 1}"]`);
            point.style.animation = 'painPulse 0.5s 3';

            setTimeout(() => {
                point.style.animation = '';
            }, 1500);
        }
    });
}, 100);
// ==================================== end pain ==============

// ============================= process ========================
// 流程数据
const processSteps = [
    {
        id: 1,
        title: "订单智能接入",
        icon: "fas fa-sign-in-alt",
        desc: "多渠道订单自动接入系统，通过智能识别技术自动解析订单内容，支持API、EDI、Excel等多种接入方式，10秒内完成订单标准化处理。",
        highlights: [
            "自动识别200+种订单格式，准确率99.8%",
            "智能校验订单完整性，自动补全缺失信息",
            "异常订单自动标记并通知相关人员"
        ],
        tags: ["OCR识别", "NLP处理", "智能校验"],
        stats: [
            {value: "10秒", label: "处理速度"},
            {value: "99.8%", label: "识别准确率"},
            {value: "200+", label: "格式支持"}
        ],
        radarData: [90, 85, 70, 75, 80, 65]
    },
    {
        id: 2,
        title: "智能调度规划",
        icon: "fas fa-route",
        desc: "基于深度强化学习的调度引擎，实时分析车辆位置、货物特性、路况等20+维度数据，30秒内生成最优运输方案，平均降低空驶率28%。",
        highlights: [
            "动态考虑天气、交通、限行等实时因素",
            "智能匹配货物特性与车辆类型",
            "支持紧急订单的智能插单处理"
        ],
        tags: ["深度学习", "运筹优化", "实时路况"],
        stats: [
            {value: "30秒", label: "规划速度"},
            {value: "28%↓", label: "空驶率"},
            {value: "20+", label: "决策维度"}
        ],
        radarData: [80, 95, 85, 70, 75, 65]
    },
    {
        id: 3,
        title: "自动化执行",
        icon: "fas fa-cogs",
        desc: "任务自动下发至司机APP，智能导航引导最优路线，IoT设备实时监控货物状态，异常情况自动触发应急流程，执行效率提升40%。",
        highlights: [
            "电子围栏自动触发任务状态更新",
            "温湿度敏感货物实时监控预警",
            "无接触式电子签收与验证"
        ],
        tags: ["IoT监控", "智能导航", "自动化"],
        stats: [
            {value: "40%↑", label: "执行效率"},
            {value: "99.5%", label: "状态准确率"},
            {value: "5+", label: "监控维度"}
        ],
        radarData: [75, 80, 90, 85, 70, 75]
    },
    {
        id: 4,
        title: "实时可视化监控",
        icon: "fas fa-eye",
        desc: "全链路运输状态实时可视化管理，异常情况3秒内预警，支持多维度数据分析看板，管理决策响应速度提升60%。",
        highlights: [
            "运输车辆实时位置跟踪，精度±5米",
            "预计到达时间动态计算，准确率98%",
            "多层级KPI实时可视化展示"
        ],
        tags: ["GIS地图", "实时计算", "数据可视化"],
        stats: [
            {value: "3秒", label: "预警速度"},
            {value: "60%↑", label: "决策速度"},
            {value: "±5米", label: "定位精度"}
        ],
        radarData: [85, 75, 80, 95, 85, 70]
    },
    {
        id: 5,
        title: "智能结算与分析",
        icon: "fas fa-file-invoice-dollar",
        desc: "自动生成精准费用结算单，AI识别异常费用，多维运输绩效分析，帮助企业发现优化机会，平均降低结算错误率95%。",
        highlights: [
            "自动匹配合同费率，减少人工干预",
            "异常费用自动标记并追溯原因",
            "30+维度运输绩效深度分析"
        ],
        tags: ["智能对账", "异常检测", "BI分析"],
        stats: [
            {value: "95%↓", label: "结算错误"},
            {value: "80%↑", label: "结算效率"},
            {value: "30+", label: "分析维度"}
        ],
        radarData: [70, 85, 75, 80, 90, 85]
    },
    {
        id: 6,
        title: "持续优化学习",
        icon: "fas fa-sync-alt",
        desc: "系统自动收集运输全链路数据，通过机器学习不断优化算法模型，每月平均提升调度效率3-5%，形成良性优化循环。",
        highlights: [
            "运输数据自动收集与清洗",
            "模型自动训练与效果评估",
            "智能生成优化建议报告"
        ],
        tags: ["机器学习", "自动优化", "数据挖掘"],
        stats: [
            {value: "5%↑", label: "月度优化"},
            {value: "100%", label: "自动执行"},
            {value: "10+", label: "优化维度"}
        ],
        radarData: [75, 70, 85, 75, 80, 95]
    }
];

// 雷达图配置
const radarConfig = {
    type: 'radar',
    data: {
        labels: ['接入效率', '调度智能', '执行能力', '监控能力', '分析深度', '优化能力'],
        datasets: [{
            label: '流程能力评估',
            data: processSteps[0].radarData,
            fill: true,
            backgroundColor: 'rgba(74, 140, 255, 0.2)',
            borderColor: 'rgba(74, 140, 255, 0.8)',
            pointBackgroundColor: 'rgba(74, 140, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(74, 140, 255, 1)',
            borderWidth: 2,
            pointRadius: 4
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
                    color: '#a0d2eb',
                    font: {
                        size: 12
                    }
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
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}%`;
                    }
                }
            }
        }
    }
};

// 当前选中的步骤
let currentStep = 0;

// 初始化
document.addEventListener('DOMContentLoaded', function () {
    // 创建雷达图
    const ctx = document.getElementById('processRadar').getContext('2d');
    window.processRadar = new Chart(ctx, radarConfig);

    // 创建步骤指示器
    const indicatorsContainer = document.getElementById('stepIndicators');
    processSteps.forEach((step, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'step-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;

        indicator.addEventListener('click', function () {
            updateProcessDisplay(index);
        });

        indicatorsContainer.appendChild(indicator);
    });

    // 初始显示第一步
    updateProcessDisplay(0);

    // 自动轮播
    setInterval(() => {
        const nextStep = (currentStep + 1) % processSteps.length;
        updateProcessDisplay(nextStep);
    }, 6000);
});

// 更新流程显示
function updateProcessDisplay(stepIndex) {
    currentStep = stepIndex;
    const step = processSteps[stepIndex];

    // 更新雷达图数据
    processRadar.data.datasets[0].data = step.radarData;
    processRadar.update();

    // 更新详情内容
    const detailsContainer = document.getElementById('processDetails');
    detailsContainer.innerHTML = `
                <div class="process-header">
                    <div class="mes-process-icon pulse">
                        <i class="${step.icon}"></i>
                    </div>
                    <div>
                        <h3 class="mes-process-title">${step.title}</h3>
                        <p class="process-subtitle">流程能力评估: ${Math.round(step.radarData.reduce((a, b) => a + b, 0) / step.radarData.length)}%</p>
                    </div>
                </div>
                <p class="mes-process-desc">${step.desc}</p>

                <div class="process-stats">
                    ${step.stats.map(stat => `
                        <div class="stat-item">
                            <div class="stat-value">${stat.value}</div>
                            <div class="stat-label">${stat.label}</div>
                        </div>
                    `).join('')}
                </div>

                <ul class="process-highlights">
                    ${step.highlights.map(item => `
                        <li>${item}</li>
                    `).join('')}
                </ul>

                <div class="tech-tags">
                    ${step.tags.map(tag => `
                        <span class="tech-tag">${tag}</span>
                    `).join('')}
                </div>

                <div class="process-nav">
                    <button class="nav-button" onclick="updateProcessDisplay(${(stepIndex - 1 + processSteps.length) % processSteps.length})" ${stepIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left"></i> 上一步
                    </button>
                    <button class="nav-button" onclick="updateProcessDisplay(${(stepIndex + 1) % processSteps.length})" ${stepIndex === processSteps.length - 1 ? 'disabled' : ''}>
                        下一步 <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;

    // 更新指示器状态
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        if (index === stepIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 暴露函数给全局作用域
window.updateProcessDisplay = updateProcessDisplay;

// ============================ end process =====================================


// ============================ core =====================================

const items = document.querySelectorAll('.feature-item');
const featureImg = document.getElementById('featureImg');

const images = [
    'https://igps.net/wp-content/uploads/2020/11/shutterstock_1492012511-scaled-1.jpg',
    'https://i.shgcdn.com/e8b2de9a-b6c3-4f05-aa6d-b9da06296724/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
'https://www.supplychain247.com/images/2020_article/Getty-state_of_logistics.jpg',
    'https://www.detrack.com/wp-content/uploads/2024/04/23644.jpg',
    'https://www.zdscs.com/wp-content/uploads/2025/04/eef48b6d-710a-46f3-8a40-ce5b7306c391.png'
];

items.forEach(item => {
    item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const index = item.dataset.index;
        featureImg.style.opacity = 0;
        setTimeout(() => {
            featureImg.src = images[index];
            featureImg.style.opacity = 1;
        }, 200);
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
}, {threshold: 0.1});

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