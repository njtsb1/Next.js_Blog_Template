const translations = {
  "en": {
    siteTitle: "Demo Blog",
    heroTitle: "Personal Blog",
    heroSubtitle: "A small demo to practice HTML5, CSS3 and JS — semantic, accessible and responsive.",
    postsTitle: "Latest posts",
    aboutTitle: "About",
    aboutText: "This is a small static blog demo focused on accessibility and responsive layout.",
    footerText: "© {year} Demo Blog. All rights reserved.",
    posts: [
      {
        date: "Jun 14, 2026",
        title: "Mental models for designers — PART 2",
        excerpt: "Consider that for a moment: everything we see around us is assumed to have had a cause and is contingent upon."
      },
      {
        date: "Jul 2, 2026",
        title: "Mental models for designers",
        excerpt: "Consider that for a moment: everything we see around us is assumed to have had a cause and is contingent upon."
      }
    ]
  },
  "pt-BR": {
    siteTitle: "Blog Demo",
    heroTitle: "Blog Pessoal",
    heroSubtitle: "Um pequeno demo para praticar HTML5, CSS3 e JS — semântico, acessível e responsivo.",
    postsTitle: "Últimas publicações",
    aboutTitle: "Sobre",
    aboutText: "Este é um blog estático de demonstração focado em acessibilidade e layout responsivo.",
    footerText: "© {year} Blog Demo. Todos os direitos reservados.",
    posts: [
      {
        date: "14 Jun, 2026",
        title: "Modelos mentais para designers — PARTE 2",
        excerpt: "Considere por um momento: tudo ao nosso redor é assumido como tendo uma causa e sendo contingente."
      },
      {
        date: "02 Jul, 2026",
        title: "Modelos mentais para designers",
        excerpt: "Considere por um momento: tudo ao nosso redor é assumido como tendo uma causa e sendo contingente."
      }
    ]
  },
  "es": {
    siteTitle: "Blog Demo",
    heroTitle: "Blog Personal",
    heroSubtitle: "Una pequeña demo para practicar HTML5, CSS3 y JS — semántico, accesible y responsivo.",
    postsTitle: "Últimas publicaciones",
    aboutTitle: "Acerca de",
    aboutText: "Este es un blog estático de demostración centrado en accesibilidad y diseño responsivo.",
    footerText: "© {year} Blog Demo. Todos los derechos reservados.",
    posts: [
      {
        date: "14 Jun, 2026",
        title: "Modelos mentales para diseñadores — PARTE 2",
        excerpt: "Considere por un momento: todo lo que vemos a nuestro alrededor se supone que tuvo una causa y es contingente."
      },
      {
        date: "02 Jul, 2026",
        title: "Modelos mentales para diseñadores",
        excerpt: "Considere por un momento: todo lo que vemos a nuestro alrededor se supone que tuvo una causa y es contingente."
      }
    ]
  }
};

const DEFAULT_LANG = 'en';
const LANG_KEY = 'demo_blog_lang';
const THEME_KEY = 'demo_blog_theme';

document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('lang-select');
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const yearEl = document.getElementById('year');

  // Set year
  yearEl.textContent = new Date().getFullYear();

  // Load saved language or default
  const savedLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
  setLanguage(savedLang);
  langSelect.value = savedLang;

  // Load saved theme or default (dark)
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);

  // Language change handler
  langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);
  });

  // Theme toggle handler
  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    const theme = isLight ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    localStorage.setItem(THEME_KEY, theme);
    // Update aria-label for clarity
    themeToggle.setAttribute('aria-label', isLight ? 'Toggle light mode' : 'Toggle dark mode');
  });

  // Keyboard accessible: Enter/Space toggles
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeToggle.click();
    }
  });

  // Helper: apply theme
  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
      themeToggle.setAttribute('aria-pressed', 'true');
      themeToggle.setAttribute('aria-label', 'Toggle light mode');
    } else {
      root.classList.remove('light');
      themeToggle.setAttribute('aria-pressed', 'false');
      themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }
  }

  // Helper: set language and update DOM
  function setLanguage(lang) {
    const t = translations[lang] || translations[DEFAULT_LANG];

    // Titles and texts
    document.getElementById('site-title').textContent = t.siteTitle;
    document.getElementById('hero-title').textContent = t.heroTitle;
    document.getElementById('hero-subtitle').textContent = t.heroSubtitle;
    document.getElementById('posts-title').textContent = t.postsTitle;
    document.getElementById('about-title').textContent = t.aboutTitle;
    document.getElementById('about-text').textContent = t.aboutText;
    document.getElementById('footer-text').textContent = t.footerText.replace('{year}', new Date().getFullYear());

    // Render posts
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    t.posts.forEach((p, idx) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = "#";
      a.className = "post-card";
      a.setAttribute('role', 'article');
      a.setAttribute('aria-labelledby', `post-title-${idx}`);
      a.innerHTML = `
        <div class="post-meta">${escapeHtml(p.date)}</div>
        <h3 id="post-title-${idx}" class="post-title">${escapeHtml(p.title)}</h3>
        <p class="post-excerpt">${escapeHtml(p.excerpt)}</p>
      `;
      li.appendChild(a);
      postList.appendChild(li);
    });
  }

  // Simple escape to avoid injection in this demo
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, (m) => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[m]));
  }
});
