'use strict';

/* ============================================
   THEME TOGGLE
   ============================================ */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

/* ============================================
   MOBILE NAVIGATION
   ============================================ */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileNav() {
  mobileNav.classList.add('open');
  mobileNavOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  mobileNavOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileNav);
mobileNavClose.addEventListener('click', closeMobileNav);
mobileNavOverlay.addEventListener('click', closeMobileNav);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

/* ============================================
   CUSTOM CURSOR (desktop only)
   ============================================ */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;

    if (cursor) {
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    }
    if (cursorDot) {
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll(
    'a, button, .skill-card, .project-item, .cert-card, .stat-block'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hovered'));
  });
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'Transforming data into decisions.',
  'Building dashboards that tell stories.',
  'Python · SQL · Power BI · ML',
  'Immediately available for full-time roles.',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => { isDeleting = true; typeWriter(); }, 2400);
      return;
    }
  } else {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 38 : 68);
}

// Only run typewriter on wider screens (on mobile it shows static text)
if (window.innerWidth > 768) {
  setTimeout(typeWriter, 1200);
} else {
  if (typewriterEl) typewriterEl.textContent = 'Data Analyst · Python · SQL · Power BI';
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ============================================
   SKILL CARDS — Stagger Reveal
   ============================================ */
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(28px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background 0.3s, border-color 0.3s';
});

const skillSection = document.querySelector('.skills');
if (skillSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      skillCards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 110);
      });
      skillObserver.disconnect();
    }
  }, { threshold: 0.1 });
  skillObserver.observe(skillSection);
}

/* ============================================
   CERT CARDS — Stagger Reveal
   ============================================ */
const certCards = document.querySelectorAll('.cert-card');
certCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(28px)';
  card.style.transition = 'opacity 0.7s ease, transform 0.7s ease, border-color 0.4s, background 0.4s, transform 0.3s';
});

const certsSection = document.querySelector('.certs');
if (certsSection) {
  const certObserver = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      certCards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 130);
      });
      certObserver.disconnect();
    }
  }, { threshold: 0.1 });
  certObserver.observe(certsSection);
}

/* ============================================
   ACTIVE NAV HIGHLIGHT
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY + window.innerHeight / 3 >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ============================================
   SMOOTH SCROLL
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ============================================
   HERO BG TEXT PARALLAX
   ============================================ */
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    heroBgText.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
}

/* ============================================
   SKILL CARDS — 3D Tilt (desktop only)
   ============================================ */
if (window.matchMedia('(hover: hover)').matches) {
  skillCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.style.transform = `translateY(-4px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
      this.style.perspective = '800px';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* ============================================
   PAGE LOAD FADE-IN
   ============================================ */
document.documentElement.style.opacity = '0';
document.documentElement.style.transition = 'opacity 0.35s ease';
window.addEventListener('load', () => {
  document.documentElement.style.opacity = '1';
});

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */
console.log(
  `%c KN %c Kushal Narendracumar — Data Analyst`,
  'background:#c9a94e;color:#0a0a0a;font-weight:bold;font-size:13px;padding:3px 8px;',
  'background:#111;color:#c9a94e;font-size:13px;padding:3px 8px;'
);
console.log('%c📧 kushalbamania7@gmail.com  📞 +91 88492 13774', 'color:#6b6660;font-size:11px;');
