import { getAnimalImage } from './api.js';
import { createAnimalModal } from './modal.js';

const FAV_KEY = 'favorites';
const RECENT_KEY = 'recentlyViewed';

let favorites = {};
let recentlyViewed = [];

export function loadFavorites() {
  favorites = JSON.parse(localStorage.getItem(FAV_KEY)) || {};
}

export function toggleFavorite(name, data) {
  if (favorites[name]) {
    delete favorites[name];
  } else {
    favorites[name] = data;
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
}

export function isFavorite(name) {
  return !!favorites[name];
}

export async function renderFavorites(container) {
  container.innerHTML = '';
  if (Object.keys(favorites).length === 0) {
    container.innerHTML = '<p>No favorites yet.</p>';
    return;
  }

  for (const [name, animal] of Object.entries(favorites)) {
    const image = await getAnimalImage(name);
    const slogan = animal.characteristics?.slogan || 'Amazing creature!';

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-image">
        <img src="${image}" alt="${name}" />
      </div>
      <h3>${name}</h3>
      <p>${slogan}</p>
      <button class="remove-btn">Remove</button>
    `;

    card.querySelector('.remove-btn').addEventListener('click', (e) => {
      e.stopPropagation(); // prevent modal from opening on remove
      toggleFavorite(name, animal);
      renderFavorites(container);
    });

    card.addEventListener('click', () => {
      createAnimalModal(animal, image);
    });

    container.appendChild(card);
  }
}

export function addToRecentlyViewed(name, data) {
  recentlyViewed = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];

  // remove duplicate if exists
  recentlyViewed = recentlyViewed.filter(a => a.name !== name);
  recentlyViewed.unshift({ name, data });

  if (recentlyViewed.length > 5) recentlyViewed = recentlyViewed.slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
}

export function loadRecentlyViewed() {
  recentlyViewed = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
}

function removeFromRecentlyViewed(name) {
  recentlyViewed = recentlyViewed.filter(item => item.name !== name);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
}

export async function renderRecentlyViewed(container) {
  container.innerHTML = '';
  if (recentlyViewed.length === 0) {
    container.innerHTML = '<p>No recently viewed animals.</p>';
    return;
  }

  for (const item of recentlyViewed) {
    const { name, data } = item;
    const image = await getAnimalImage(name);
    const slogan = data.characteristics?.slogan || 'Amazing creature!';

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-image">
        <img src="${image}" alt="${name}" />
      </div>
      <h3>${name}</h3>
      <p>${slogan}</p>
      <div class="card-buttons">
        <button class="remove-recent-btn">Remove</button>
      </div>
    `;

    card.querySelector('.remove-recent-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      removeFromRecentlyViewed(name);
      renderRecentlyViewed(container);
    });

    card.addEventListener('click', () => {
      createAnimalModal(data, image);
    });

    container.appendChild(card);
  }
}
