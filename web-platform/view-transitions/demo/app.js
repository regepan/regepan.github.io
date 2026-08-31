const supportStatus = document.querySelector('#support-status');
const layoutButtons = [...document.querySelectorAll('[data-layout]')];
const projectGrid = document.querySelector('#project-grid');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const isSupported = typeof document.startViewTransition === 'function';

function updateStatus() {
  supportStatus.dataset.supported = String(isSupported);
  if (!isSupported) {
    supportStatus.textContent = '未対応のため、アニメーションなしで切り替えます';
  } else if (reduceMotion.matches) {
    supportStatus.textContent = 'モーション軽減設定に合わせ、アニメーションを省略します';
  } else {
    supportStatus.textContent = '✓ このブラウザはView Transition APIに対応しています';
  }
}

function applyLayout(layout) {
  projectGrid.dataset.layout = layout;
  layoutButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.layout === layout));
  });
}

function changeLayout(layout) {
  const update = () => applyLayout(layout);
  if (!isSupported || reduceMotion.matches) {
    update();
    return;
  }
  document.startViewTransition(update);
}

layoutButtons.forEach((button) => {
  button.addEventListener('click', () => changeLayout(button.dataset.layout));
});

reduceMotion.addEventListener?.('change', updateStatus);
updateStatus();
