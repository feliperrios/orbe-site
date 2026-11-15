// ---------- Textos em inglês (o português já está no index.html) ----------
const EN = {
  docTitle: 'Orbe · Small products, big routines',
  docDesc: 'Orbe brings together simple apps to organize your routine. Meet FitFlow and E-Travel.',
  logoAria: 'Orbe, home page',
  navAria: 'Main',
  langAria: 'Language',
  navProducts: 'Products',
  navAbout: 'About',
  navContact: 'Contact',
  ctaLogin: 'Sign in to FitFlow',
  heroTitle: 'Small products,<br><b>big routines.</b>',
  heroText: 'Orbe brings together simple apps to organize your routine: workouts, nutrition, travel and whatever comes next.',
  stLive: 'available · beta',
  ffText: 'Clients, personal trainers and nutritionists connected in one app.',
  ffMore: 'Watch the intro video →',
  etFrom: 'FROM',
  etFromVal: 'EXPENSES',
  etTo: 'TO',
  etToVal: 'ITINERARY',
  etText: 'Trip expenses and itinerary, even offline.',
  etCur: 'CURRENCIES',
  etGroup: 'GROUP',
  yes: 'Yes',
  stIdea: 'idea',
  ideaTitle: 'Suggest one',
  ideaText: 'Tell us what would make your work easier. The next idea could be yours.',
  aboutEyebrow: 'About Orbe',
  aboutTitle: 'Each product solves one problem, <b>and solves it well.</b>',
  aboutText: "Orbe is the home of the apps I'm building. It started with FitFlow, for people who live and breathe training and nutrition, then came E-Travel, for people who love to travel, and it will keep growing with new products that are simple, fast and made for real life.",
  contactEyebrow: 'Contact',
  contactTitle: 'Want to talk about the products?',
  contactText: 'Send a message with your question, suggestion or app idea.',
  closeAria: 'Close video',
};

// Cada produto: vídeo, capa, textos da janela e link, nos dois idiomas
const PRODUCTS = {
  fitflow: {
    name: 'FitFlow',
    url: 'https://fitflow.orbehub.app',
    pt: { video: '/assets/fitflow-apresentacao.mp4', poster: '/assets/fitflow-capa.jpg', thumb: '/assets/fitflow-thumb.jpg',
          text: 'Treino, dieta e acompanhamento num lugar só.', cta: 'Acessar o FitFlow →', aria: 'Vídeo de apresentação do FitFlow' },
    en: { video: '/assets/fitflow-presentation-en.mp4', poster: '/assets/fitflow-cover-en.jpg', thumb: '/assets/fitflow-thumb-en.jpg',
          text: 'Workouts, nutrition and coaching in one place.', cta: 'Go to FitFlow →', aria: 'FitFlow intro video' },
  },
  etravel: {
    name: 'E-Travel',
    url: 'https://e-travel.orbehub.app',
    pt: { video: '/assets/etravel-apresentacao.mp4', poster: '/assets/etravel-capa.jpg',
          text: 'Os gastos e o roteiro da sua viagem num lugar só.', cta: 'Acessar o E-Travel →', aria: 'Vídeo de apresentação do E-Travel' },
    en: { video: '/assets/etravel-presentation-en.mp4', poster: '/assets/etravel-cover-en.jpg',
          text: 'Your trip expenses and itinerary in one place.', cta: 'Go to E-Travel →', aria: 'E-Travel intro video' },
  },
};

// Guarda o português original de cada elemento para poder voltar
const PT = {};
document.querySelectorAll('[data-i18n]').forEach(el => { PT[el.dataset.i18n] ??= el.textContent; });
document.querySelectorAll('[data-i18n-html]').forEach(el => { PT[el.dataset.i18nHtml] = el.innerHTML; });
document.querySelectorAll('[data-i18n-aria]').forEach(el => { PT[el.dataset.i18nAria] ??= el.getAttribute('aria-label'); });
PT.docTitle = document.title;
PT.docDesc = document.querySelector('meta[name="description"]').content;

const video = document.getElementById('product-video');
const thumb = document.getElementById('fitflow-thumb');
const modal = document.getElementById('video-modal');
let lang = 'pt';
let current = null; // produto aberto na janela

function fillModal() {
  if (!current) return;
  const p = PRODUCTS[current], m = p[lang];
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-text').textContent = m.text;
  const cta = document.getElementById('modal-cta');
  cta.textContent = m.cta;
  cta.href = p.url;
  modal.setAttribute('aria-label', m.aria);
  if (!video.src.endsWith(m.video)) { video.src = m.video; video.poster = m.poster; }
}

function setLang(l) {
  lang = l;
  const t = l === 'en' ? EN : PT;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t[el.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t[el.dataset.i18nHtml]; });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t[el.dataset.i18nAria]); });
  document.title = t.docTitle;
  document.querySelector('meta[name="description"]').content = t.docDesc;
  document.documentElement.lang = l === 'en' ? 'en' : 'pt-BR';
  document.documentElement.setAttribute('data-lang', l);
  thumb.src = PRODUCTS.fitflow[l].thumb;
  fillModal();

  document.querySelectorAll('.lang-menu [data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  document.getElementById('lang-cur').textContent = l.toUpperCase();
  try { localStorage.setItem('orbe-lang', l); } catch (e) {}
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

// ---------- Vídeo de cada produto: clicou no card, abre a janela ----------
document.querySelectorAll('[data-product]').forEach(card => card.addEventListener('click', () => {
  current = card.dataset.product;
  fillModal();
  modal.dataset.product = current;
  modal.showModal();
  video.currentTime = 0;
  video.play().catch(() => {});
}));
const fechar = () => { video.pause(); modal.close(); };
document.getElementById('close-video').addEventListener('click', fechar);
modal.addEventListener('click', (e) => { if (e.target === modal) fechar(); }); // clique fora fecha
modal.addEventListener('cancel', () => video.pause()); // tecla Esc

document.getElementById('ano').textContent = new Date().getFullYear();
