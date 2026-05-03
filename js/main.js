/* ============================================================
   WANDERLUST — main.js
   ============================================================ */

/* ---------- Nav scroll effect ---------- */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ---------- Hamburger / Mobile Menu ---------- */
const hamburger = document.getElementById('hamburger');
let mobileMenu = document.getElementById('mobileMenu');

if (!mobileMenu) {
  mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobileMenu';
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <button class="lightbox__close" id="menuClose" style="position:absolute;top:2rem;right:2rem;">✕</button>
    <a href="../index.html">Home</a>
    <a href="../pages/destinations.html">Destinations</a>
    <a href="../pages/guides.html">Travel Guides</a>
    <a href="../pages/gallery.html">Gallery</a>
    <a href="../pages/contact.html">Contact</a>
  `;
  document.body.appendChild(mobileMenu);
}

if (hamburger) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
}
const menuClose = document.getElementById('menuClose');
if (menuClose) {
  menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}

/* ---------- Scroll Reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

/* ---------- Newsletter ---------- */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn   = e.target.querySelector('button');
  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#2d6a4f';
  input.value = '';
  setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
}

/* ---------- Filter buttons ---------- */
function initFilters(cardSelector, attr) {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll(cardSelector);
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset[attr] === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}
initFilters('.dest-full-card', 'region');
initFilters('.guide-card', 'category');

/* ---------- Lightbox (gallery) ---------- */
function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<span class="lightbox__close">✕</span><img src="" alt="Gallery image" />';
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  items.forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.querySelector('img').src;
      lb.classList.add('open');
    });
  });
  lb.querySelector('.lightbox__close').addEventListener('click', () => lb.classList.remove('open'));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
}
initLightbox();

/* ---------- Contact form ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#2d6a4f';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; contactForm.reset(); }, 3500);
  });
}

/* ---------- Smooth anchor scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
// Dark mode toggle
function toggleDark() {
  document.body.classList.toggle("dark");
}

// Menu toggle
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}
