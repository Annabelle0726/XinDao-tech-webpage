// ============================ ==============================
// toast
let activeToasts = [];


document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card[data-desc]");
    const toastContainer = document.querySelector(".toast-container");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            // 新增：禁止重复触发逻辑
            if (activeToasts.length > 0) return;

            const message = card.getAttribute("data-desc");
            if (message && toastContainer) {
                const toast = document.createElement("div");
                toast.className = "toast";
                toast.innerText = message;

                // 新增：状态管理
                activeToasts.push(toast);

                toastContainer.appendChild(toast);

                // 修改：使用更精确的动画时间控制
                toast.addEventListener('transitionend', () => {
                    toast.remove();
                    activeToasts = activeToasts.filter(t => t !== toast);
                }, {once: true});

                setTimeout(() => {
                    if (toast.parentElement) {
                        toast.remove();
                        activeToasts = activeToasts.filter(t => t !== toast);
                    }
                }, 4000);
            }
        });
    });
});


// ============================ end toast =====================================

// ============================ core =====================================
document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {threshold: 0.1});

    initCharts();
});

function initCharts() {
    // line chart
    const qualityCtx = document.getElementById('qualityAnalysisChart').getContext('2d');
    new Chart(qualityCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            datasets: [
                {
                    label: '来料合格率(%)',
                    data: [98.2, 98.5, 98.7, 99.1, 99.3, 99.5, 99.2, 99.4, 99.6, 99.8, 99.7, 99.9],
                    borderColor: '#48bfe3',
                    backgroundColor: 'rgba(72, 191, 227, 0.1)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 2,
                    tension: 0.2,
                    fill: true
                },
                {
                    label: '制程不良率(%)',
                    data: [2.5, 2.3, 2.1, 1.8, 1.6, 1.4, 1.5, 1.3, 1.2, 1.0, 0.9, 0.8],
                    borderColor: '#56cfe3',
                    backgroundColor: 'rgba(86, 207, 227, 0.1)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 2,
                    tension: 0.2,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: '月度质量指标趋势分析',
                    font: {size: 16, weight: 'bold'},
                    padding: {top: 10, bottom: 20}
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(25, 25, 35, 0.9)',
                    padding: 12,
                    titleFont: {size: 14},
                    bodyFont: {size: 13},
                    cornerRadius: 6
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 95,
                    title: {
                        display: true,
                        text: '百分比(%)',
                        font: {size: 13}
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: '月份',
                        font: {size: 13}
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.3
                }
            }
        }
    });

    // pie chart
    const capaCtx = document.getElementById('capaManagementChart').getContext('2d');
    new Chart(capaCtx, {
        type: 'doughnut',
        data: {
            labels: ['已关闭', '执行中', '待审核', '超期未处理'],
            datasets: [{
                data: [62, 25, 10, 3],
                backgroundColor: [
                    'rgba(72, 191, 227, 0.8)',
                    'rgba(86, 207, 227, 0.8)',
                    'rgba(0, 150, 199, 0.8)',
                    'rgba(0, 102, 204, 0.8)'
                ],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'CAPA问题处理状态分布',
                    font: {size: 16, weight: 'bold'},
                    padding: {top: 10, bottom: 20}
                },
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        font: {size: 12}
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });

    // bar chart
    const supplierCtx = document.getElementById('supplierQualityChart').getContext('2d');
    new Chart(supplierCtx, {
        type: 'bar',
        data: {
            labels: ['A公司', 'B公司', 'C公司', 'D公司', 'E公司', 'F公司', 'G公司'],
            datasets: [{
                label: '供应商绩效评分',
                data: [92, 85, 78, 95, 88, 82, 90],
                backgroundColor: [
                    'rgba(72, 191, 227, 0.7)',
                    'rgba(86, 207, 227, 0.7)',
                    'rgba(0, 150, 199, 0.7)',
                    'rgba(0, 102, 204, 0.7)',
                    'rgba(72, 191, 227, 0.7)',
                    'rgba(86, 207, 227, 0.7)',
                    'rgba(0, 150, 199, 0.7)'
                ],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: '供应商质量绩效评估',
                    font: {size: 16, weight: 'bold'},
                    padding: {top: 10, bottom: 20}
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(25, 25, 35, 0.9)',
                    padding: 12,
                    titleFont: {size: 14},
                    bodyFont: {size: 13},
                    cornerRadius: 6
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: '绩效评分',
                        font: {size: 13}
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // scatter plot
    const docCtx = document.getElementById('documentControlChart').getContext('2d');
    new Chart(docCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '文档版本更新',
                data: [
                    {x: 1, y: 12},
                    {x: 2, y: 19},
                    {x: 3, y: 8},
                    {x: 4, y: 15},
                    {x: 5, y: 6},
                    {x: 6, y: 12},
                    {x: 7, y: 9},
                    {x: 8, y: 14},
                    {x: 9, y: 7},
                    {x: 10, y: 11},
                    {x: 11, y: 5},
                    {x: 12, y: 13}
                ],
                backgroundColor: 'rgba(72, 191, 227, 0.8)',
                pointRadius: 8,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: '文档版本更新频率分析',
                    font: {size: 16, weight: 'bold'},
                    padding: {top: 10, bottom: 20}
                },
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            return `文档版本: V${context[0].parsed.x}.${context[0].parsed.y}`;
                        },
                        label: function (context) {
                            return `更新时间: ${context.parsed.x}月${context.parsed.y}日`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '更新日期',
                        font: {size: 13}
                    },
                    min: 1,
                    max: 31,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '月份',
                        font: {size: 13}
                    },
                    min: 0,
                    max: 13,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// ========================== end core ==========================


// ==================================== ad ================================


// ==================================== end ad ================================


// ===================================== sidebar ==================================

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-qms");
    const navList = document.getElementById("qms-List");

    toggleBtn.addEventListener("click", function () {
        navList.classList.toggle("collapsed");
    });
});

// ======================================== end sidebar ==========================





