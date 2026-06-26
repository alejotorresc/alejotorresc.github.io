document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.nav__menu-btn');
  const navLinks = document.querySelector('.nav__links');
  const navControls = document.querySelector('.nav__controls');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      navLinks.classList.toggle('open');
      if (navControls) navControls.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('open');
        if (navControls) navControls.classList.remove('open');
      });
    });
  }

  // Theme toggle
  const stored = localStorage.getItem('theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);

  document.querySelectorAll('[data-toggle-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      if (next === 'light') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      localStorage.setItem('theme', next);
    });
  });

  // Language toggle
  const savedLang = localStorage.getItem('lang') || 'en';
  applyLang(savedLang);

  document.querySelectorAll('[data-toggle-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = localStorage.getItem('lang') || 'en';
      const next = current === 'en' ? 'es' : 'en';
      localStorage.setItem('lang', next);
      applyLang(next);
    });
  });

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.es;
    });
    document.querySelectorAll('[data-toggle-lang]').forEach(btn => {
      btn.textContent = lang === 'en' ? 'ES' : 'EN';
    });
  }

  // Reveal
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => obs.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }
});
