const POKEAPI_BASE = 'https://pokeapi.co/api/v2/pokemon';
// https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0

const pokemonContainer = document.getElementById('pokemon-container');
const pokemonListId = document.getElementById('pokemonListId');
const getGenParam = (pokemonListId) => {
  let limit, offset;

  const regionId = parseInt(pokemonListId.value);

  switch (regionId) {
    case 1: offset = 0;    limit = 151;   // Kanto (Gen 1)
            break;
    case 2: offset = 151;  limit = 100;   // Johto (Gen 2)
            break;
    case 3: offset = 251;  limit = 135;   // Hoenn (Gen 3)
            break;
    case 4: offset = 386;  limit = 107;   // Sinnoh (Gen 4)
            break;
    case 5: offset = 493;  limit = 156;   // Unova (Gen 5)
            break;
    case 6: offset = 649;  limit = 72;    // Kalos (Gen 6)
            break;
    case 7: offset = 721;  limit = 88;    // Alola (Gen 7)
            break;
    case 8: offset = 809;  limit = 96;    // Galar (Gen 8)
            break;
    case 9: offset = 905;  limit = 120;   // Paldea (Gen 9)
            break;  
}
  return {limit, offset};
}

const getPokemonList = async (pokemonListId) => {
  try {
    const {limit, offset} = getGenParam(pokemonListId);
    const url = `${POKEAPI_BASE}?limit=${limit}&offset=${offset}`
    const pokeData = await axios.get(url);
    return pokeData;
  } catch (error) {
    if (error.response) {
      console.error(`Server error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('Network error: No response received');
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
}

const displayPokemonList = async () => {
  try {
    // Show loading
    pokemonContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading Pokémon...</p>
      </div>
    `;

    const pokeData = await getPokemonList(pokemonListId);
    
    pokemonContainer.innerHTML = '';

    pokeData.data.results.forEach(pokemon => {
      const pokemonElement = document.createElement('div');
      pokemonElement.className = 'col-md-4 col-lg-3 col-sm-6 mb-4'; // Bootstrap grid
      
      const pokemonId = pokemon.url.split('/').filter(Boolean).pop();

      // Construct image URL from Pokémon ID
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

      pokemonElement.innerHTML = 
        `<div class="card pokemon-card h-100 shadow-sm">
          <div class="card-body text-center p-3">
            <img src="${imageUrl}" 
                 alt="${pokemon.name}" 
                 class="pokemon-img mb-2"
                 onload="this.classList.add('loaded')"
                 onerror="this.src='https://via.placeholder.com/96?text=?'">
            <h5 class="card-title text-capitalize">${pokemon.name}</h5>
            <p class="text-muted mb-2">#${pokemonId.padStart(3, '0')}</p>
          </div>
          <div class="card-footer bg-transparent border-top-0 pt-0">
            <a href="details-pokemon.html?id=${pokemonId}" class="btn btn-primary btn-sm w-100">
              View Details
            </a>
          </div>
        </div>`;
      
      pokemonContainer.appendChild(pokemonElement);
    });
  } catch (error) {
    pokemonContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-danger">
          Failed to load Pokémon. Please try again.
        </div>
      </div>
    `;
    console.error('Error displaying Pokémon:', error);
  }
}

const loadSelectedRegion = () => {
    const selectedId = document.getElementById('pokemonListId').value;
    displayPokemonList(selectedId);
}

document.addEventListener('DOMContentLoaded', () => {
    displayPokemonList(1);
    pokemonListId.addEventListener('change', loadSelectedRegion);
});