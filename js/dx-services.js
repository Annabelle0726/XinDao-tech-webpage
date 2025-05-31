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