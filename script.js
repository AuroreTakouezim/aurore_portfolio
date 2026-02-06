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
  const icon = btnTheme.querySelector('i');
  const isLight = document.body.classList.contains('light');
  icon.classList.toggle('fa-sun', isLight);
  icon.classList.toggle('fa-moon', !isLight);
}

// Rendre la navbar active
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
const sections = Array.from(navLinks)
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 160;

  sections.forEach((section, index) => {
    if (
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
});




