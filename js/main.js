document.addEventListener('DOMContentLoaded', () => {

  // ── Page entrance ──
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('page-visible');
    });
  });

  // ── Mobile menu ──
  const menuBtn = document.querySelector('.nav__menu-btn');
  const overlay = document.querySelector('.nav__overlay');

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  // ── Theme ──
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });

  // ── Language ──
  const lang = localStorage.getItem('lang') || 'en';
  applyLang(lang);

  document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = (localStorage.getItem('lang') || 'en') === 'en' ? 'es' : 'en';
      localStorage.setItem('lang', next);
      applyLang(next);
    });
  });

  function applyLang(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = l === 'en' ? el.dataset.en : (el.dataset.es || el.dataset.en);
      if (val.includes('<')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.textContent = l === 'en' ? 'ES' : 'EN';
    });
  }

  // ── Custom cursor ──
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    let cx = -100, cy = -100;

    document.addEventListener('mousemove', e => {
      cx = e.clientX;
      cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
    });

    const interactives = 'a, button, .work-index__item, .feed__link, .proj-next__link';

    document.addEventListener('mouseover', e => {
      if (e.target.closest(interactives)) cursor.classList.add('cursor--active');
    });

    document.addEventListener('mouseout', e => {
      if (e.target.closest(interactives)) cursor.classList.remove('cursor--active');
    });
  }

  // ── Nav scroll compact ──
  const nav = document.querySelector('.nav');
  if (nav) {
    let navTicking = false;
    window.addEventListener('scroll', () => {
      if (!navTicking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('nav--scrolled', window.scrollY > 60);
          navTicking = false;
        });
        navTicking = true;
      }
    });
  }

  // ── Hero parallax ──
  const heroImg = document.querySelector('.hero__img img');
  if (heroImg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroH = window.innerHeight;
          if (scrollY < heroH) {
            heroImg.style.transform = `translateY(${scrollY * 0.3}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Project cover parallax ──
  const projCover = document.querySelector('.proj-cover img');
  if (projCover) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 600) {
            projCover.style.transform = `translateY(${scrollY * 0.15}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Work index hover preview ──
  const workIndex = document.querySelector('.work-index');
  if (workIndex && window.matchMedia('(pointer: fine)').matches) {
    const preview = document.createElement('div');
    preview.classList.add('work-index__preview');
    const previewImg = document.createElement('img');
    previewImg.alt = '';
    preview.appendChild(previewImg);
    document.body.appendChild(preview);

    const imgMap = {
      'Aetnis': 'img/project-01.jpg',
      'Verso': 'img/project-02.jpg',
      'Nómada': 'img/project-03.jpg',
      'Latente': 'img/project-04.jpg',
      'Origen': 'img/project-05.jpg'
    };

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let rafId = null;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);
      preview.style.left = currentX + 'px';
      preview.style.top = currentY + 'px';
      rafId = requestAnimationFrame(animate);
    }

    workIndex.addEventListener('mousemove', e => {
      targetX = e.clientX + 24;
      targetY = e.clientY - 110;
    });

    workIndex.querySelectorAll('.work-index__item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const name = item.querySelector('.work-index__name').textContent;
        const src = imgMap[name];
        if (src) {
          previewImg.src = src;
          preview.classList.add('visible');
          if (!rafId) {
            currentX = targetX;
            currentY = targetY;
            rafId = requestAnimationFrame(animate);
          }
        }
      });

      item.addEventListener('mouseleave', () => {
        preview.classList.remove('visible');
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      });
    });
  }

  // ── Reveal with stagger ──
  const els = document.querySelectorAll('[data-reveal], [data-reveal-image], .line-grow');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  } else {
    els.forEach(el => el.classList.add('revealed'));
  }
});
