/* ============================================================
   SEYLON — Main JavaScript
   Handles: nav scroll, mobile menu, fade animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFadeAnimations();
});

/* ── Navigation ────────────────────────────────────────────── */
function initNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Active link highlighting
  const links = document.querySelectorAll('.navbar__links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) link.classList.add('active');
  });
}

/* ── Mobile Menu ───────────────────────────────────────────── */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Scroll Fade Animations ────────────────────────────────── */
function initFadeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Trigger hero elements immediately on load
  setTimeout(() => {
    document.querySelectorAll('.hero__left .fade-up, .hero-left .fade-up').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}

/* ── Smooth scroll for anchor links ────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Escape key closes modals ──────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeQuiz();
    closeMobileMenu();
  }
});
