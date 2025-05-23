const steps = document.querySelectorAll('.timeline-step');
const tooltip = document.getElementById('timelineTooltip');

steps.forEach(step => {
    step.addEventListener('mouseenter', (e) => {
        const title = step.dataset.title;
        const content = step.dataset.content;
        tooltip.innerHTML = `<strong>${title}</strong><br>${content}`;
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.pageX - 100}px`;
        tooltip.style.top = `${e.pageY - 120}px`;
    });

    step.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    step.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.pageX - 100}px`;
        tooltip.style.top = `${e.pageY - 120}px`;
    });
});

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

// 使用Chart.js创建ECG风格波形
const ctx = document.getElementById('wave-canvas').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array(20).fill(''),
        datasets: [{
            data: generateWaveform(),
            borderColor: '#48cae4',
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: 0
        }]
    },
    options: {
        responsive: false,
        animation: { duration: 2000 },
        scales: { display: false }
    }
});

function generateWaveform() {
    return Array(20).fill(0).map((_,i) =>
        Math.sin(i/2) + (Math.random()*0.3 - 0.15)
    );
}

setInterval(() => {
    chart.data.datasets[0].data = generateWaveform();
    chart.update();
}, 3000);

const chars = '01 10 0F A5 3D 7C B2 E9 8C 4D'.split(' ');

function createStream() {
    const stream = document.createElement('div');
    stream.className = 'data-stream';

    // 生成随机数据流
    let content = '';
    for (let i = 0; i < 30; i++) {
        content += chars[Math.floor(Math.random() * chars.length)] + ' ';
    }

    stream.textContent = content;
    document.body.appendChild(stream);

    // 随机起始位置
    const startX = Math.random() * window.innerWidth;
    const startY = -20;

    // 动画设置
    gsap.set(stream, {
        x: startX,
        y: startY,
        opacity: 0
    });

    gsap.to(stream, {
        y: window.innerHeight + 20,
        opacity: 0.3,
        duration: 10 + Math.random() * 10,
        onComplete: () => stream.remove()
    });
}

// 初始创建
for (let i = 0; i < 8; i++) {
    createStream();
}

// 持续生成
setInterval(createStream, 1500);