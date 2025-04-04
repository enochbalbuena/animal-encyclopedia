import { getAnimalByName, getAnimalImage } from './api.js';

let animalList = [];

// Load animal names from JSON file
async function loadAnimalList() {
  try {
    const response = await fetch('./json/animals.json');
    if (!response.ok) throw new Error('Failed to fetch animals.json');
    animalList = await response.json();
    console.log('Animal list loaded:', animalList.length, 'names');
  } catch (error) {
    console.error('Error loading animal list:', error);
  }
}

// Pick N random unique animal names
function getRandomNames(count = 3) {
  const shuffled = [...animalList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Fetch animals and return only valid ones
async function getRandomFeaturedAnimals(count = 3) {
  const animals = [];
  const tried = new Set();

  while (animals.length < count && tried.size < animalList.length) {
    const [name] = getRandomNames(1);
    if (tried.has(name)) continue;
    tried.add(name);

    try {
      const results = await getAnimalByName(name);
      console.log(`🔍 ${name} →`, results);

      if (Array.isArray(results) && results.length > 0) {
        animals.push(results[0]);
      }
    } catch (err) {
      console.error(`Failed to fetch animal data for "${name}":`, err);
    }
  }

  return animals;
}

// Create an animal card element
function createAnimalCard(name, desc, imgUrl) {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <div class="card-image">
        <img src="${imgUrl}" alt="${name}" />
      </div>
      <h3>${name}</h3>
      <p>${desc}</p>
    `;
    return div;
  }  

// Load and display featured animals
async function loadFeaturedAnimals() {
  const container = document.getElementById('featuredContainer');
  container.innerHTML = '';

  const animals = await getRandomFeaturedAnimals(5);
  console.log('Valid featured animals:', animals.map(a => a.name));

  if (animals.length === 0) {
    container.innerHTML = '<p>Sorry, no animals could be loaded right now.</p>';
    return;
  }

  for (const animal of animals) {
    try {
      const image = await getAnimalImage(animal.name);
      const slogan = animal.characteristics?.slogan || 'Amazing creature!';
      const card = createAnimalCard(animal.name, slogan, image);
      container.appendChild(card);
    } catch (error) {
      console.error(`Failed to load image for ${animal.name}:`, error);
    }
  }
}

// Random Animal button
document.getElementById('randomBtn').addEventListener('click', async () => {
  const name = getRandomNames(1)[0];
  const [animal] = await getAnimalByName(name);
  if (animal) {
    alert(`🎲 Random Animal: ${animal.name}\n\n${animal.characteristics?.slogan || 'Interesting animal!'}`);
  } else {
    alert('Could not fetch animal info. Try again!');
  }
});

// Initial load
(async function () {
  await loadAnimalList();
  await loadFeaturedAnimals();
})();
