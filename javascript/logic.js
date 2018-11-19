  var pokeToSearch
  var pokeCurrent

// Displays search results
$("#goButton").on("click", function(e){
      e.preventDefault()
      pokeToSearch = $("#pokeInput").val().trim()
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


// Displays sprite, deletes search results
$("#pokeimage").on('click', '.listItem', function(){
    var pokeDisplay = this.innerHTML
    console.log(pokeDisplay)
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+pokeDisplay+"/",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        pokeCurrent = response
        $("#textName").text(response.name)

        var sprite = document.createElement('img')
        sprite.src = response.sprites.front_default
        sprite.id = 'sprite-'+pokeDisplay
        $('#pokeimage').empty()
        $('#pokeimage').append(sprite);

    })   
})

// Displays name/type for current pokemon
$("#button-2").on("click", function(){
    if(pokeCurrent !== ''){
        $("#textName").empty()
        $("#textName").append("<h3>"+pokeCurrent.name+"</h3>")
        for(var i = 0; i < pokeCurrent.types.length; i++){
            var typeSpan = $("<p>"+pokeCurrent.types[i].type.name+"</p>")
            $("#textName").append(typeSpan)
        }
    }
})

// Displays moves for current pokemon
$("#button-4").on("click", function(){
    if(pokeCurrent !== ''){
        $("#textName").empty()
        $("#textName").append("<h3>"+pokeCurrent.name+"</h3>")
        for(var i = 0; i < 5; i++){
            var moveSpan = $("<p>"+pokeCurrent.moves[i].move.name+"</p>")
            $("#textName").append(moveSpan)
        }
    }
})
