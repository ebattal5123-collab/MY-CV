// Loader gizle
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  }, 1800); // 1.8 saniye sonra kaybolur — ring tam döngüyü tamamlar
});

// Yıl
document.getElementById('year').textContent = new Date().getFullYear();

// Tema geçişi
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDark || localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
});

// Animasyon tetikleyici
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('animated');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up, .fade-in, .fade-in-delay').forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

// EmailJS form gönderimi
(function() {
  const EMAILJS_PUBLIC_KEY = "user_YOUR_PUBLIC_KEY_HERE"; // ← BURAYI DOLDUR!
  if (typeof emailjs !== 'undefined') emailjs.init(EMAILJS_PUBLIC_KEY);

  const form = document.getElementById('contactForm');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = 'Gönderiliyor…';
    status.className = 'form-feedback';

    emailjs.send("service_cv", "template_9gbsd48", {
      from_name: form.from_name.value,
      from_email: form.from_email.value,
      message: form.message.value
    })
    .then(() => {
      status.textContent = '✅ Mesajınız gönderildi!';
      status.className = 'form-feedback success';
      form.reset();
      setTimeout(() => status.textContent = '', 4000);
    })
    .catch(err => {
      console.error('Hata:', err);
      status.textContent = '❌ Gönderim başarısız.';
      status.className = 'form-feedback error';
    });
  });
})();
