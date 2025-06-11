// ===================================== core ==================================
document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.feature-card');
        const details = card.querySelector('.feature-details');

        if (details.style.maxHeight) {

            details.style.maxHeight = null;
            this.textContent = 'Learn More';
        } else {
            details.style.maxHeight = details.scrollHeight + 'px';
            this.textContent = 'Show Less';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // pie
    const dataIntegrationCtx = document.getElementById('dataIntegrationChart').getContext('2d');
    new Chart(dataIntegrationCtx, {
        type: 'pie',
        data: {
            labels: ['CRM系统', 'ERP系统', '生产数据库', '财务系统', 'IoT设备', '外部API'],
            datasets: [{
                data: [22, 18, 15, 20, 12, 13],
                backgroundColor: [
                    '#2c6aa0', '#3a6ea5', '#4a7dab', '#5d8aa8', '#6f98b5', '#85a7c4'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '多源数据整合分析',
                    font: {size: 16, weight: 'bold'},
                    padding: 20
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {size: 12}
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });

    // 功能2: AI预测分析 - 折线图
    const aiPredictionCtx = document.getElementById('aiPredictionChart').getContext('2d');
    new Chart(aiPredictionCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            datasets: [
                {
                    label: '实际销售额',
                    data: [120, 135, 145, 160, 155, 170, 185, 200],
                    borderColor: '#2c6aa0',
                    backgroundColor: 'rgba(44, 106, 160, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: '预测销售额',
                    data: [null, null, null, null, 158, 172, 188, 205],
                    borderColor: '#ff6b6b',
                    borderDash: [5, 5],
                    borderWidth: 3,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '销售实际值与预测值对比',
                    font: {size: 16, weight: 'bold'},
                    padding: 20
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: '销售额 (万元)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '月份'
                    }
                }
            }
        }
    });

    // 功能3: 实时可视化看板 - 组合图
    const dashboardCtx = document.getElementById('dashboardChart').getContext('2d');
    new Chart(dashboardCtx, {
        type: 'bar',
        data: {
            labels: ['生产量', '合格率', '设备利用率', '能耗指数', '工时效率'],
            datasets: [
                {
                    label: '目标值',
                    data: [95, 98, 92, 88, 90],
                    backgroundColor: 'rgba(44, 106, 160, 0.7)',
                    borderColor: '#2c6aa0',
                    borderWidth: 1
                },
                {
                    label: '实际值',
                    data: [92, 96, 89, 85, 88],
                    backgroundColor: 'rgba(93, 138, 168, 0.7)',
                    borderColor: '#5d8aa8',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '生产关键指标监控',
                    font: {size: 16, weight: 'bold'},
                    padding: 20
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: '百分比 (%)'
                    }
                }
            }
        }
    });

    // 功能4: 智能数据助手 - 柱状图
    const assistantCtx = document.getElementById('assistantChart').getContext('2d');
    new Chart(assistantCtx, {
        type: 'bar',
        data: {
            labels: ['销售分析', '库存查询', '客户洞察', '财务报告', '生产监控', '市场趋势'],
            datasets: [{
                label: '查询次数',
                data: [1850, 1420, 1260, 980, 1650, 1120],
                backgroundColor: [
                    'rgba(44, 106, 160, 0.8)',
                    'rgba(58, 110, 165, 0.8)',
                    'rgba(72, 119, 170, 0.8)',
                    'rgba(86, 133, 180, 0.8)',
                    'rgba(100, 147, 190, 0.8)',
                    'rgba(114, 161, 200, 0.8)'
                ],
                borderColor: '#2c6aa0',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '自然语言查询分布',
                    font: {size: 16, weight: 'bold'},
                    padding: 20
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '查询次数'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '查询类型'
                    }
                }
            }
        }
    });

    // 功能5: 移动决策中心 - 折线图
    const mobileCtx = document.getElementById('mobileChart').getContext('2d');
    new Chart(mobileCtx, {
        type: 'line',
        data: {
            labels: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023'],
            datasets: [
                {
                    label: 'iOS用户',
                    data: [3200, 4100, 4800, 5600, 6500, 7200],
                    borderColor: '#2c6aa0',
                    backgroundColor: 'rgba(44, 106, 160, 0.1)',
                    borderWidth: 3,
                    fill: true
                },
                {
                    label: 'Android用户',
                    data: [3800, 4500, 5100, 5900, 6800, 7800],
                    borderColor: '#5d8aa8',
                    backgroundColor: 'rgba(93, 138, 168, 0.1)',
                    borderWidth: 3,
                    fill: true
                },
                {
                    label: '鸿蒙用户',
                    data: [800, 1200, 1800, 2500, 3200, 4100],
                    borderColor: '#85a7c4',
                    backgroundColor: 'rgba(133, 167, 196, 0.1)',
                    borderWidth: 3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '移动端用户增长趋势',
                    font: {size: 16, weight: 'bold'},
                    padding: 20
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '活跃用户数'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '季度'
                    }
                }
            }
        }
    });

    // 功能6: 协同决策平台 - 散点图
    const collaborationCtx = document.getElementById('collaborationChart').getContext('2d');
    new Chart(collaborationCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '团队协作',
                data: [
                    {x: 15, y: 85, r: 15},
                    {x: 28, y: 72, r: 12},
                    {x: 35, y: 90, r: 20},
                    {x: 50, y: 60, r: 10},
                    {x: 45, y: 75, r: 18},
                    {x: 60, y: 82, r: 16},
                    {x: 70, y: 68, r: 14},
                    {x: 80, y: 95, r: 22},
                    {x: 85, y: 55, r: 8},
                    {x: 92, y: 78, r: 17}
                ],
                backgroundColor: 'rgba(44, 106, 160, 0.7)',
                borderColor: '#2c6aa0'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '团队协作效率分析',
                    font: {size: 16, weight: 'bold'},
                    padding: 20
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `参与度: ${context.raw.x}%, 贡献度: ${context.raw.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '贡献度 (%)'
                    },
                    min: 50,
                    max: 100
                },
                x: {
                    title: {
                        display: true,
                        text: '参与度 (%)'
                    },
                    min: 10,
                    max: 100
                }
            }
        }
    });
});
// ===================================== end core ==================================

// ===================================== highlights ==================================


document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.feature-card');
        card.classList.toggle('active');
        this.textContent = card.classList.contains('active') ? 'Show Less' : 'Learn More';
    });
});

// ================================== end highlights =================================




// ======================== function ======================
// 全局变量
let interactiveChart;
let currentChartType = 'bar';
let uploadedData = [];
let columns = [];

document.addEventListener('DOMContentLoaded', function () {
    // upload
    setupUploadArea();

    // 设置图表类型按钮事件
    setupChartTypeButtons();

    // 设置按钮事件
    document.getElementById('download-btn').addEventListener('click', downloadChart);
    document.getElementById('refresh-btn').addEventListener('click', refreshData);
    document.getElementById('export-data-btn').addEventListener('click', exportData);

    // 设置样式控制事件
    document.getElementById('color-scheme').addEventListener('change', applyColorScheme);
    document.getElementById('chart-style').addEventListener('change', applyChartStyle);

    // 设置列选择事件
    document.getElementById('x-axis').addEventListener('change', updateChart);
    document.getElementById('y-axis').addEventListener('change', updateChart);
    document.getElementById('label-column').addEventListener('change', updateChart);
});

// upload
function setupUploadArea() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadBtn = uploadArea.querySelector('.upload-btn');

    uploadBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        fileInput.click();
    });

    uploadArea.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileUpload);

    uploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#e0f0ff';
    });

    uploadArea.addEventListener('dragleave', function () {
        uploadArea.style.borderColor = '#d0e4f0';
        uploadArea.style.backgroundColor = '#f9fcff';
    });

    uploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        uploadArea.style.borderColor = '#d0e4f0';
        uploadArea.style.backgroundColor = '#f9fcff';

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload();
        }
    });
}

function handleFileUpload() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) return;

    const fileName = file.name;
    const fileSize = (file.size / 1024).toFixed(2);
    const fileExt = fileName.split('.').pop().toLowerCase();

    // file info
    document.getElementById('file-name').textContent = fileName;
    document.getElementById('file-size').textContent = `${fileSize} KB`;
    document.getElementById('file-info').style.display = 'inline-block';

    // 显示分析区域
    document.getElementById('analysis-section').style.display = 'block';

    // 根据文件类型处理
    if (fileExt === 'csv') {
        parseCSV(file);
    } else if (fileExt === 'xlsx' || fileExt === 'xls') {
        parseExcel(file);
    } else {
        showToastMsg('不支持的文件格式', 'error');
    }
}

// csv
function parseCSV(file) {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            if (results.errors.length) {
                showToastMsg('解析CSV文件时出错', 'error');
                console.error(results.errors);
                return;
            }

            processData(results.data, results.meta.fields);
        }
    });
}

// Excel
function parseExcel(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});

            // 获取第一个工作表
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // 转换为JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // 获取列名
            const cols = [];
            for (let key in jsonData[0]) {
                cols.push(key);
            }

            processData(jsonData, cols);
        } catch (error) {
            showToastMsg('解析Excel文件时出错', 'error');
            console.error(error);
        }
    };

    reader.readAsArrayBuffer(file);
}

// 处理数据
function processData(data, cols) {
    uploadedData = data;
    columns = cols;

    // 更新行数显示
    document.getElementById('row-count').textContent = `${data.length} 行`;

    // 填充列选择下拉框
    populateColumnSelectors();

    // 默认选择第一列和第二列
    if (columns.length > 1) {
        document.getElementById('x-axis').value = columns[0];
        document.getElementById('y-axis').value = columns[1];
        if (columns.length > 2) {
            document.getElementById('label-column').value = columns[2];
        }
    }

    // 显示数据表格
    renderDataTable();

    // 更新图表
    updateChart();
}

// 填充列选择器
function populateColumnSelectors() {
    const xSelect = document.getElementById('x-axis');
    const ySelect = document.getElementById('y-axis');
    const labelSelect = document.getElementById('label-column');

    // 清除现有选项
    xSelect.innerHTML = '<option value="">-- 选择列 --</option>';
    ySelect.innerHTML = '<option value="">-- 选择列 --</option>';
    labelSelect.innerHTML = '<option value="">-- 选择列 --</option>';

    // 添加新选项
    columns.forEach(col => {
        const option = document.createElement('option');
        option.value = col;
        option.textContent = col;

        xSelect.appendChild(option.cloneNode(true));
        ySelect.appendChild(option.cloneNode(true));
        labelSelect.appendChild(option);
    });
}

// render table
function renderDataTable() {
    const table = document.getElementById('data-table');
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');

    // 清空现有内容
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // 添加表头
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        thead.appendChild(th);
    });

    // 添加数据行（最多显示25行）
    const maxRows = Math.min(25, uploadedData.length);
    for (let i = 0; i < maxRows; i++) {
        const row = document.createElement('tr');

        columns.forEach(col => {
            const td = document.createElement('td');
            td.textContent = uploadedData[i][col] || '';
            row.appendChild(td);
        });

        tbody.appendChild(row);
    }
}

// 更新图表
function updateChart() {
    const xAxis = document.getElementById('x-axis').value;
    const yAxis = document.getElementById('y-axis').value;

    if (!xAxis || !yAxis) {
        document.getElementById('insight-text').textContent = "请选择X轴和Y轴数据列以生成图表";
        return;
    }

    // 设置图表标题
    document.getElementById('chart-title').textContent = `${xAxis} vs ${yAxis} 分析`;

    // 根据当前图表类型更新
    switch (currentChartType) {
        case 'bar':
            initBarChart();
            break;
        case 'line':
            initLineChart();
            break;
        case 'pie':
            initPieChart();
            break;
        case 'scatter':
            initScatterChart();
            break;
        default:
            initBarChart();
    }
}

// 设置图表类型按钮
function setupChartTypeButtons() {
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            currentChartType = this.dataset.type;
            updateChart();
        });
    });
}

// 配色方案映射
const colorSchemes = {
    blue: ['#2c6aa0', '#3a6ea5', '#4877aa', '#5685b4', '#6493be'],
    green: ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9'],
    red: ['#F44336', '#EF5350', '#E57373', '#EF9A9A', '#FFCDD2'],
    purple: ['#9C27B0', '#AB47BC', '#BA68C8', '#CE93D8', '#E1BEE7']
};

// styles
const chartStyles = {
    standard: {
        font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', 'PingFang SC', 'Microsoft YaHei', '微软雅黑', sans-serif"
        },
        grid: {color: 'rgba(0, 0, 0, 0.1)'}
    },
    minimalist: {
        font: {
            size: 12,
            family: "'Arial', 'PingFang SC', 'Microsoft YaHei', '微软雅黑', sans-serif"
        },
        grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
        }
    },
    modern: {
        font: {
            size: 16,
            family: "'Segoe UI', 'Roboto', 'Oxygen', 'PingFang SC', 'Microsoft YaHei', '微软雅黑', sans-serif"
        },
        grid: {
            color: 'rgba(0, 0, 0, 0.2)',
            lineWidth: 1
        }
    }
};


// 应用配色方案
function applyColorScheme() {
    if (!interactiveChart) return;
    updateChart();
}

// 应用图表风格
function applyChartStyle() {
    if (!interactiveChart) return;
    updateChart();
}

// 生成数据洞察
function generateDataInsight(chartType, xAxis, yAxis) {
    if (!uploadedData.length) return "请上传数据文件以生成分析洞察";

    try {
        const yValues = uploadedData.map(row => parseFloat(row[yAxis])).filter(val => !isNaN(val));

        if (yValues.length === 0) {
            return "无法从所选列中提取数值数据";
        }

        const minVal = Math.min(...yValues);
        const maxVal = Math.max(...yValues);
        const avgVal = (yValues.reduce((a, b) => a + b, 0) / yValues.length).toFixed(2);

        return `数据分析洞察: ${yAxis} 列中，最小值: ${minVal}, 最大值: ${maxVal}, 平均值: ${avgVal}`;
    } catch (e) {
        return "生成数据洞察时出错: " + e.message;
    }
}

// 显示提示信息
function showToastMsg(message, type) {
    const toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = message;
    toastMsg.className = 'toastMsg show ' + type;

    setTimeout(() => {
        toastMsg.className = 'toastMsg';
    }, 3000);
}

// 下载图表
function downloadChart() {
    if (!interactiveChart) {
        showToastMsg('图表未初始化', 'error');
        return;
    }

    const url = interactiveChart.toBase64Image();
    const a = document.createElement('a');
    a.href = url;
    a.download = `chart-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showToastMsg('图表已导出', 'success');
}

// export
function exportData() {
    if (!uploadedData.length) {
        showToastMsg('没有数据可导出', 'warning');
        return;
    }

    // 创建CSV内容
    let csvContent = "data:text/csv;charset=utf-8,";

    // 添加标题行
    csvContent += columns.join(",") + "\n";

    // 添加数据行
    uploadedData.forEach(row => {
        csvContent += columns.map(col => row[col]).join(",") + "\n";
    });

    // download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "analysis_data.csv");
    document.body.appendChild(link);

    // download
    link.click();
    document.body.removeChild(link);

    showToastMsg('数据已导出为CSV', 'success');
}

// 刷新数据
function refreshData() {
    const refreshBtn = document.getElementById('refresh-btn');
    const icon = refreshBtn.querySelector('i');

    // 显示加载状态
    refreshBtn.classList.add('loading');
    icon.classList.remove('fa-sync-alt');
    icon.classList.add('fa-spinner', 'fa-spin');

    // 模拟API请求延迟
    setTimeout(() => {
        updateChart();

        // 恢复按钮状态
        refreshBtn.classList.remove('loading');
        icon.classList.remove('fa-spinner', 'fa-spin');
        icon.classList.add('fa-sync-alt');

        // 显示刷新成功提示
        showToastMsg('图表已刷新', 'success');
    }, 500);
}

// 初始化柱状图
function initBarChart() {
    const ctx = document.getElementById('interactiveChart').getContext('2d');
    if (interactiveChart) interactiveChart.destroy();

    const xAxis = document.getElementById('x-axis').value;
    const yAxis = document.getElementById('y-axis').value;
    const labelCol = document.getElementById('label-column').value || xAxis;

    if (!xAxis || !yAxis) return;

    // 提取数据
    const labels = [];
    const data = [];

    uploadedData.forEach(row => {
        if (row[xAxis] !== undefined && row[yAxis] !== undefined) {
            labels.push(row[labelCol] || row[xAxis]);
            data.push(parseFloat(row[yAxis]) || 0);
        }
    });

    // 限制数据量
    const maxDataPoints = Math.min(50, labels.length);
    const slicedLabels = labels.slice(0, maxDataPoints);
    const slicedData = data.slice(0, maxDataPoints);

    const colorScheme = document.getElementById('color-scheme').value;
    const colors = colorSchemes[colorScheme] || colorSchemes.blue;

    const dataSet = {
        label: yAxis,
        data: slicedData,
        backgroundColor: colors.map(c => c + 'CC'),
        borderColor: colors,
        borderWidth: 1
    };

    interactiveChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: slicedLabels,
            datasets: [dataSet]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `${xAxis} vs ${yAxis}`,
                    font: {
                        size: chartStyles.standard.font.size + 2,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: yAxis,
                        font: {weight: 'bold'}
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: xAxis,
                        font: {weight: 'bold'}
                    }
                }
            }
        }
    });

    // 更新数据分析洞察
    document.getElementById('insight-text').textContent = generateDataInsight('bar', xAxis, yAxis);
}

// 初始化折线图
function initLineChart() {
    const ctx = document.getElementById('interactiveChart').getContext('2d');
    if (interactiveChart) interactiveChart.destroy();

    const xAxis = document.getElementById('x-axis').value;
    const yAxis = document.getElementById('y-axis').value;

    if (!xAxis || !yAxis) return;

    // 提取数据
    const labels = [];
    const data = [];

    uploadedData.forEach(row => {
        if (row[xAxis] !== undefined && row[yAxis] !== undefined) {
            labels.push(row[xAxis]);
            data.push(parseFloat(row[yAxis]) || 0);
        }
    });

    // 限制数据量
    const maxDataPoints = Math.min(100, labels.length);
    const slicedLabels = labels.slice(0, maxDataPoints);
    const slicedData = data.slice(0, maxDataPoints);

    const colorScheme = document.getElementById('color-scheme').value;
    const colors = colorSchemes[colorScheme] || colorSchemes.blue;

    interactiveChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: slicedLabels,
            datasets: [{
                label: yAxis,
                data: slicedData,
                borderColor: colors[0],
                backgroundColor: `rgba(${parseInt(colors[0].slice(1, 3), 16)}, ${parseInt(colors[0].slice(3, 5), 16)}, ${parseInt(colors[0].slice(5, 7), 16)}, 0.1)`,
                borderWidth: 3,
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `${xAxis} vs ${yAxis} 趋势`,
                    font: {
                        size: chartStyles.standard.font.size + 2,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: yAxis,
                        font: {weight: 'bold'}
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: xAxis,
                        font: {weight: 'bold'}
                    }
                }
            }
        }
    });

    // 更新数据分析洞察
    document.getElementById('insight-text').textContent = generateDataInsight('line', xAxis, yAxis);
}

// 初始化散点图
function initScatterChart() {
    const ctx = document.getElementById('interactiveChart').getContext('2d');
    if (interactiveChart) interactiveChart.destroy();

    const xAxis = document.getElementById('x-axis').value;
    const yAxis = document.getElementById('y-axis').value;
    const labelCol = document.getElementById('label-column').value || xAxis;

    if (!xAxis || !yAxis) return;

    // 提取数据
    const dataPoints = [];
    const labels = [];

    uploadedData.forEach((row, index) => {
        if (row[xAxis] !== undefined && row[yAxis] !== undefined) {
            const xVal = parseFloat(row[xAxis]);
            const yVal = parseFloat(row[yAxis]);

            if (!isNaN(xVal) && !isNaN(yVal)) {
                dataPoints.push({x: xVal, y: yVal});
                labels.push(row[labelCol] || `点 ${index + 1}`);
            }
        }
    });

    // 限制数据量
    const maxDataPoints = Math.min(200, dataPoints.length);
    const slicedPoints = dataPoints.slice(0, maxDataPoints);
    const slicedLabels = labels.slice(0, maxDataPoints);

    const colorScheme = document.getElementById('color-scheme').value;
    const colors = colorSchemes[colorScheme] || colorSchemes.blue;

    interactiveChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: `${xAxis} vs ${yAxis}`,
                data: slicedPoints,
                backgroundColor: colors[0],
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `${xAxis} 与 ${yAxis} 相关性分析`,
                    font: {
                        size: chartStyles.standard.font.size + 2,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${slicedLabels[context.dataIndex]}: (${context.parsed.x}, ${context.parsed.y})`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: yAxis,
                        font: {weight: 'bold'}
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: xAxis,
                        font: {weight: 'bold'}
                    }
                }
            }
        }
    });

    // 更新数据分析洞察
    document.getElementById('insight-text').textContent = generateDataInsight('scatter', xAxis, yAxis);
}

// ===================================== end function ==================================


// ===================================== sidebar ==================================

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-bi");
    const navList = document.getElementById("bi-List");

    toggleBtn.addEventListener("click", function () {
        navList.classList.toggle("collapsed");
    });
});

// ======================================== end sidebar ==========================