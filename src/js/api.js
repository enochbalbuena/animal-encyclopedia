const animalKey = import.meta.env.VITE_API_NINJAS_KEY;
const pexelsKey = import.meta.env.VITE_PEXELS_KEY;

export async function getAnimalByName(name) {
  const res = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
    headers: { 'X-Api-Key': animalKey }
  });
  return await res.json();
}

export async function getAnimalImage(name) {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${name}&per_page=1`, {
    headers: { Authorization: pexelsKey }
  });
  const data = await res.json();
  return data.photos?.[0]?.src?.medium || 'https://placekitten.com/400/300';
}
