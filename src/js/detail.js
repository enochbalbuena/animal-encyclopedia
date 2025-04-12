// src/js/detail.js
import { getAnimalByName, getAnimalImage } from './api.js';
import { addToRecentlyViewed, isFavorite, toggleFavorite } from './storage.js';

async function loadAnimalDetail() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');

  const container = document.getElementById('detailContainer');
  container.innerHTML = '';

  if (!name) {
    container.innerHTML = '<p>No animal specified.</p>';
    return;
  }

  try {
    const [animal] = await getAnimalByName(name);
    if (!animal) throw new Error('Animal not found');

    const imageUrl = await getAnimalImage(name);
    addToRecentlyViewed(name, animal);

    const favText = isFavorite(name) ? 'Remove from Favorites' : 'Add to Favorites';

    container.innerHTML = `
      <div class="animal-detail-card">
        <img src="${imageUrl}" alt="${animal.name}" />
        <h2>${animal.name}</h2>
        <h4><em>${animal.characteristics?.slogan || 'An incredible creature!'}</em></h4>
        <button id="favBtn">${favText}</button>

        <section>
          <h3>Taxonomy</h3>
          <ul>
            ${Object.entries(animal.taxonomy).map(([key, val]) => `<li><strong>${capitalize(key)}:</strong> ${val}</li>`).join('')}
          </ul>
        </section>

        <section>
          <h3>Key Characteristics</h3>
          <ul>
            ${Object.entries(animal.characteristics).map(([key, val]) => `<li><strong>${formatKey(key)}:</strong> ${val}</li>`).join('')}
          </ul>
        </section>

        <section>
          <h3>Found In</h3>
          <p>${animal.locations.join(', ')}</p>
        </section>
      </div>
    `;

    document.getElementById('favBtn').addEventListener('click', () => {
      toggleFavorite(name, animal);
      document.getElementById('favBtn').textContent = isFavorite(name) ? 'Remove from Favorites' : 'Add to Favorites';
    });

  } catch (err) {
    container.innerHTML = `<p>Error loading animal: ${err.message}</p>`;
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatKey(str) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

loadAnimalDetail();
