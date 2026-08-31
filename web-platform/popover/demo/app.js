const supportStatus = document.querySelector('#support-status');
const trigger = document.querySelector('.menu-trigger');
const menu = document.querySelector('#action-menu');
const eventLog = document.querySelector('#event-log');
const isSupported = 'popover' in HTMLElement.prototype;

supportStatus.dataset.supported = String(isSupported);
supportStatus.textContent = isSupported
  ? '✓ このブラウザはPopover APIに対応しています'
  : 'このブラウザはPopover APIに対応していません';

if (!isSupported) {
  trigger.disabled = true;
  menu.hidden = true;
}

menu.addEventListener('toggle', (event) => {
  eventLog.textContent = event.newState === 'open'
    ? 'メニューが開きました。外側クリックまたはEscで閉じられます'
    : 'メニューは閉じています';
});
