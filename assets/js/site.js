/* =========================================================================
   Anaheim Lodge No. 207  —  assets/js/site.js
   No dependencies. Every module exits quietly if its markup isn't present,
   so this one file is safe to include on every page.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile navigation ----------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Hero slider with Ken Burns --------------------------------- */
  function initHero() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;

    var slides = Array.prototype.slice.call(hero.querySelectorAll('.hero__slide'));
    if (slides.length < 2) return;

    var dotsWrap = hero.querySelector('.hero__dots');
    var index = 0;
    var timer = null;
    var DURATION = 7000;

    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show slide ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function go(next) {
      slides[index].classList.remove('is-active');
      dots[index].classList.remove('is-active');
      index = (next + slides.length) % slides.length;
      // restart the Ken Burns animation on the incoming slide
      var media = slides[index].querySelector('.hero__media');
      if (media && !reduceMotion) {
        media.style.animation = 'none';
        void media.offsetWidth;
        media.style.animation = '';
      }
      slides[index].classList.add('is-active');
      dots[index].classList.add('is-active');
    }

    function restart() {
      if (timer) clearInterval(timer);
      if (reduceMotion) return;
      timer = setInterval(function () { go(index + 1); }, DURATION);
    }

    var prev = hero.querySelector('.hero__arrow--prev');
    var next = hero.querySelector('.hero__arrow--next');
    if (prev) prev.addEventListener('click', function () { go(index - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(index + 1); restart(); });

    hero.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    hero.addEventListener('mouseleave', restart);

    go(0);
    restart();
  }

  /* ---------- Accordion (one panel open at a time) ----------------------- */
  function initAccordions() {
    var groups = document.querySelectorAll('[data-accordion]');
    Array.prototype.forEach.call(groups, function (group) {
      var buttons = group.querySelectorAll('.accordion__btn');
      Array.prototype.forEach.call(buttons, function (btn) {
        btn.addEventListener('click', function () {
          var panel = document.getElementById(btn.getAttribute('aria-controls'));
          var isOpen = btn.getAttribute('aria-expanded') === 'true';

          Array.prototype.forEach.call(buttons, function (other) {
            other.setAttribute('aria-expanded', 'false');
            var p = document.getElementById(other.getAttribute('aria-controls'));
            if (p) p.classList.remove('is-open');
          });

          if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            if (panel) panel.classList.add('is-open');
          }
        });
      });
    });
  }

  /* ---------- Lightbox gallery ------------------------------------------ */
  function initLightbox() {
    var items = document.querySelectorAll('[data-lightbox]');
    if (!items.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image viewer');
    box.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous">&#8249;</button>' +
      '<div class="lightbox__stage"></div>' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next">&#8250;</button>';
    document.body.appendChild(box);

    var stage = box.querySelector('.lightbox__stage');
    var current = 0;
    var lastFocus = null;

    function render(i) {
      current = (i + items.length) % items.length;
      var src = items[current].getAttribute('data-lightbox');
      var alt = items[current].getAttribute('data-alt') || '';
      if (src) {
        stage.innerHTML = '<img src="' + src + '" alt="' + alt + '">';
      } else {
        // placeholder mode — mirror the tile until real assets land
        stage.innerHTML = '<div class="ph" style="width:76vw;height:64vh">' +
          (items[current].querySelector('.ph') ? items[current].querySelector('.ph').innerHTML : 'Image') +
          '</div>';
      }
    }

    function open(i) {
      lastFocus = document.activeElement;
      render(i);
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      box.querySelector('.lightbox__close').focus();
    }

    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    Array.prototype.forEach.call(items, function (item, i) {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('click', function () { open(i); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__nav--prev').addEventListener('click', function () { render(current - 1); });
    box.querySelector('.lightbox__nav--next').addEventListener('click', function () { render(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') render(current - 1);
      if (e.key === 'ArrowRight') render(current + 1);
    });
  }

  /* ---------- Boot ------------------------------------------------------- */
  function boot() {
    initNav();
    initHero();
    initAccordions();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

/* =========================================================================
   Multi-step conversational form  —  appended module
   Progressive enhancement: without JS every step is visible and the form
   still submits normally.
   ========================================================================= */
(function () {
  'use strict';

  function initQForm() {
    var form = document.querySelector('[data-qform]');
    if (!form) return;

    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
    if (!steps.length) return;

    var back = form.querySelector('[data-qback]');
    var next = form.querySelector('[data-qnext]');
    var send = form.querySelector('[data-qsubmit]');
    var bar = form.querySelector('.qform__progress');
    var i = 0;

    var pips = steps.map(function () {
      var el = document.createElement('i');
      if (bar) bar.appendChild(el);
      return el;
    });

    function clearError() {
      var e = form.querySelector('.qform__error');
      if (e) e.parentNode.removeChild(e);
    }

    function show(n) {
      clearError();
      i = Math.max(0, Math.min(n, steps.length - 1));
      steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      pips.forEach(function (p, k) { p.classList.toggle('is-done', k <= i); });

      if (back) back.hidden = (i === 0);
      if (next) next.hidden = (i === steps.length - 1);
      if (send) send.hidden = (i !== steps.length - 1);

      var focusable = steps[i].querySelector('input, textarea, select');
      if (focusable) focusable.focus({ preventScroll: true });
    }

    // Only validate the step you are on, not the hidden ones.
    function stepValid() {
      var fields = steps[i].querySelectorAll('input, textarea, select');
      for (var k = 0; k < fields.length; k++) {
        if (!fields[k].checkValidity()) {
          clearError();
          var msg = document.createElement('p');
          msg.className = 'qform__error';
          msg.setAttribute('role', 'alert');
          msg.textContent = fields[k].validationMessage || 'Please check this answer.';
          steps[i].appendChild(msg);
          fields[k].focus();
          return false;
        }
      }
      return true;
    }

    if (next) next.addEventListener('click', function () {
      if (stepValid()) show(i + 1);
    });
    if (back) back.addEventListener('click', function () { show(i - 1); });

    // Enter advances instead of submitting early
    form.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      if (e.target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      if (i < steps.length - 1) { if (stepValid()) show(i + 1); }
      else if (send) send.click();
    });

    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        // jump to the first step that is actually invalid
        for (var k = 0; k < steps.length; k++) {
          var f = steps[k].querySelectorAll('input, textarea, select');
          for (var j = 0; j < f.length; j++) {
            if (!f[j].checkValidity()) { show(k); stepValid(); return; }
          }
        }
      }
    });

    form.classList.add('is-enhanced');
    show(0);
  }

  /* Legal pages: keep the "last updated" year current without editing HTML */
  function initLegalDate() {
    var y = new Date().getFullYear();
    ['legal-date', 'legal-date-2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = y;
    });
  }

  function boot() { initQForm(); initLegalDate(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
