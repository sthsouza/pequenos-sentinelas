function handleBtn(btn, name) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.5;
  ripple.style.cssText = `width:${size}px;height:${size}px;top:50%;left:50%;margin-top:-${size/2}px;margin-left:-${size/2}px`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
  showToast(`Abrindo ${name}...`);
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '28px', left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: '#1565c0', color: '#fff',
    padding: '10px 24px', borderRadius: '24px',
    fontFamily: "'Nunito', sans-serif", fontWeight: '700',
    fontSize: '0.9rem', boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    zIndex: 999, opacity: '0',
    transition: 'all 0.3s ease'
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => t.remove(), 300);
  }, 1800);
}