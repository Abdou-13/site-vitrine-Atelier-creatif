
// ----- Navigation -----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 20);
  // Progress bar
  const doc = document.documentElement;
  const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ----- Scroll reveal -----