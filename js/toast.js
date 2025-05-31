// 架构图
// =====================================================================

// 配置参数
const TOAST_CONFIG = {
    displayDuration: 3000,
    fadeDuration: 300,
    maxToasts: 3
};

let activeToasts = [];

function showToast(message) {
    if (activeToasts.length >= TOAST_CONFIG.maxToasts) {
        const oldestToast = activeToasts.shift();
        hideToast(oldestToast);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    const container = document.querySelector('.toast-container') || createToastContainer();
    container.appendChild(toast);
    activeToasts.push(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    const autoHide = setTimeout(() => {
        hideToast(toast);
    }, TOAST_CONFIG.displayDuration);

    toast.addEventListener('click', () => {
        clearTimeout(autoHide);
        hideToast(toast);
    });
}

function hideToast(toast) {
    if (!toast) return;

    toast.classList.remove('show');
    toast.classList.add('hide');

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

document.querySelectorAll('[data-desc]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeToasts.length > 0) return; // 阻止重复触发
        const desc = item.getAttribute('data-desc');
        showToast(desc);
    });
});
