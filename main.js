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






// بيانات الطلاب
const students = [
  {
    nationalCode: "1234@azhar",
    id: "2023001",
    name: "أحمد محمد",
    subjects: {
      "رياضيات": 90,
      "لغة عربية": 85,
      "لغة إنجليزية": 88,
      "حاسب آلي": 92
    }
  },
  {
    nationalCode: "5678@azhar",
    id: "2023002",
    name: "منى علي",
    subjects: {
      "رياضيات": 70,
      "لغة عربية": 75,
      "لغة إنجليزية": 80,
      "حاسب آلي": 60
    }
  }
];

// دالة عرض النتيجة
function showResult() {
  const studentCode = document.getElementById("studentCode").value.trim();
  const resultBox = document.getElementById("resultBox");

  const student = students.find(s => s.nationalCode === studentCode);

  if (!student) {
    resultBox.innerHTML = "<p style='color:red;'>⚠️ الطالب غير موجود!</p>";
    return;
  }

  resultBox.innerHTML = `
    <div class="card">
      <h2>${student.name}</h2>
      <h4>الرقم الجامعي: ${student.id}</h4>
      <ul class="result-list">
        ${Object.entries(student.subjects).map(([sub, mark]) => 
          `<li><strong>${sub}</strong>: ${mark}</li>`
        ).join("")}
      </ul>
      <button onclick="editResult('${student.nationalCode}')">✏️ تعديل النتيجة</button>
    </div>
  `;
}

// دالة تعديل النتيجة
function editResult(code) {
  const student = students.find(s => s.nationalCode === code);
  const resultBox = document.getElementById("resultBox");

  resultBox.innerHTML = `
    <div class="card">
      <h2>تعديل نتيجة: ${student.name}</h2>
      ${Object.entries(student.subjects).map(([sub, mark]) => `
        <label>${sub}: 
          <input type="number" id="${sub}" value="${mark}" min="0" max="100">
        </label>
      `).join("")}
      <button onclick="saveResult('${code}')">💾 حفظ التعديلات</button>
    </div>
  `;
}

// دالة حفظ النتيجة
function saveResult(code) {
  const student = students.find(s => s.nationalCode === code);
  
  for (let sub in student.subjects) {
    const newMark = document.getElementById(sub).value;
    student.subjects[sub] = parseInt(newMark);
  }

  alert("✅ تم حفظ التعديلات!");
  showResult(); // إعادة عرض النتيجة
}



 





