const supportStatus = document.querySelector('#support-status');
const positionButtons = [...document.querySelectorAll('[data-position]')];
const bubble = document.querySelector('#anchor-bubble');
const isSupported = CSS.supports('anchor-name: --demo-anchor');
const labels = {
  top: 'bottom: anchor(top)',
  right: 'left: anchor(right)',
  bottom: 'top: anchor(bottom)',
  left: 'right: anchor(left)'
};

supportStatus.dataset.supported = String(isSupported);
supportStatus.textContent = isSupported
  ? '✓ このブラウザはCSS Anchor Positioningに対応しています'
  : '未対応のため、吹き出しを通常配置で表示しています';

if (!isSupported) {
  positionButtons.forEach((button) => { button.disabled = true; });
}

positionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const position = button.dataset.position;
    positionButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    bubble.className = `anchor-bubble position-${position}`;
    bubble.textContent = labels[position];
  });
});
