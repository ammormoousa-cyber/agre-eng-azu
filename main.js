(function(){


// تبديل الثيم
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
themeBtn.addEventListener('click', () => {
const current = root.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';
root.setAttribute('data-theme', next);
localStorage.setItem('theme', next);
});
}


// قائمة الموبايل
const menuBtn = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
if (menuBtn && nav) {
menuBtn.addEventListener('click', () => {
nav.classList.toggle('open');
if (nav.classList.contains('open')) {
nav.style.display = 'flex';
nav.style.flexDirection = 'column';
nav.style.position = 'absolute';
nav.style.top = '64px';
nav.style.right = '4%';
nav.style.background = getComputedStyle(document.body).getPropertyValue('--bg');
nav.style.border = '1px solid var(--border)';
nav.style.borderRadius = '16px';
nav.style.padding = '8px';
nav.style.boxShadow = 'var(--shadow)';
nav.querySelectorAll('a').forEach(a=>{ a.style.padding = '.6rem .9rem'; a.style.display='block'; });
} else {
nav.removeAttribute('style');
nav.querySelectorAll('a').forEach(a=>{ a.removeAttribute('style'); });
}
});
}


// سكرول ناعم وتسكير القائمة بعد الاختيار
document.querySelectorAll('a[href^="#"]').forEach(link => {
link.addEventListener('click', (e) => {
const id = link.getAttribute('href');
const el = document.querySelector(id);
if (el) {
e.preventDefault();
el.scrollIntoView({ behavior: 'smooth', block: 'start' });
if (nav) { nav.classList.remove('open'); nav.removeAttribute('style'); nav.querySelectorAll('a').forEach(a=>a.removeAttribute('style')); }
}
});
});


// Reveal on scroll باستخدام IntersectionObserver
const io = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) entry.target.classList.add('show');
});
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
// إضافة تأخير للأنيميشن بحيث الكروت تدخل واحدة واحدة
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
});
