document.addEventListener('DOMContentLoaded', () => {
  const n = document.querySelector('.hamburger'),
    e = document.querySelector('.hamburger__items'),
    t = document.querySelector('.hamburger__close');
  n &&
    e &&
    n.addEventListener('click', () => {
      e.classList.toggle('active'), n.classList.toggle('open');
    }),
    t &&
      t.addEventListener('click', () => {
        e.classList.remove('active'), n.classList.remove('open');
      });
});
class s {
  constructor(e) {
    this.apiPath = e;
  }
  async fetchData() {
    try {
      return (await (await fetch(this.apiPath)).json()).liveEvents;
    } catch (e) {
      return console.error('Error fetching data:', e), [];
    }
  }
}
class o {
  constructor(e) {
    this.container = document.querySelector(e);
  }
  createLiveEvent({ title: e, description: t, image: i }) {
    const r = document.createElement('li');
    return (
      r.classList.add('live__list-item'),
      (r.innerHTML = `
        <div class="live__list-item-image-wrapper">
                <img src="${i}" class="live__list-item-image" alt="${e}" />
            </div>
            <div class="live__list-item-title">
                <h3>${e}</h3>
                <button class="live__list-item-btn" aria-label="Book ticket to live event">BOKA</button>
            </div>
            <div class="live__list-item-description">
                <p>${t}</p>
            </div>
            `),
      r
    );
  }
  renderLiveEvents(e) {
    if (!this.container) {
      console.error('Container element not found');
      return;
    }
    if (!Array.isArray(e) || e.length === 0) {
      this.container.innerHTML = '<p> No live events founds.</p>';
      return;
    }
    this.container.innerHTML = '';
    const t = document.createDocumentFragment();
    e.forEach((i) => {
      const r = this.createLiveEvent(i);
      t.appendChild(r);
    }),
      this.container.appendChild(t);
  }
}
async function a() {
  const n = './static/dist/json/liveEvents.json',
    e = new s(n),
    t = new o('.live__list');
  try {
    const i = await e.fetchData();
    t.renderLiveEvents(i);
  } catch (i) {
    console.error('Error initializing live events:', i);
  }
}
document.addEventListener('DOMContentLoaded', a);
