/* =====================================================================
   Esteban Armas Vega — Personal Website
   script.js  (vanilla JS, no dependencies)
   ---------------------------------------------------------------------
   Features:
     1. Typewriter animation for the hero roles
     2. Sticky navbar opacity change on scroll
     3. Mobile hamburger menu
     4. Scroll-reveal fade-in for sections
     5. Active nav link highlighting on scroll
     6. Sort publications by citation count (descending)
     7. Project filter tabs (All / Active / Completed)
     8. Contact form -> mailto:
     9. Back-to-top button + current year in footer
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. TYPEWRITER --------------------------------------------------
     Edit ROLES to change the cycling job titles in the hero. */
  const ROLES = [
    'Cybersecurity Researcher',
    'Computer Vision Engineer',
    'Software Engineer',
    'Professor & Master\u2019s Lecturer',
    'EU R&D Project Contributor'
  ];
  const twEl = document.getElementById('typewriter');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const current = ROLES[roleIdx];
    if (!deleting) {
      twEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        return setTimeout(typeLoop, 1600); // pause at full word
      }
    } else {
      twEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % ROLES.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
  }
  if (twEl) typeLoop();

  /* ---- 2. STICKY NAVBAR OPACITY -------------------------------------- */
  const navbar = document.getElementById('navbar');
  const toTop = document.getElementById('toTop');
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    toTop.classList.toggle('show', y > 500);
    highlightNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- 3. MOBILE MENU ------------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );

  /* ---- 4. SCROLL-REVEAL --------------------------------------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ---- 5. ACTIVE NAV LINK ------------------------------------------- */
  const sections = [...document.querySelectorAll('section[id], header[id]')];
  const linkMap = {};
  document.querySelectorAll('.nav-links a').forEach(a => {
    linkMap[a.getAttribute('href').slice(1)] = a;
  });
  function highlightNav() {
    const pos = window.scrollY + 120;
    let currentId = '';
    for (const s of sections) {
      if (s.offsetTop <= pos) currentId = s.id;
    }
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (linkMap[currentId]) linkMap[currentId].classList.add('active');
  }

  /* ---- 6. SORT PUBLICATIONS BY CITATIONS (desc) --------------------- */
  const pubGrid = document.getElementById('pubGrid');
  if (pubGrid) {
    const cards = [...pubGrid.querySelectorAll('.pub-card')];
    cards.sort((a, b) =>
      (+b.dataset.citations || 0) - (+a.dataset.citations || 0)
    );
    cards.forEach(c => pubGrid.appendChild(c));
  }

  /* ---- 7. PROJECT FILTER TABS --------------------------------------- */
  const tabs = document.querySelectorAll('.tab-btn');
  const projCards = document.querySelectorAll('.project-card');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      projCards.forEach(card => {
        const show = (f === 'all') || (card.dataset.status === f);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ---- 8. CONTACT FORM -> mailto ------------------------------------ */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const subject = encodeURIComponent(`Website contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href =
        `mailto:esteban.armas@outlook.com?subject=${subject}&body=${body}`;
    });
  }

  /* ---- 9. BACK-TO-TOP + FOOTER YEAR --------------------------------- */
  toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
  document.getElementById('year').textContent = new Date().getFullYear();

  onScroll(); // set initial state
});
