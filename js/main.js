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

  const nav = document.querySelector('.nav');
  function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (nav) nav.style.display = '';
  }

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (nav) nav.style.display = 'none';
    });

    const closeBtn = overlay.querySelector('.nav__overlay-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    overlay.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', closeMenu)
    );
  }

  // ── Theme ──
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  function updateThemeLabels() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.textContent = isDark ? 'Light' : 'Dark';
    });
  }

  updateThemeLabels();

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
      updateThemeLabels();
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
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = el.dataset.lang === l ? '' : 'none';
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

    const interactives = 'a, button, .work-index__item, .feed__link, .proj-nav__link';

    document.addEventListener('mouseover', e => {
      if (e.target.closest(interactives)) cursor.classList.add('cursor--active');
    });

    document.addEventListener('mouseout', e => {
      if (e.target.closest(interactives)) cursor.classList.remove('cursor--active');
    });
  }

  // ── Nav scroll compact ──
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

  // ── Hero slideshow ──
  const slides = document.querySelectorAll('.hero__slide');
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 3000);
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

  // ── Thinking hover preview ──
  const thinking = document.querySelector('.thinking');
  if (thinking && window.matchMedia('(pointer: fine)').matches) {
    const tp = document.createElement('div');
    tp.classList.add('thinking__preview');
    const tpImg = document.createElement('img');
    tpImg.alt = '';
    tp.appendChild(tpImg);
    document.body.appendChild(tp);

    thinking.querySelectorAll('.thinking__item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const src = item.dataset.img;
        if (src) {
          tpImg.src = src;
          tp.classList.add('visible');
        }
      });
      item.addEventListener('mouseleave', () => {
        tp.classList.remove('visible');
      });
    });
  }

  // ── Footer name auto-fit ──
  const footerName = document.querySelector('.footer__name');
  if (footerName) {
    function fitFooterName() {
      const footer = footerName.closest('.footer');
      const cs = getComputedStyle(footer);
      const maxW = footer.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (maxW < 50) return;
      let lo = 10, hi = 600, mid;
      footerName.style.fontSize = hi + 'px';
      while (hi - lo > 1) {
        mid = (lo + hi) / 2;
        footerName.style.fontSize = mid + 'px';
        if (footerName.scrollWidth > maxW) {
          hi = mid;
        } else {
          lo = mid;
        }
      }
      footerName.style.fontSize = lo + 'px';
    }
    fitFooterName();
    window.addEventListener('resize', fitFooterName);
    setTimeout(fitFooterName, 100);
    setTimeout(fitFooterName, 500);
    setTimeout(fitFooterName, 1500);
    new MutationObserver(() => fitFooterName()).observe(footerName.closest('.footer'), { attributes: true, attributeFilter: ['class'] });
  }

  // ── Lightbox ──
  const projImages = document.querySelectorAll('.proj-full img, .proj-pair img');
  if (projImages.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';

    const srcs = Array.from(projImages).map(img => img.src);
    const dotsHtml = srcs.map((_, i) => '<span class="lightbox__dot' + (i === 0 ? ' active' : '') + '"></span>').join('');

    lb.innerHTML = '<div class="lightbox__bg"></div>'
      + '<div class="lightbox__overlay"></div>'
      + '<img class="lightbox__img" alt="">'
      + '<button class="lightbox__close" aria-label="Close"></button>'
      + '<button class="lightbox__arrow lightbox__arrow--prev">←</button>'
      + '<button class="lightbox__arrow lightbox__arrow--next">→</button>'
      + '<div class="lightbox__dots">' + dotsHtml + '</div>';
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('.lightbox__img');
    const lbBg = lb.querySelector('.lightbox__bg');
    const dots = lb.querySelectorAll('.lightbox__dot');
    let idx = 0;

    function showSlide(i) {
      idx = (i + srcs.length) % srcs.length;
      lbImg.src = srcs[idx];
      lbBg.style.backgroundImage = 'url(' + srcs[idx] + ')';
      dots.forEach((d, j) => d.classList.toggle('active', j === idx));
    }

    function openLb(i) {
      showSlide(i);
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLb() {
      lb.classList.remove('active');
      document.body.style.overflow = '';
    }

    projImages.forEach((img, i) => {
      img.addEventListener('click', () => openLb(i));
    });

    lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
    lb.querySelector('.lightbox__arrow--prev').addEventListener('click', () => showSlide(idx - 1));
    lb.querySelector('.lightbox__arrow--next').addEventListener('click', () => showSlide(idx + 1));

    lb.addEventListener('click', e => {
      if (e.target === lb || e.target.classList.contains('lightbox__overlay')) closeLb();
    });

    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') showSlide(idx - 1);
      if (e.key === 'ArrowRight') showSlide(idx + 1);
    });
  }

  // ── Ticker clone for seamless loop ──
  const tickerStrip = document.querySelector('.ticker__strip');
  if (tickerStrip) {
    const items = tickerStrip.innerHTML;
    tickerStrip.innerHTML = items + items;
  }

  // ── Hover slideshow ──
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('[data-images]').forEach(item => {
      const container = item.querySelector('.feed__img, .work-grid__img, .archive__img');
      if (!container) return;
      const srcs = item.dataset.images.split(',');
      const imgs = [];
      srcs.forEach(src => {
        const img = document.createElement('img');
        img.src = src.trim();
        img.alt = '';
        img.loading = 'lazy';
        container.appendChild(img);
        imgs.push(img);
      });
      let idx = 0;
      let interval = null;
      item.addEventListener('mouseenter', () => {
        idx = 0;
        if (imgs[idx]) imgs[idx].classList.add('slide-active');
        interval = setInterval(() => {
          imgs[idx].classList.remove('slide-active');
          idx = (idx + 1) % imgs.length;
          imgs[idx].classList.add('slide-active');
        }, 900);
      });
      item.addEventListener('mouseleave', () => {
        clearInterval(interval);
        imgs.forEach(img => img.classList.remove('slide-active'));
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
