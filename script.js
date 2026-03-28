/**
 * Tamarind Trails — Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initSmoothScroll();
  initScrollReveal();
  initHeroParallax();
  initActiveNav();
  initContactForm();
});

/* ── Mobile navigation toggle ─────────────────────────────── */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!navToggle) return;

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Header background on scroll ─────────────────────────── */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ── Smooth scroll for anchor links ──────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h')
        ) || 76;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Intersection Observer scroll reveal ─────────────────── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ── Hero parallax ────────────────────────────────────────── */
function initHeroParallax() {
  const img = document.getElementById('heroBgImg');
  if (!img) return;

  // Disable on mobile (reduces motion, improves perf)
  const mq = window.matchMedia('(max-width: 768px)');
  if (mq.matches) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = img.closest('.hero').offsetHeight;
        if (scrollY <= heroHeight) {
          img.style.transform = `translateY(${scrollY * 0.35}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Active nav link on scroll ───────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const headerH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-h')
  ) || 76;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: `-${headerH}px 0px -55% 0px`, threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ── Contact form with in-page success state ─────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('formSubmit');
  if (!form || !successEl || !submitBtn) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const name  = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const msg   = form.querySelector('[name="message"]');

    if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
      // Highlight empty required fields
      [name, email, msg].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          field.addEventListener('input', () => {
            field.style.borderColor = '';
          }, { once: true });
        }
      });
      return;
    }

    // Simulate submission — replace with actual fetch/API call
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.style.display = 'none';
      successEl.removeAttribute('hidden');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  });
}
