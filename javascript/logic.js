// const search = (event) => {
//     event.preventDefault();
//     const pokenumber = document.getElementById("pokeInput").value;
//     const baseURL = "https://pokeapi.co/api/v2/pokemon/";
//     $.get(baseURL + pokenumber, (pokemon) => {
//       document.getElementById("textName").innerHTML = pokemon.name;
//       document.getElementById("sprite").src = pokemon.sprites.front_default;
//     });
//     console.log(pokenumber);
//   }
//   document.getElementById("pokeform").addEventListener('submit', search);

  var pokeToSearch

  $("#goButton").on("click", function(e){
      e.preventDefault()
      pokeToSearch = $("#pokeInput").val()
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+pokeToSearch+"/",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        $("#textName").text(response.name)
        $("#sprite").attr("src", response.sprites.front_default)
    });
  })
