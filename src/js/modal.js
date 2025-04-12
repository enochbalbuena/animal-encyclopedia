import {
    addToRecentlyViewed,
    isFavorite,
    toggleFavorite,
    renderFavorites,
    renderRecentlyViewed
  } from './storage.js';
  
  export function createAnimalModal(animal, imageUrl) {
    addToRecentlyViewed(animal.name, animal);
    renderRecentlyViewed(document.getElementById('recentContainer'));
  
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.innerHTML = `
      <div class="modal-flip-card">
        <div class="flip-inner">
          <div class="flip-front">
            <button class="close-btn">×</button>
            <img src="${imageUrl}" alt="${animal.name}" />
            <h2>${animal.name}</h2>
            <p><strong>Slogan:</strong> ${animal.characteristics?.slogan || 'Amazing creature!'}</p>
            <p><strong>Habitat:</strong> ${animal.characteristics?.habitat || 'Unknown'}</p>
            <p><strong>Diet:</strong> ${animal.characteristics?.diet || 'Unknown'}</p>
            <button class="fav-btn">${isFavorite(animal.name) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
            <button class="flip-btn">View More</button>
          </div>
          <div class="flip-back">
            <button class="close-btn">×</button>
            <h2>${animal.name}</h2>
            <h4><em>${animal.characteristics?.slogan || 'An incredible creature!'}</em></h4>
  
            <section>
              <h3>Taxonomy</h3>
              <ul>
                ${Object.entries(animal.taxonomy).map(([k, v]) => `<li><strong>${capitalize(k)}:</strong> ${v}</li>`).join('')}
              </ul>
            </section>
  
            <section>
              <h3>Key Characteristics</h3>
              <ul>
                ${Object.entries(animal.characteristics).map(([k, v]) => `<li><strong>${formatKey(k)}:</strong> ${v}</li>`).join('')}
              </ul>
            </section>
  
            <section>
              <h3>Locations</h3>
              <p>${animal.locations.join(', ')}</p>
            </section>
            <button class="flip-btn">Back</button>
          </div>
        </div>
      </div>
    `;
  
    const inner = modal.querySelector('.flip-inner');
  
    modal.querySelectorAll('.close-btn').forEach(btn =>
      btn.addEventListener('click', () => modal.remove())
    );
  
    modal.querySelectorAll('.flip-btn').forEach(btn =>
      btn.addEventListener('click', () => inner.classList.toggle('flipped'))
    );
  
    modal.querySelector('.fav-btn').addEventListener('click', (e) => {
      toggleFavorite(animal.name, animal);
      e.target.textContent = isFavorite(animal.name)
        ? 'Remove from Favorites'
        : 'Add to Favorites';
  
      renderFavorites(document.getElementById('favoritesContainer'));
    });
  
    document.body.appendChild(modal);
  }
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  function formatKey(str) {
    return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  