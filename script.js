/* ── Year ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Theme toggle ── */
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');
const saved = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
if (saved === 'light' || (!saved && prefersLight)) document.body.classList.add('light');
const updateIcon = () => {
  themeIcon.className = document.body.classList.contains('light') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
};
updateIcon();
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateIcon();
  initBlobs();
});

/* ── Mobile nav ── */
const navToggle = document.querySelector('.nav__toggle');
const navLinks  = document.querySelector('.nav__links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav__links a').forEach(l =>
  l.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ── Active nav link ── */
const sectionEls = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav__links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' });
sectionEls.forEach(s => navObs.observe(s));

/* ── Reveal on scroll ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 5) * 0.07 + 's';
  revObs.observe(el);
});

/* ── Animated background ── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, blobs, raf;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initBlobs() {
  const light = document.body.classList.contains('light');
  blobs = [
    { x: W * .12, y: H * .18, r: 520, vx: .16, vy: .09,  col: light ? '160,190,255' : '91,140,255',  a: light ? .07 : .11 },
    { x: W * .82, y: H * .72, r: 440, vx: -.11, vy: .13, col: light ? '150,120,255' : '155,107,255', a: light ? .05 : .09 },
    { x: W * .48, y: H * .44, r: 300, vx: .09, vy: -.11, col: light ? '80,210,190'  : '46,232,192',  a: light ? .04 : .07 },
  ];
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  blobs.forEach(b => {
    b.x += b.vx; b.y += b.vy;
    if (b.x < -b.r || b.x > W + b.r) b.vx *= -1;
    if (b.y < -b.r || b.y > H + b.r) b.vy *= -1;
    const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    g.addColorStop(0, `rgba(${b.col},${b.a})`);
    g.addColorStop(1, `rgba(${b.col},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
  });
  raf = requestAnimationFrame(draw);
}

resize(); initBlobs(); draw();
window.addEventListener('resize', () => { resize(); initBlobs(); });
