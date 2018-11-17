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

//   $("#goButton").on("click", function(e){
//       e.preventDefault()
//       pokeToSearch = $("#pokeInput").val()
//     $.ajax({
//         url: "https://pokeapi.co/api/v2/pokemon/"+pokeToSearch+"/",
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);
        
//         $("#textName").text(response.name)
//         $("#sprite").attr("src", response.sprites.front_default)
//     });
//   })


$("#goButton").on("click", function(e){
      e.preventDefault()
      pokeToSearch = $("#pokeInput").val()
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-species/",
        method: "GET"
    }).then(function(response) {

        var searchList = document.createElement('div');
            searchList.id = 'searchList';
            searchList.className = 'info-scroll';

        $('#pokeimage').empty()

        for(i=0;i<response.count;i++){
            if(response.results[i].name.toLowerCase().indexOf(pokeToSearch.toLowerCase()) !== -1){

                console.log(response.results[i])

                var listItem = document.createElement('p');
                listItem.className = 'listItem';
                listItem.id = 'listItem-'+i;
                listItem.innerHTML = response.results[i].name
                searchList.appendChild(listItem);
                
            }
        }

        $('#pokeimage').append(searchList);
    });
  })


//This isn't firing for some reason
$("#pokeimage").on('click', '.listItem', function(){
    var pokeDisplay = this.innerHTML
    console.log(pokeDisplay)
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+pokeDisplay+"/",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        $("#textName").text(response.name)

        var sprite = document.createElement('img')
        sprite.src = response.sprites.front_default
        sprite.id = 'sprite-'+pokeDisplay
        $('#pokeimage').empty()
        $('#pokeimage').append(sprite);

    })   
})