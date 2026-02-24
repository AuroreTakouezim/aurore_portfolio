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

if (saved) {
  document.body.classList.toggle('light', saved === 'light');
} else if (prefersLight) {
  document.body.classList.add('light');
}

if (btnTheme) {
  const icon = btnTheme.querySelector('i');

  // Fonction pour mettre à jour l’icône
  const updateIcon = () => {
    const isLight = document.body.classList.contains('light');
    icon.classList.toggle('fa-sun', isLight);
    icon.classList.toggle('fa-moon', !isLight);
  };

  updateIcon();

  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('light');

    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    updateIcon();
  });
}


