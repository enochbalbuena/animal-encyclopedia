import { getAnimalByName, getAnimalImage } from './api.js';
import { createAnimalModal } from './modal.js';

let animalList = [];

async function loadAnimals() {
  const res = await fetch('./json/animals.json');
  animalList = await res.json();
  renderGallery(animalList);
}

async function renderGallery(list) {
  const container = document.getElementById('galleryContainer');
  container.innerHTML = '';

  for (const name of list) {
    try {
      const [animal] = await getAnimalByName(name);
      if (!animal) continue;
      const image = await getAnimalImage(name);

      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="card-image">
          <img src="${image}" alt="${name}" />
        </div>
        <h3>${name}</h3>
        <p>${animal.characteristics?.slogan || 'Amazing creature!'}</p>
      `;
      card.addEventListener('click', () => createAnimalModal(animal, image));
      container.appendChild(card);
    } catch (err) {
      console.error(`Failed to load ${name}`, err);
    }
  }
}

// Search filter
document.getElementById('filterInput').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = animalList.filter(name => name.toLowerCase().includes(term));
  renderGallery(filtered);
});

loadAnimals();
