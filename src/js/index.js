// Pratham Aggarwal — academic homepage
// Signature: hero text "unmasks" from noise, echoing inference-time
// unmasking in masked diffusion language models.

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile nav ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- scrollspy ---------- */
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const spyLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (sections.length && spyLinks.length && 'IntersectionObserver' in window) {
    const byId = {};
    spyLinks.forEach(function (l) { byId[l.getAttribute('href').slice(1)] = l; });
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && byId[e.target.id]) {
          spyLinks.forEach(function (l) { l.classList.remove('active'); });
          byId[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { obs.observe(s); });
  }

  /* ---------- unmask animation ---------- */
  const GLYPHS = '█▓▒░#%&$@/\\<>+=*▚▞:;01';
  const rand = function (s) { return s[(Math.random() * s.length) | 0]; };

  function unmask(el, startDelay) {
    const span = el.firstElementChild; // the aria-hidden span holding real text
    if (!span) return;
    const text = span.textContent;

    if (reduceMotion) { span.textContent = text; return; }

    const begin = performance.now() + startDelay;
    const STEP = 34;   // ms between each character locking in
    const SCRAMBLE = 260; // ms a character scrambles before it resolves

    function frame(now) {
      const t = now - begin;
      if (t < 0) { span.textContent = ''; requestAnimationFrame(frame); return; }
      let out = '';
      let done = true;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === ' ') { out += ' '; continue; }
        const lockAt = i * STEP + SCRAMBLE;
        if (t >= lockAt) {
          out += ch;
        } else if (t < i * STEP) {
          done = false; // not arrived yet -> blank, reads as tokens filling in
        } else {
          out += rand(GLYPHS);
          done = false;
        }
      }
      span.textContent = out;
      if (done) { span.textContent = text; }
      else { requestAnimationFrame(frame); }
    }
    requestAnimationFrame(frame);
  }

  document.querySelectorAll('[data-unmask]').forEach(function (el) {
    const delay = parseInt(el.getAttribute('data-unmask-delay') || '120', 10);
    unmask(el, delay);
  });
})();
