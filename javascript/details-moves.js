// const { default: axios } = require("axios");

const urlParams = new URLSearchParams(window.location.search);
const moveIdentifier = urlParams.get('id') || '1';

let url = `https://pokeapi.co/api/v2/move/${moveIdentifier}`;

const getMoveData = async () => {
  try {
    const response = await axios.get(url);
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

const displayMoveDetails = (moveData) => {
    // Update header
    document.getElementById('move-name').textContent = moveData.name;

    // Update main stats
    document.getElementById('move-category').textContent = moveData.damage_class?.name || '-';
    document.getElementById('move-power').textContent = moveData.power || '-';
    document.getElementById('move-pp').textContent = moveData.pp || '-';
    document.getElementById('move-accuracy').textContent = moveData.accuracy ? `${moveData.accuracy}%` : '∞';
    document.getElementById('move-priority').textContent = moveData.priority || '-';
    
    // Update effect
    const effect = moveData.effect_entries?.find(e => e.language.name === 'en')?.effect || 'No effect description available.';
    document.getElementById('move-effect-text').textContent = effect.replace(/\n/g, ' ');
    
    // Update additional details (only the essential ones)
    document.getElementById('move-target').textContent = moveData.target?.name || '-';
    document.getElementById('move-effect-chance').textContent = moveData.effect_chance ? `${moveData.effect_chance}%` : '-';
    document.getElementById('move-generation').textContent = moveData.generation?.name || '-';
}

const displayMoveTypeBadge = (moveData) => {
    // Update move type with badge
    const moveTypeContainer = document.getElementById('move-type');
    moveTypeContainer.innerHTML = '';
    
    if (moveData.type?.name) {
        const typeBadge = document.createElement('span');
        typeBadge.className = `badge type-badge type-${moveData.type.name}`;
        typeBadge.textContent = moveData.type.name;
        moveTypeContainer.appendChild(typeBadge);
    } else {
        moveTypeContainer.textContent = '-';
    }
}

const displayMoveCategoryBadge = (moveData) => {
  // Update move category with badge
    const categoryContainer = document.getElementById('move-category');
    categoryContainer.innerHTML = '';
    
    if (moveData.type?.name) {
        const categoryBadge = document.createElement('span');
        categoryBadge.className = `badge category-badge type-${moveData.damage_class.name}`;
        categoryBadge.textContent = moveData.damage_class.name;
        categoryContainer.appendChild(categoryBadge);
    } else {
        categoryContainer.textContent = '-';
    }
}

const init = async () => {
  const moveData = await getMoveData();
  
  if(moveData){
    displayMoveDetails(moveData);
    displayMoveTypeBadge(moveData);
    displayMoveCategoryBadge(moveData);
  } else {
    console.log('Failed to load move data');
  }
}

//Start the application
init();