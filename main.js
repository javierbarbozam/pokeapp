const pokemonSelect = document.getElementById('pokemonSelect');
const pokemonDetail = document.getElementById('pokemon-detail');

// Just to add some style to DOM first view
pokemonDetail.innerHTML = `<p class="pokemon-slogan">Gotta catch'em all</p>`

// fetching all Pokemon from API
const pokemonApiData = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=110&limit=100');
  const data = await response.json()
  pokemonList(data.results)
}
pokemonApiData()

// Creates all the <option> HTML tags
const pokemonList = (data) => {
  let list = '<option>Choose a Pokémon</option>';
  data.forEach(element => {
    list += `<option value="${element.url.slice(34,37)}">${dataGrammar(element.name)}</option>` //slice in order to have specific id from url
  });
  pokemonSelect.innerHTML = list
}

// Select HTML Tag Event listener
function pokemonSelectListener () {
  pokemonSelect.addEventListener ('change', () => {
    let pokemonId = pokemonSelect.value
    loadPokemon(pokemonId)
  })
}
pokemonSelectListener()

// Specific Pokemon API function
const loadPokemon = async (pokemonId) => {
  if (pokemonId != 'Choose a Pokémon') {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json()
    pokemonInformation(data)
  } else {pokemonDetail.innerHTML = `<p class="pokemon-slogan">Gotta catch'em all</p>`} // Restart DOM first view in case any Pokemon was chosen
}

// Creates specific Pokemon information at DOM
const pokemonInformation = (data) => {
  pokemonDetail.innerHTML = `
  <div class="pokemon-info">
    <h2 class="pokemon-name">${dataGrammar(data.name)}</h2>
    <div class="info-grid">
      <div>
        <h3 class="subtitle">Height</h3>
        <p>${data.height}</p>
      </div>
      <div>
        <h3 class="subtitle">Weight</h3>
        <p>${data.weight}</p>
      </div>
      <div>
        <h3 class="subtitle">Abilities</h3>
        <ul class="pokemon-abilities">
          ${data.abilities.map((item) => {return `<li>${dataGrammar(item.ability.name)}</li>`}).join('')}
        </ul>
      </div>
      <div>
        <h3 class="subtitle">Stats</h3>
        <ul class="pokemon-stats">
          ${data.stats.map((item) => {
            return `
            <li>
              <div class="stats-container">
                <p class="stat-name">${dataGrammar(item.stat.name)}</p>
                <p class="stat-rating">${item.base_stat}</p>
              </div>
            </li>`
          }).join('')}
        </ul>
      </div>
    </div>
  </div>
  <img class="pokemon-img" src="${data.sprites.other.dream_world.front_default}" alt="">
  `
}

const dataGrammar = (data) => {
  // Json data uses '-' for word spacing

  // Uppercase to single word
  if (data.indexOf('-') === -1) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  } else { 
    //Uppercase to value with more than one word
    const phrase = data.split('-');
    for (let i = 0; i < phrase.length; i++) {
      phrase[i] = phrase[i].charAt(0).toUpperCase() + phrase[i].slice(1);
    }
    return phrase.join(' ')
  }
}