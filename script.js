// ---------- Textos em inglês (o português já está no index.html) ----------
const EN = {
  docTitle: 'Orbe · Small products, big routines',
  docDesc: 'Orbe brings together apps that make life easier for people who train, care for and serve others. Meet FitFlow.',
  logoAria: 'Orbe, home page',
  navAria: 'Main',
  langAria: 'Language',
  navProducts: 'Products',
  navAbout: 'About',
  navContact: 'Contact',
  ctaLogin: 'Sign in to FitFlow',
  heroTitle: 'Small products,<br><b>big routines.</b>',
  heroText: 'Orbe brings together apps that make life easier for people who train, care for and serve others.',
  stLive: 'available · beta',
  ffText: 'Clients, personal trainers and nutritionists connected in one app.',
  ffMore: 'Watch the intro video →',
  stSoon: 'coming soon',
  nextTitle: 'Next app',
  nextText: 'In development. It will show up here soon.',
  stIdea: 'idea',
  ideaTitle: 'Suggest one',
  ideaText: 'Tell us what would make your work easier. The next idea could be yours.',
  aboutEyebrow: 'About Orbe',
  aboutTitle: 'Each product solves one problem, <b>and solves it well.</b>',
  aboutText: "Orbe is the home of the apps I'm building. It started with FitFlow, for people who live and breathe training and nutrition, and it will grow with new products that are simple, fast and made for real life.",
  contactEyebrow: 'Contact',
  contactTitle: 'Want to talk about the products?',
  contactText: 'Send a message with your question, suggestion or app idea.',
  videoAria: 'FitFlow intro video',
  closeAria: 'Close video',
  modalText: 'Workouts, nutrition and coaching in one place.',
  modalCta: 'Go to FitFlow →',
};

// Vídeo, capa e miniatura de cada idioma
const MEDIA = {
  pt: { video: '/assets/fitflow-apresentacao.mp4', poster: '/assets/fitflow-capa.jpg', thumb: '/assets/fitflow-thumb.jpg' },
  en: { video: '/assets/fitflow-presentation-en.mp4', poster: '/assets/fitflow-cover-en.jpg', thumb: '/assets/fitflow-thumb-en.jpg' },
};

// Guarda o português original de cada elemento para poder voltar
const PT = {};
document.querySelectorAll('[data-i18n]').forEach(el => { PT[el.dataset.i18n] = el.textContent; });
document.querySelectorAll('[data-i18n-html]').forEach(el => { PT[el.dataset.i18nHtml] = el.innerHTML; });
document.querySelectorAll('[data-i18n-aria]').forEach(el => { PT[el.dataset.i18nAria] ??= el.getAttribute('aria-label'); });
PT.docTitle = document.title;
PT.docDesc = document.querySelector('meta[name="description"]').content;

const video = document.getElementById('fitflow-video');
const thumb = document.getElementById('fitflow-thumb');

function setLang(lang) {
  const t = lang === 'en' ? EN : PT;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t[el.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t[el.dataset.i18nHtml]; });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t[el.dataset.i18nAria]); });
  document.title = t.docTitle;
  document.querySelector('meta[name="description"]').content = t.docDesc;
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  document.documentElement.setAttribute('data-lang', lang);

  const m = MEDIA[lang];
  if (!video.src.endsWith(m.video)) { video.src = m.video; video.poster = m.poster; }
  thumb.src = m.thumb;

  document.querySelectorAll('.lang-menu [data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  document.getElementById('lang-cur').textContent = lang.toUpperCase();
  try { localStorage.setItem('orbe-lang', lang); } catch (e) {}
}

// Botão do globo: abre e fecha a lista de idiomas
const langBtn = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');
const abrirMenu = (abrir) => { langMenu.hidden = !abrir; langBtn.setAttribute('aria-expanded', String(abrir)); };
langBtn.addEventListener('click', (e) => { e.stopPropagation(); abrirMenu(langMenu.hidden); });
langMenu.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => { setLang(b.dataset.lang); abrirMenu(false); langBtn.focus(); }));
document.addEventListener('click', (e) => { if (!e.target.closest('.lang')) abrirMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !langMenu.hidden) { abrirMenu(false); langBtn.focus(); } });

setLang(document.documentElement.getAttribute('data-lang') || 'pt');

// ---------- Vídeo do FitFlow ----------
const modal = document.getElementById('video-modal');
document.getElementById('open-fitflow').addEventListener('click', () => {
  modal.showModal();
  video.currentTime = 0;
  video.play().catch(() => {});
});
const fechar = () => { video.pause(); modal.close(); };
document.getElementById('close-video').addEventListener('click', fechar);
modal.addEventListener('click', (e) => { if (e.target === modal) fechar(); }); // clique fora fecha
modal.addEventListener('cancel', () => video.pause()); // tecla Esc

document.getElementById('ano').textContent = new Date().getFullYear();
