const urlParams = new URLSearchParams(window.location.search);
const pokemonIdentifier = urlParams.get('id') || '25'; // fallback to Pikachu

// Update the URL to use the parameter
let url = `https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}/`;

const getPokemonData = async () => {
  try {
      const response = await axios.get(url)
      return response.data;
  } catch (error) {
  if (error.response) {
      console.error(`Server error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('Network error: No response received');
    } else {
      console.error('Error:', error.message);
    }    
  }
  return null;
}

const displayPokemonName = (data) => {
  document.getElementById('pokemon-name').textContent = data.name;
}

const displayPokedexNumber = (data) => {
  document.getElementById('pokedex-number').textContent = `#${data.id}`;
}

const getSprites = (data) => {
  const sprite = data.sprites.other['official-artwork'].front_default;
  const shinysprite = data.sprites.other['official-artwork'].front_shiny;
  return {sprite, shinysprite};
}

const displaySprites = (data) => {
  const {sprite, shinysprite} = getSprites(data);
  const spriteElement = document.getElementById('pokemon-sprite');
  spriteElement.src = sprite;
  
  // Add shiny toggle functionality
  const shinyToggle = document.getElementById('shiny-toggle');
  let isShiny = false;
  
  shinyToggle.addEventListener('click', () => {
      isShiny = !isShiny;
      spriteElement.src = isShiny ? shinysprite : sprite;
  });
}

const displayAbilities = async (data) => {
  const abilitiesContainer = document.getElementById('abilities-list');
  abilitiesContainer.innerHTML = '';
  
  const abilityElements = data.abilities.map(ability => {
    const abilityElement = document.createElement('div');
    abilityElement.className = 'col-12';
    abilityElement.innerHTML = `
      <div class="card ability-card h-100">
        <div class="card-body">
          <h6 class="card-title text-capitalize">${ability.ability.name}</h6>
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    `;
    abilitiesContainer.appendChild(abilityElement);
    return { element: abilityElement, url: ability.ability.url, name: ability.ability.name, isHidden: ability.is_hidden };
  });
  
  const abilityPromises = abilityElements.map(async ({ element, url, name, isHidden }) => {
    try {
      const abilityData = await displayAbilityEffect(url);
      
      if (!abilityData) {
        throw new Error('No ability data received');
      }
      
      // Extract effect from effect_entries where language.name = 'en'
      let effect = 'No effect description available';
      
      if (abilityData.effect_entries && Array.isArray(abilityData.effect_entries)) {
        const englishEntry = abilityData.effect_entries.find(entry => 
          entry.language && entry.language.name === 'en'
        );
        
        if (englishEntry && englishEntry.effect) {
          effect = englishEntry.effect;
        } else {
          console.warn(`No English effect entry found for ${name}`);
        }
      } else {
        console.warn(`No effect_entries found for ${name}`);
      }
      
      const cleanEffect = effect.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      
      element.innerHTML = `
        <div class="card ability-card h-100">
          <div class="card-body">
            <h6 class="card-title text-capitalize d-flex align-items-center mb-2">
              ${name}
              ${isHidden ? '<span class="badge bg-warning ms-2">Hidden Ability</span>' : ''}
            </h6>
            <p class="card-text small mb-0" style="line-height: 1.4;">${cleanEffect}</p>
          </div>
        </div>
      `;
    } catch (error) {
      console.error(`Error loading ability ${name}:`, error);
      element.innerHTML = `
        <div class="card ability-card h-100">
          <div class="card-body">
            <h6 class="card-title text-capitalize d-flex align-items-center mb-2">
              ${name}
              ${isHidden ? '<span class="badge bg-warning ms-2">Hidden Ability</span>' : ''}
            </h6>
            <p class="card-text text-muted small mb-0">Failed to load ability effect</p>
          </div>
        </div>
      `;
    }
  });
  
  await Promise.all(abilityPromises);
}

const displayAbilityEffect = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching ability:', error);
    if (error.response) {
      console.error(`Server error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('Network error: No response received');
    } else {
      console.error('Error:', error.message);
    }    
  }
  return null; 
}

const displayStats = (data) => {
  let bst = 0;
  const stats = data.stats;

  // Get all stat-value elements by their order in the HTML
  const statValueElements = document.querySelectorAll('.stat-value');
  
  // PokémonDB-style color thresholds
  const getStatColor = (statValue) => {
    if (statValue < 30) return 'stat-very-low';     // Red
    if (statValue < 60) return 'stat-low';          // Orange  
    if (statValue < 90) return 'stat-medium';       // Yellow
    if (statValue < 120) return 'stat-high';        // Light Green
    if (statValue < 150) return 'stat-very-high';   // Green
    if (statValue < 180) return 'stat-excellent';   // Dark Green
    return 'stat-outstanding';                      // Blue for 180+
  };

  // Progress bar IDs in order
  const progressBarIds = ['#hp-bar', '#atk-bar', '#def-bar', '#sp-atk-bar', '#sp-def-bar', '#spd-bar'];

  // Update each stat
  stats.forEach((stat, index) => {
    const statValue = stat.base_stat;
    bst += statValue;

    // Update progress bar
    const progressBar = document.querySelector(progressBarIds[index]);
    if (progressBar) {
      const percentage = (statValue / 255) * 100;
      const colorClass = getStatColor(statValue);
      
      // Remove all color classes and add the appropriate one
      progressBar.className = 'progress-bar';
      progressBar.classList.add(colorClass);
      progressBar.style.width = `${percentage}%`;
    }

    // Update stat value text
    if (statValueElements[index]) {
      statValueElements[index].textContent = statValue;
    }
  });

  // Update BST total
  document.getElementById('bst-total').textContent = bst;
}

const displayMoves = (data) => {
  const movesContainer = document.getElementById('moves-container');
  movesContainer.innerHTML = '';
  
  data.moves.forEach(move => { // Show first 20 moves
    const moveElement = document.createElement('div');
    moveElement.className = 'col-6 col-md-4 col-lg-3'; // Responsive grid

    const moveId = move.move.url.split('/').filter(Boolean).pop();

    moveElement.innerHTML = `
      <div class="card move-card h-100">
        <div class="card-body text-center p-2">
          <a href="details-moves.html?id=${moveId}" class="text-decoration-none">
            <h6 class="card-title text-capitalize mb-0 small">${move.move.name}</h6>
          </a>
        </div>
      </div>
    `;
    movesContainer.appendChild(moveElement);
  });  
}

// Also update the displayTypes function to use Bootstrap badges
const displayTypes = (data) => {
  const typesContainer = document.getElementById('pokemon-types');
  typesContainer.innerHTML = '';
  
  data.types.forEach(type => {
    const typeElement = document.createElement('span');
    typeElement.className = `badge type-badge type-${type.type.name} me-2`;
    typeElement.textContent = type.type.name;
    typesContainer.appendChild(typeElement);
  });
}

// Helper function for type colors - returns the actual type name for CSS
const getTypeColor = (type) => {
  return type; // Just return the type name, we'll use CSS classes
}

const getPokemonSpeciesData = async (pokemonId) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon species data:', error);
    return null;
  }
}

const getPokemonDescription = async (pokemonId) => {
  try {
    const speciesData = await getPokemonSpeciesData(pokemonId);
    if (!speciesData) return { species: 'Unknown', description: 'No data available.' };

    // Get the English species classification (genus)
    const englishGenus = speciesData.genera.find(
      genus => genus.language.name === 'en'
    );
    const species = englishGenus ? englishGenus.genus : 'Unknown Species';

    // Get the latest English Pokédex entry
    const englishEntries = speciesData.flavor_text_entries.filter(
      entry => entry.language.name === 'en'
    );
    const latestEntry = englishEntries[0];
    
    const description = latestEntry ? 
      latestEntry.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ').replace(/\s+/g, ' ').trim()
      : 'No description available.';

    return { species, description };
  } catch (error) {
    return { species: 'Unknown', description: 'No data available.' };
  }
}

const displayPokemonSpecies = async (pokemonId) => {
  const speciesData = await getPokemonDescription(pokemonId);
  document.getElementById('pokemon-species').textContent = speciesData.species;
  document.getElementById('pokedex-description').textContent = speciesData.description;
}

const convertHeight = (heightInDecimetres) => {
  return (heightInDecimetres / 10).toFixed(1); // Returns in meters with 1 decimal
}

const convertWeight = (weightInHectograms) => {
  return (weightInHectograms / 10).toFixed(1); // Returns in kg with 1 decimal
}

// Usage in your display functions:
const displayPokemonMetrics = (data) => {
  const heightInMeters = convertHeight(data.height); // "0.7"
  const weightInKg = convertWeight(data.weight);     // "6.0"

  document.getElementById('pokemon-height').textContent = `${heightInMeters} m`
  document.getElementById('pokemon-weight').textContent = `${weightInKg} kg`

}

const init = async () => {
  const data = await getPokemonData();
  if (data) {
      displayPokemonName(data);
      displayPokedexNumber(data);
      displayTypes(data);
      displaySprites(data);
      await displayAbilities(data);
      displayStats(data);
      displayMoves(data);
      displayPokemonMetrics(data);
      await displayPokemonSpecies(data.id);
  } else {
      console.error('Failed to load Pokémon data');
  }
}

// Start the application
init();

