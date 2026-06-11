import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'leaflet/dist/leaflet.css';
import './styles.css';

import L from 'leaflet';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Phone, Mail, Menu, X, BadgeRussianRuble, Route, ShieldCheck } from 'lucide';
import { accessPlaces, accessPoints, accessRouteLabel, accessRoutePoints, company, dirtRoadStartPoint, faq, gallery, mapPlaces, prices, routePoints, secondaryAccessRouteLabel, secondaryAccessRoutePoints, secondaryDirtRoadStartPoint, secondaryRoutePoints } from './data.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="site-header" data-header>
    <a class="brand" href="#top" aria-label="${company.name}">
      <span class="brand__mark"><img src="/sultanbektur-logo.svg" alt="" aria-hidden="true" /></span>
      <span>
        <strong>${company.name}</strong>
        <small>сплавы по реке Сарс</small>
      </span>
    </a>
    <nav class="nav" data-nav aria-label="Основная навигация">
      <a href="#contacts">Контакты</a>
      <a href="#prices">Цены</a>
      <a href="#how-to-get">Как добраться</a>
      <a href="#route">Маршрут сплава</a>
    </nav>
    <a class="header-phone" href="${company.phoneHref}">${company.phone}</a>
    <button class="icon-button menu-button" data-menu aria-label="Открыть меню"></button>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__media"></div>
      <div class="hero__content">
        <p class="eyebrow">${company.season}</p>
        <h1 id="hero-title">Сплав по реке Сарс среди дикой природы</h1>
        <div class="hero__actions">
          <a class="button button--primary" href="#prices">Смотреть цены <span data-icon="arrow"></span></a>
          <a class="button button--ghost" href="#route">Маршрут на карте</a>
        </div>
      </div>
    </section>

    <section class="intro section" aria-labelledby="intro-title">
      <div class="section__heading">
        <p class="eyebrow">Что ждет на маршруте</p>
        <h2 id="intro-title">Родниковая вода, дикая природа и тишина вдали от городской суеты</h2>
      </div>
      <div class="intro__text">
          <p>Мы занимаемся организацией сплавов по реке Сарс в северном Башкортостане. Наш маршрут подходит абсолютно всем — специальная физическая подготовка или опыт водного туризма не требуются. Перед началом сплава инструкторы проводят подробный инструктаж, помогают с экипировкой и сопровождают группу на протяжении всего маршрута. Маршрут проходит по живописным участкам реки с умеренным течением, красивыми поворотами и панорамными видами на леса и горы. Сплав дарит яркие впечатления и ощущение настоящего путешествия, оставаясь при этом комфортным и доступным для участников без специальной подготовки.</p>
        <p>После сплава отдых продолжается на территории нашей турбазы. Для гостей оборудованы уютные места для проживания, бани, горячий чан под открытым небом, удобные зоны для купания, гамаки для отдыха, качели, батуты и сапборды для активного времяпрепровождения на воде. Здесь можно провести целый день, наслаждаясь природой, свежим воздухом и красивыми видами.</p>
        <p>Особое внимание мы уделяем питанию. Блюда готовятся из свежих и качественных продуктов, соответствующих нормам ХАЛЯЛЬ, часть которых поставляется местными домашними хозяйствами. Домашняя кухня, горячие блюда и отдых на природе делают путешествие не только интересным, но и по-настоящему комфортным.</p>
        <p>Мы берем на себя всю организацию отдыха — от маршрута и снаряжения до питания и размещения, чтобы вам оставалось только наслаждаться природой, чистой водой реки и незабываемой атмосферой настоящего путешествия.</p>
      </div>
    </section>

    <section class="section gallery-section" aria-labelledby="gallery-title">
      <div class="section__heading section__heading--row">
        <div>
          <h2 id="gallery-title" class="gallery-title">Фото галерея</h2>
        </div>
        <div class="gallery-controls">
          <button class="icon-button gallery-prev" aria-label="Предыдущее фото"></button>
          <button class="icon-button gallery-next" aria-label="Следующее фото"></button>
        </div>
      </div>
      <div class="swiper rafting-swiper">
        <div class="swiper-wrapper">
          ${gallery.map((image) => `
            <figure class="swiper-slide gallery-slide">
              <img src="${image.src}" data-fallback="${image.fallback}" alt="${image.alt}" loading="lazy" />
              ${image.caption === false ? '' : `<figcaption>${image.caption ?? image.alt}</figcaption>`}
            </figure>
          `).join('')}
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </section>

    <section class="section prices" id="prices" aria-labelledby="prices-title">
      <div class="section__heading">
        <h2 id="prices-title" class="prices-title">Цены</h2>
      </div>
        <div class="price-grid">
          ${prices.map((item) => `
            <article class="price-card">
              <div class="price-card__top">
                <img class="price-card__image ${item.stretchImage ? 'price-card__image--stretch' : ''}" src="${item.image}" alt="${item.imageAlt}" loading="lazy" />
                <div class="price-card__summary">
                <h3>${item.title}</h3>
                  <p class="price-card__price">${item.price}</p>
                  ${item.rates.length ? `
                    <ul class="price-card__rates">
                      ${item.rates.map((rate) => `<li>${rate}</li>`).join('')}
                    </ul>
                  ` : ''}
                  ${item.plainProgram ? `
                    <ul class="price-card__rates price-card__rates--plain">
                      ${item.program.map((feature) => `<li>${feature}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              </div>
              ${item.plainProgram ? '' : `
                <div class="price-card__body">
                  <details class="price-card__details">
                    <summary>Показать программу</summary>
                    ${item.programDays ? item.programDays.map((day) => `
                      <div class="price-card__program-day">
                        <h4>${day.title}</h4>
                        <ol class="price-card__program">
                          ${day.steps.map((step) => `<li>${step}</li>`).join('')}
                        </ol>
                      </div>
                    `).join('') : `
                      <ol class="price-card__program">
                        ${item.program.map((step) => `<li>${step}</li>`).join('')}
                      </ol>
                    `}
                  </details>
                </div>
              `}
            </article>
          `).join('')}
      </div>
    </section>

    <section class="map-band route-section" id="route" aria-labelledby="route-title">
      <div class="route-section__heading">
        <p class="eyebrow">Маршруты сплава</p>
      </div>
      <div class="route-pair">
        <div class="map-copy route-copy">
          <h3>Маршрут "А"</h3>
          <ul class="route-details">
            <li><strong>Старт</strong> - территория проведения ежегодного праздника Сабантуй в деревне Чурашево</li>
            <li><strong>Финиш</strong> - турбаза</li>
            <li><strong>Длина маршрута</strong> - около 9 - 10 км</li>
            <li><strong>Продолжительность сплава</strong> - около 5 - 6 часов</li>
          </ul>
        </div>
        <div class="map-wrap route-pair__map">
          <div id="route-map" class="map route-map-panel" role="img" aria-label="Карта первого маршрута сплава"></div>
        </div>
      </div>
      <div class="route-pair">
        <div class="map-copy route-copy">
          <h3>Маршрут "Б"</h3>
          <ul class="route-details">
            <li><strong>Старт</strong> - турбаза</li>
            <li><strong>Финиш</strong> - скала "Каменка" вблизи деревни Муллакаево</li>
            <li><strong>Длина маршрута</strong> - около 12 - 13 км</li>
            <li><strong>Продолжительность сплава</strong> - около 7 - 8 часов</li>
          </ul>
        </div>
        <div class="map-wrap route-pair__map">
          <div id="route-map-secondary" class="map route-map-panel" role="img" aria-label="Карта второго маршрута сплава"></div>
        </div>
      </div>
      <div>
        <a class="text-link route-maps__link" href="#how-to-get">Как добраться до турбазы</a>
      </div>
    </section>

    <section class="map-band map-band--reverse" id="how-to-get" aria-labelledby="access-title">
      <div class="map-copy">
        <p class="eyebrow">Как добраться</p>
        <h2 id="access-title">Турбаза</h2>
        <p>На карте представлены расположение туристической базы в деревне Султанбеково Аскинского района, а также дороги, по которым можно туда добраться. Протяженность участка дороги с районного центра село Аскино составляет 54 км, с районного центра село Караидель 32 км.</p>
        <a class="text-link" href="https://yandex.ru/maps/?ll=57.142698%2C56.020279&z=16&pt=57.142698%2C56.020279%2Cpm2rdm" target="_blank" rel="noreferrer">Открыть карту в навигаторе</a>
      </div>
      <div class="map-wrap">
        <div id="access-map" class="map" role="img" aria-label="Карта проезда до турбазы"></div>
        <div class="map-legend" aria-label="Обозначения маршрута до турбазы">
          <span><i class="map-legend__line map-legend__line--asphalt"></i>Асфальтная дорога</span>
          <span><i class="map-legend__line map-legend__line--dirt"></i>Грунтовая дорога</span>
        </div>
      </div>
    </section>

    <section class="section faq" aria-labelledby="faq-title">
      <div class="section__heading">
        <p class="eyebrow">FAQ</p>
        <h2 id="faq-title">Часто задаваемые вопросы</h2>
      </div>
      <div class="faq-list">
        ${faq.map((item, index) => `
          <details ${index === 0 ? 'open' : ''}>
            <summary>${item.question}</summary>
            ${item.answerGroups ? `
              <div class="faq-answer-groups">
                ${item.answerGroups.map((group) => `
                  <div class="faq-answer-group">
                    <h3>${group.title}</h3>
                    <ul class="faq-answer-list">
                      ${group.items.map((answerItem) => `<li>${answerItem}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
              ${item.note ? `<p class="faq-note">${item.note}</p>` : ''}
            ` : item.answerItems ? `
              <ul class="faq-answer-list">
                ${item.answerItems.map((answerItem) => `<li>${answerItem}</li>`).join('')}
              </ul>
              ${item.note ? `<p class="faq-note">${item.note}</p>` : ''}
            ` : `<p>${item.answer}</p>`}
          </details>
        `).join('')}
      </div>
    </section>
  </main>

  <footer class="footer" id="contacts">
    <div>
      <p class="eyebrow">Контакты</p>
      <div class="footer-brand">
        <img src="/sultanbektur-logo.svg" alt="" aria-hidden="true" />
        <h2>${company.name}</h2>
      </div>
      <p>Для записи на сплав или получения дополнительной информации можете позвонить по телефону или написать в мессенджер Max, WhatsApp.</p>
    </div>
    <div class="footer__contacts">
      <div class="contact-row">
        <a class="messenger-link" href="${company.whatsappHref}" target="_blank" rel="noreferrer" aria-label="WhatsApp"><span data-icon="whatsapp"></span></a>
        <a class="messenger-link" href="${company.maxHref}" target="_blank" rel="noreferrer" aria-label="MAX"><span data-icon="max"></span></a>
        <a class="contact-row__phone" href="${company.phoneHref}"><span data-icon="phone"></span>${company.phone}</a>
      </div>
      <a class="social-link" href="${company.vkHref}" target="_blank" rel="noreferrer" aria-label="Группа ВКонтакте"><span data-icon="vk"></span>${company.vkHref}</a>
      <a href="https://yandex.ru/maps/?ll=57.142668%2C56.020044&z=16&pt=57.142668%2C56.020044%2Cpm2rdm" target="_blank" rel="noreferrer"><span data-icon="pin"></span>Республика Башкортостан, Аскинский район, деревня Султанбеково</a>
    </div>
  </footer>
`;

const renderIcon = (icon, width = 20, height = 20) => {
  if (typeof icon === 'string') {
    return icon;
  }

  const renderNode = ([tag, attrs = {}, children = []], isRoot = false) => {
    const mergedAttrs = isRoot
      ? { ...attrs, width, height, 'aria-hidden': 'true', focusable: 'false' }
      : attrs;
    const attributes = Object.entries(mergedAttrs)
      .map(([key, value]) => `${key}="${String(value)}"`)
      .join(' ');
    const content = children.map((child) => renderNode(child)).join('');

    return `<${tag}${attributes ? ` ${attributes}` : ''}>${content}</${tag}>`;
  };

  return renderNode(icon, true);
};

const icons = {
  arrow: ArrowRight,
  phone: Phone,
  mail: Mail,
  pin: MapPin,
  ruble: BadgeRussianRuble,
  route: Route,
  shield: ShieldCheck,
  whatsapp: '<img class="messenger-icon" src="/whatsapp.svg" alt="" aria-hidden="true" />',
  max: '<img class="messenger-icon" src="/MAX.svg" alt="" aria-hidden="true" />',
  vk: '<img class="messenger-icon" src="/vk.svg" alt="" aria-hidden="true" />',
};

document.querySelectorAll('[data-icon]').forEach((node) => {
  const icon = icons[node.dataset.icon];
  if (icon) {
    node.innerHTML = renderIcon(icon);
  }
});

document.querySelectorAll('img[data-fallback]').forEach((image) => {
  image.addEventListener('error', () => {
    image.src = image.dataset.fallback;
    image.classList.add('is-fallback');
  }, { once: true });
});

document.querySelector('.gallery-prev').innerHTML = renderIcon(ChevronLeft, 22, 22);
document.querySelector('.gallery-next').innerHTML = renderIcon(ChevronRight, 22, 22);

const menuButton = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');
const renderMenuIcon = (isOpen) => {
  menuButton.innerHTML = renderIcon(isOpen ? X : Menu, 24, 24);
  menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
};

renderMenuIcon(false);
menuButton.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
  renderMenuIcon(nav.classList.contains('nav--open'));
});

nav.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    nav.classList.remove('nav--open');
    renderMenuIcon(false);
  }
});

new Swiper('.rafting-swiper', {
  modules: [Autoplay, Navigation, Pagination, Keyboard, A11y],
  loop: true,
  speed: 850,
  spaceBetween: 18,
  centeredSlides: true,
  slidesPerView: 1,
  autoplay: {
    delay: 3600,
    disableOnInteraction: false,
  },
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.gallery-next',
    prevEl: '.gallery-prev',
  },
  breakpoints: {
    860: {
      slidesPerView: 1.35,
      spaceBetween: 22,
    },
    1200: {
      slidesPerView: 1.55,
      spaceBetween: 26,
    },
  },
});

const markerIcon = L.divIcon({
  className: 'custom-marker',
  html: '<span></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const catamaranIcon = L.divIcon({
  className: 'catamaran-marker',
  html: `
    <svg viewBox="0 0 80 54" aria-hidden="true" focusable="false">
      <path class="catamaran-marker__shadow" d="M12 40c14 6 39 6 56 0" />
      <path class="catamaran-marker__wave" d="M10 42c7-4 14 4 21 0s14 4 21 0 12 3 18 0" />
      <path class="catamaran-marker__hull" d="M9 30h62l-9 12H21C15 42 11 37 9 30Z" />
      <path class="catamaran-marker__rim" d="M16 30h50" />
      <path class="catamaran-marker__cabin" d="M30 18h18l8 12H23l7-12Z" />
      <path class="catamaran-marker__window" d="M33 22h6M43 22h6" />
      <path class="catamaran-marker__bow" d="M62 30l9-5-2 5" />
      <path class="catamaran-marker__flag" d="M40 17V8l12 4-12 4Z" />
    </svg>
  `,
  iconSize: [40, 27],
  iconAnchor: [20, 16],
});

const villageIcon = L.divIcon({
  className: 'village-marker',
  html: `
    <svg viewBox="0 0 64 58" aria-hidden="true" focusable="false">
      <path class="village-marker__ground" d="M8 48h48" />
      <path class="village-marker__house" d="M10 30h18v18H10z" />
      <path class="village-marker__roof" d="M7 31l12-12 12 12" />
      <path class="village-marker__house village-marker__house--small" d="M34 35h16v13H34z" />
      <path class="village-marker__roof" d="M31 36l11-10 11 10" />
      <path class="village-marker__door" d="M17 39h5v9h-5z" />
      <path class="village-marker__window" d="M39 39h5v5h-5" />
      <path class="village-marker__tree" d="M54 31c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7Z" />
      <path class="village-marker__trunk" d="M54 43v6" />
    </svg>
  `,
  iconSize: [23, 21],
  iconAnchor: [12, 20],
});

const mountainIcon = L.divIcon({
  className: 'mountain-marker',
  html: `
    <svg viewBox="0 0 58 48" aria-hidden="true" focusable="false">
      <path class="mountain-marker__shadow" d="M8 42h42" />
      <path class="mountain-marker__back" d="M8 38 24 14l17 24H8Z" />
      <path class="mountain-marker__front" d="M18 38 35 8l17 30H18Z" />
      <path class="mountain-marker__snow" d="m35 8 6 11-6-3-5 5 5-13Z" />
      <path class="mountain-marker__ridge" d="M21 38h30" />
    </svg>
  `,
  iconSize: [27, 22],
  iconAnchor: [24, -4],
});

const springIcon = L.divIcon({
  className: 'spring-marker',
  html: `
    <svg viewBox="0 0 50 50" aria-hidden="true" focusable="false">
      <path class="spring-marker__shadow" d="M12 42h26" />
      <path class="spring-marker__drop" d="M25 5c8 9 13 16 13 24 0 7-5 13-13 13S12 36 12 29c0-8 5-15 13-24Z" />
      <path class="spring-marker__shine" d="M21 18c-3 4-4 8-3 12" />
      <path class="spring-marker__wave" d="M15 35c4-3 8 3 12 0s8 3 12 0" />
    </svg>
  `,
  iconSize: [26, 26],
  iconAnchor: [22, 12],
});

const baseIcon = L.divIcon({
  className: 'base-marker',
  html: `
    <svg viewBox="0 0 64 58" aria-hidden="true" focusable="false">
      <path class="base-marker__shadow" d="M8 50h48" />
      <path class="base-marker__trees" d="M5 50 12 35l8 15M49 50l7-14 7 14" />
      <path class="base-marker__tent" d="M12 50 31 17l19 33H12Z" />
      <path class="base-marker__tent-side" d="M31 17 50 50H36L31 17Z" />
      <path class="base-marker__tent-door" d="M24 50 31 34l7 16H24Z" />
      <path class="base-marker__flagpole" d="M47 16v34" />
      <path class="base-marker__flag" d="M47 16h12l-4 5 4 5H47z" />
    </svg>
  `,
  iconSize: [38, 34],
  iconAnchor: [-10, 32],
});

const accessPlaceIcon = L.divIcon({
  className: 'access-place-marker',
  html: '<span></span>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const labelOnlyIcon = L.divIcon({
  className: 'label-only-marker',
  html: '',
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

const createBaseMap = (id, center, zoom) => {
  const map = L.map(id, {
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: false,
  }).setView(center, zoom);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  }).addTo(map);

  L.control.attribution({
    prefix: false,
  }).addTo(map);

  return map;
};

const routeMap = createBaseMap('route-map', [56.878, 60.69], 11);
L.polyline(routePoints, {
  color: '#0891b2',
  weight: 6,
  opacity: 0.95,
  lineJoin: 'round',
  lineCap: 'round',
}).addTo(routeMap);
L.marker(routePoints[0], { icon: markerIcon }).addTo(routeMap).bindPopup('Старт сплава');
L.marker(routePoints.at(-1), { icon: markerIcon })
  .addTo(routeMap)
  .bindPopup(`
    <article class="map-popup">
      <div class="map-popup__image" aria-hidden="true">
        <svg viewBox="0 0 180 92">
          <rect width="180" height="92" rx="8" fill="#eaf5f3" />
          <circle cx="151" cy="18" r="12" fill="#f2b84b" />
          <path d="M0 65c30-13 59-14 92-4 36 11 63 6 88-9v40H0z" fill="#6d8f2a" />
          <path d="M32 45h52v34H32z" fill="#fff7ed" />
          <path d="M23 46 58 18l35 28" fill="#b85f3a" />
          <rect x="52" y="62" width="13" height="17" fill="#2f4f3c" />
          <rect x="38" y="55" width="10" height="9" fill="#67e8f9" />
          <rect x="70" y="55" width="10" height="9" fill="#67e8f9" />
          <path d="M116 27v52" stroke="#17211d" stroke-width="4" stroke-linecap="round" />
          <path d="M116 28h28l-7 10 7 10h-28z" fill="#0e7490" stroke="#17211d" stroke-width="3" stroke-linejoin="round" />
        </svg>
      </div>
      <strong>Финишная база</strong>
      <p>Здесь завершается маршрут сплава и начинается трансфер обратно.</p>
    </article>
  `);
L.marker(routePoints.at(-1), {
  icon: baseIcon,
  interactive: false,
  keyboard: false,
  zIndexOffset: 800,
}).addTo(routeMap)
  .bindTooltip('Турбаза', {
    permanent: true,
    direction: 'right',
    offset: [8, -30],
    className: 'map-label map-label--base',
  });
mapPlaces.forEach((place) => {
  if (place.type === 'village') {
    const villageMarker = L.marker(place.coordinates, { icon: villageIcon })
      .addTo(routeMap);

    if (place.showLabel !== false) {
      villageMarker.bindTooltip(place.title, {
        permanent: true,
        direction: 'left',
        offset: [-4, -18],
        className: 'map-label map-label--village',
      });
    }

    villageMarker.bindPopup(`
        <article class="map-popup">
          <div class="map-popup__image" aria-hidden="true">
            <svg viewBox="0 0 180 92">
              <rect width="180" height="92" rx="8" fill="#dff3f1" />
              <circle cx="150" cy="18" r="13" fill="#f2b84b" />
              <path d="M0 62c28-16 52-18 82-6 31 13 60 6 98-12v48H0z" fill="#6d8f2a" />
              <path d="M22 45h34v28H22z" fill="#fff7ed" />
              <path d="M16 46l23-22 23 22" fill="#b85f3a" />
              <path d="M80 52h30v21H80z" fill="#fff7ed" />
              <path d="M74 53l21-18 21 18" fill="#b85f3a" />
              <rect x="34" y="57" width="9" height="16" fill="#2f4f3c" />
              <rect x="89" y="58" width="8" height="8" fill="#0e7490" />
              <path d="M130 46c10 0 17 7 17 16s-7 16-17 16-17-7-17-16 7-16 17-16Z" fill="#2f4f3c" />
            </svg>
          </div>
          <strong>${place.title}</strong>
          <p>${place.description}</p>
        </article>
      `);
  }

  if (place.type === 'mountain') {
    L.marker(place.coordinates, { icon: mountainIcon })
      .addTo(routeMap)
      .bindTooltip(place.title, {
        permanent: true,
        direction: 'right',
        offset: [-4, 6],
        className: 'map-label map-label--mountain',
      })
      .bindPopup(`
        <article class="map-popup">
          <div class="map-popup__image" aria-hidden="true">
            <svg viewBox="0 0 180 92">
              <rect width="180" height="92" rx="8" fill="#dff3f1" />
              <circle cx="150" cy="18" r="13" fill="#f2b84b" />
              <path d="M0 70c34-17 66-22 105-7 31 12 50 9 75-7v36H0z" fill="#6d8f2a" />
              <path d="M18 70 62 22l44 48H18Z" fill="#2f4f3c" />
              <path d="M72 70 116 14l46 56H72Z" fill="#6d8f2a" />
              <path d="m116 14 13 16-12-5-10 12 9-23Z" fill="#ecfeff" />
              <path d="M42 70c18-9 32-9 50 0" fill="none" stroke="#67e8f9" stroke-width="5" stroke-linecap="round" />
            </svg>
          </div>
          <strong>${place.title}</strong>
          <p>${place.description}</p>
        </article>
      `);
  }

  if (place.type === 'spring') {
    L.marker(place.coordinates, { icon: springIcon })
      .addTo(routeMap)
      .bindTooltip(`
        <span class="map-label__line">${place.title}</span>
        <span class="map-label__line">${place.label}</span>
      `, {
        permanent: true,
        direction: 'left',
        offset: [1, 4],
        className: 'map-label map-label--spring',
      })
      .bindPopup(`
        <article class="map-popup">
          <div class="map-popup__image" aria-hidden="true">
            <svg viewBox="0 0 180 92">
              <rect width="180" height="92" rx="8" fill="#e0f7fa" />
              <path d="M0 63c28-12 57-12 88-2 35 12 62 7 92-9v40H0z" fill="#6d8f2a" />
              <path d="M92 18c18 20 28 34 28 49 0 14-11 24-28 24S64 81 64 67c0-15 10-29 28-49Z" fill="#0e7490" />
              <path d="M83 43c-6 8-8 16-5 25" fill="none" stroke="#ecfeff" stroke-width="5" stroke-linecap="round" />
              <path d="M42 72c14-8 27 8 41 0s27 8 41 0" fill="none" stroke="#67e8f9" stroke-width="6" stroke-linecap="round" />
            </svg>
          </div>
          <strong>${place.title}</strong>
          <p>${place.description}</p>
        </article>
      `);
  }
});
routeMap.fitBounds(routePoints, { padding: [28, 28] });

const secondaryRouteMap = createBaseMap('route-map-secondary', [55.99, 57.13], 12);
L.polyline(secondaryRoutePoints, {
  color: '#0891b2',
  weight: 6,
  opacity: 0.95,
  lineJoin: 'round',
  lineCap: 'round',
}).addTo(secondaryRouteMap);
L.marker(secondaryRoutePoints[0], { icon: markerIcon }).addTo(secondaryRouteMap).bindPopup('Старт маршрута 2');
L.marker(secondaryRoutePoints.at(-1), { icon: markerIcon }).addTo(secondaryRouteMap).bindPopup('Финиш маршрута 2');
L.marker(secondaryRoutePoints.at(-1), {
  icon: labelOnlyIcon,
  interactive: false,
  keyboard: false,
})
  .addTo(secondaryRouteMap)
  .bindTooltip('Скала "Каменка"', {
    permanent: true,
    direction: 'right',
    offset: [10, -8],
    className: 'map-label map-label--rock',
  });
L.marker([56.02385, 57.13328], { icon: villageIcon })
  .addTo(secondaryRouteMap)
  .bindTooltip('Султанбеково', {
    permanent: true,
    direction: 'left',
    offset: [-4, -18],
    className: 'map-label map-label--village',
  })
  .bindPopup(`
    <article class="map-popup">
      <div class="map-popup__image" aria-hidden="true">
        <svg viewBox="0 0 180 92">
          <rect width="180" height="92" rx="8" fill="#dff3f1" />
          <circle cx="150" cy="18" r="13" fill="#f2b84b" />
          <path d="M0 62c28-16 52-18 82-6 31 13 60 6 98-12v48H0z" fill="#6d8f2a" />
          <path d="M22 45h34v28H22z" fill="#fff7ed" />
          <path d="M16 46l23-22 23 22" fill="#b85f3a" />
          <path d="M80 52h30v21H80z" fill="#fff7ed" />
          <path d="M74 53l21-18 21 18" fill="#b85f3a" />
          <rect x="34" y="57" width="9" height="16" fill="#2f4f3c" />
          <rect x="89" y="58" width="8" height="8" fill="#0e7490" />
          <path d="M130 46c10 0 17 7 17 16s-7 16-17 16-17-7-17-16 7-16 17-16Z" fill="#2f4f3c" />
        </svg>
      </div>
      <strong>Султанбеково</strong>
      <p>Деревня рядом с маршрутом сплава.</p>
    </article>
  `);
L.marker([55.950305, 57.100775], { icon: villageIcon })
  .addTo(secondaryRouteMap)
  .bindTooltip('Новомулакаево', {
    permanent: true,
    direction: 'left',
    offset: [-4, -18],
    className: 'map-label map-label--village',
  })
  .bindPopup(`
    <article class="map-popup">
      <div class="map-popup__image" aria-hidden="true">
        <svg viewBox="0 0 180 92">
          <rect width="180" height="92" rx="8" fill="#dff3f1" />
          <circle cx="150" cy="18" r="13" fill="#f2b84b" />
          <path d="M0 62c28-16 52-18 82-6 31 13 60 6 98-12v48H0z" fill="#6d8f2a" />
          <path d="M22 45h34v28H22z" fill="#fff7ed" />
          <path d="M16 46l23-22 23 22" fill="#b85f3a" />
          <path d="M80 52h30v21H80z" fill="#fff7ed" />
          <path d="M74 53l21-18 21 18" fill="#b85f3a" />
          <rect x="34" y="57" width="9" height="16" fill="#2f4f3c" />
          <rect x="89" y="58" width="8" height="8" fill="#0e7490" />
          <path d="M130 46c10 0 17 7 17 16s-7 16-17 16-17-7-17-16 7-16 17-16Z" fill="#2f4f3c" />
        </svg>
      </div>
      <strong>Новомулакаево</strong>
      <p>Населенный пункт рядом с маршрутом сплава.</p>
    </article>
  `);
L.marker(accessPoints.finish, { icon: baseIcon, zIndexOffset: 800 })
  .addTo(secondaryRouteMap)
  .bindTooltip('Турбаза', {
    permanent: true,
    direction: 'right',
    offset: [8, -30],
    className: 'map-label map-label--base',
  })
  .bindPopup(`
    <article class="map-popup">
      <div class="map-popup__image" aria-hidden="true">
        <svg viewBox="0 0 180 92">
          <rect width="180" height="92" rx="8" fill="#eaf5f3" />
          <circle cx="151" cy="18" r="12" fill="#f2b84b" />
          <path d="M0 65c30-13 59-14 92-4 36 11 63 6 88-9v40H0z" fill="#6d8f2a" />
          <path d="M32 45h52v34H32z" fill="#fff7ed" />
          <path d="M23 46 58 18l35 28" fill="#b85f3a" />
          <rect x="52" y="62" width="13" height="17" fill="#2f4f3c" />
          <rect x="38" y="55" width="10" height="9" fill="#67e8f9" />
          <rect x="70" y="55" width="10" height="9" fill="#67e8f9" />
          <path d="M116 27v52" stroke="#17211d" stroke-width="4" stroke-linecap="round" />
          <path d="M116 28h28l-7 10 7 10h-28z" fill="#0e7490" stroke="#17211d" stroke-width="3" stroke-linejoin="round" />
        </svg>
      </div>
      <strong>Турбаза</strong>
      <p>Точка на территории турбазы у деревни Султанбеково.</p>
    </article>
  `);
secondaryRouteMap.fitBounds([...secondaryRoutePoints, accessPoints.finish, [56.02385, 57.13328], [55.950305, 57.100775]], { padding: [28, 28] });

const getSegmentLength = ([startLat, startLng], [endLat, endLng]) => {
  const latDistance = endLat - startLat;
  const lngDistance = endLng - startLng;

  return Math.hypot(latDistance, lngDistance);
};

const getAngle = ([startLat, startLng], [endLat, endLng]) => {
  const y = -(endLat - startLat);
  const x = endLng - startLng;

  return Math.atan2(y, x) * 180 / Math.PI;
};

const createRouteAnimation = (map, points, duration) => {
  const segments = points.slice(0, -1).map((point, index) => {
    const nextPoint = points[index + 1];

    return {
      start: point,
      end: nextPoint,
      length: getSegmentLength(point, nextPoint),
      angle: getAngle(point, nextPoint),
    };
  });
  const totalLength = segments.reduce((sum, segment) => sum + segment.length, 0);
  const marker = L.marker(points[0], {
    icon: catamaranIcon,
    interactive: false,
    keyboard: false,
    zIndexOffset: 1000,
  }).addTo(map);

  const animate = (startTime) => {
    const progress = ((performance.now() - startTime) % duration) / duration;
    let distance = progress * totalLength;
    let activeSegment = segments.at(-1);

    for (const segment of segments) {
      if (distance <= segment.length) {
        activeSegment = segment;
        break;
      }

      distance -= segment.length;
    }

    const segmentProgress = activeSegment.length === 0 ? 0 : distance / activeSegment.length;
    const lat = activeSegment.start[0] + (activeSegment.end[0] - activeSegment.start[0]) * segmentProgress;
    const lng = activeSegment.start[1] + (activeSegment.end[1] - activeSegment.start[1]) * segmentProgress;

    marker.setLatLng([lat, lng]);
    marker.getElement()?.style.setProperty('--catamaran-rotation', `${activeSegment.angle}deg`);
    requestAnimationFrame(() => animate(startTime));
  };

  requestAnimationFrame(() => animate(performance.now()));
};

createRouteAnimation(routeMap, routePoints, 52000);
createRouteAnimation(secondaryRouteMap, secondaryRoutePoints, 68000);

const accessMap = createBaseMap('access-map', accessPoints.meeting, 12);
const dirtRoadStartIndex = accessRoutePoints.findIndex(([lat, lng]) => lat === dirtRoadStartPoint[0] && lng === dirtRoadStartPoint[1]);
const asphaltRoadPoints = accessRoutePoints.slice(0, dirtRoadStartIndex + 1);
const dirtRoadPoints = accessRoutePoints.slice(dirtRoadStartIndex);
const secondaryDirtRoadStartIndex = secondaryAccessRoutePoints.findIndex(([lat, lng]) => lat === secondaryDirtRoadStartPoint[0] && lng === secondaryDirtRoadStartPoint[1]);
const secondaryAsphaltRoadPoints = secondaryAccessRoutePoints.slice(0, secondaryDirtRoadStartIndex + 1);
const secondaryDirtRoadPoints = secondaryAccessRoutePoints.slice(secondaryDirtRoadStartIndex);

L.polyline(asphaltRoadPoints, {
  color: '#f2b84b',
  weight: 5,
  opacity: 0.95,
  lineJoin: 'round',
  lineCap: 'round',
}).addTo(accessMap);

L.polyline(dirtRoadPoints, {
  color: '#f97316',
  weight: 5,
  opacity: 0.95,
  dashArray: '10 8',
  lineJoin: 'round',
  lineCap: 'round',
}).addTo(accessMap);

L.polyline(secondaryAsphaltRoadPoints, {
  color: '#f2b84b',
  weight: 4,
  opacity: 0.9,
  lineJoin: 'round',
  lineCap: 'round',
}).addTo(accessMap);

L.polyline(secondaryDirtRoadPoints, {
  color: '#f97316',
  weight: 4,
  opacity: 0.9,
  dashArray: '8 7',
  lineJoin: 'round',
  lineCap: 'round',
}).addTo(accessMap);

L.marker(accessPoints.meeting, { icon: markerIcon })
  .addTo(accessMap)
  .bindTooltip('Турбаза', {
    permanent: true,
    direction: 'bottom',
    offset: [14, -2],
    className: 'map-label map-label--meeting',
  })
  .bindPopup('Турбаза');
accessPlaces.forEach((place) => {
  L.marker(place.coordinates, { icon: accessPlaceIcon })
    .addTo(accessMap)
    .bindTooltip(place.title, {
      permanent: true,
      direction: place.labelDirection ?? 'right',
      offset: place.labelOffset ?? [6, -6],
      className: 'map-label map-label--access',
    });
});
L.marker(accessRouteLabel.coordinates, {
  icon: labelOnlyIcon,
  interactive: false,
  keyboard: false,
})
  .addTo(accessMap)
  .bindTooltip(accessRouteLabel.title, {
    permanent: true,
    direction: 'top',
    offset: [0, -8],
    className: 'map-route-distance-label',
  });
L.marker(secondaryAccessRouteLabel.coordinates, {
  icon: labelOnlyIcon,
  interactive: false,
  keyboard: false,
})
  .addTo(accessMap)
  .bindTooltip(secondaryAccessRouteLabel.title, {
    permanent: true,
    direction: 'top',
    offset: [-6, -8],
    className: 'map-route-distance-label',
  });
accessMap.fitBounds([...accessRoutePoints, ...secondaryAccessRoutePoints], { padding: [36, 36] });
