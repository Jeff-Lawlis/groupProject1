const search = (event) => {
    event.preventDefault();
    const pokenumber = document.getElementById("pokeInput").value;
    const baseURL = "https://pokeapi.co/api/v2/pokemon/";
    $.get(baseURL + pokenumber, (pokemon) => {
      document.getElementById("textName").innerHTML = pokemon.name;
      document.getElementById("sprite").src = pokemon.sprites.front_default;
    });
    console.log(pokenumber);
  }
  document.getElementById("pokeform").addEventListener('submit', search);
