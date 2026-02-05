// JS – interactions (FR)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Theme toggle (dark/light)
const btnTheme = document.getElementById('theme-toggle');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const saved = localStorage.getItem('theme');
if (saved) document.body.classList.toggle('light', saved === 'light');
else if (prefersLight) document.body.classList.add('light');

if (btnTheme) {
  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    btnTheme.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
  });
}

<script>
const links = document.querySelectorAll('.nav__links a');
const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));

window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sections.forEach((sec, i) => {
    if (sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y) {
      links.forEach(l => l.classList.remove('active'));
      links[i].classList.add('active');
    }
  });
});
</script>

