import { getJSONData } from "./Toolkit.js";
import { cacheImages } from "./Toolkit.js";

let spinner = new Spinner({ color: "#FF0000", lines: 10 }).spin(document.querySelector(".g-loading-overlay"));
const ability1 = document.querySelector("#ability1");
const ability2 = document.querySelector("#ability2");

const stat1 = document.querySelector("#stat1");
const stat2 = document.querySelector("#stat2");
const stat3 = document.querySelector("#stat3");

const type1 = document.querySelector("#type1");

const move1 = document.querySelector("#move1");
const move2 = document.querySelector("#move2");
const move3 = document.querySelector("#move3");
const move4 = document.querySelector("#move4");
const move5 = document.querySelector("#move5");
const move6 = document.querySelector("#move6");
const move7 = document.querySelector("#move7");
const move8 = document.querySelector("#move8");
const move9 = document.querySelector("#move9");
const move10 = document.querySelector("#move10");

const weight1 = document.querySelector("#weight1");

const height1 = document.querySelector("#height1");

const img = document.querySelector("#img");

let pokemon = document.querySelector("#pokemon");

let overlay = document.querySelector(".g-loading-overlay");

pokemon.addEventListener("change", () => {
    let poke = pokemon.value
    main(poke);
});

function hideLoading() {
    spinner.stop();
    overlay.style.display = "none";
}

function Succsess(data) {
    img.src = data.sprites.other["official-artwork"].front_default;

    ability1.textContent = data.abilities[0].ability.name;
    ability2.textContent = data.abilities[1].ability.name;

    stat1.textContent = data.stats[0].base_stat;
    stat2.textContent = data.stats[1].base_stat;
    stat3.textContent = data.stats[2].base_stat;

    type1.textContent = data.types.map(t => t.type.name).join(", ");

    move1.textContent = data.moves[0].move.name;
    move2.textContent = data.moves[1].move.name;
    move3.textContent = data.moves[2].move.name;
    move4.textContent = data.moves[3].move.name;
    move5.textContent = data.moves[4].move.name;
    move6.textContent = data.moves[5].move.name;
    move7.textContent = data.moves[6].move.name;
    move8.textContent = data.moves[7].move.name;
    move9.textContent = data.moves[8].move.name;
    move10.textContent = data.moves[9].move.name;

    weight1.textContent = data.weight;

    height1.textContent = data.height;

    hideLoading()

// charmander
}

function Failure() {

}

function main(poke) {

    const URL = `https://pokeapi.co/api/v2/pokemon/${poke}`

    getJSONData(URL, Succsess, Failure, true);

}

main(pokemon.value);