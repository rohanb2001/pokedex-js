const cardContainer = document.querySelector(".container");
const pokemon_count = 50;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "F5F5F5",
};

const main_types = Object.keys(colors);

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("card-container");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  let str = `
        <div class="pokemon-id">
          <small>#${id}</small>
        </div>
        <img src=${pokemon.sprites.other.dream_world.front_default} />
        <div class="detail-wrapper">
          <h3>${name}</h3>
          <small>Type: ${type}</small>
        </div>
    `;

  pokemonEl.innerHTML = str;
  cardContainer.appendChild(pokemonEl);
}

async function fetchPokemons() {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
}

async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
}

// Add Eventlistenerss
window.addEventListener("load", fetchPokemons);
