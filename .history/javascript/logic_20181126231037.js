  var pokeToSearch
  var pokeCurrent
  var speciesCurrent

// Use this to capitalize strings
function toUpper(str) {
return str.toLowerCase().split(' ').map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    }).join(' ').split('-').map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    }).join('-');
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function languageFilter(array){

}
// Displays search results
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
        var searchtitle = document.createElement('h5')
        searchtitle.innerHTML = 'Search Results:'
        searchtitle.id = 'title'
        $('#pokeimage').append(searchtitle)

        for(i=0;i<response.count;i++){
            if(response.results[i].name.toLowerCase().indexOf(pokeToSearch.toLowerCase()) !== -1){

                console.log(response.results[i])

                var listItem = document.createElement('p');
                listItem.className = 'listItem';
                listItem.id = response.results[i].name;
                listItem.innerHTML = toUpper(response.results[i].name)
                searchList.appendChild(listItem);
                
            }
        }

        $('#pokeimage').append(searchList);
    })
  })


// Displays sprite, deletes search results
$("#pokeimage").on('click', '.listItem', function(){
    var pokeDisplay = this.id
    console.log(pokeDisplay)
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+pokeDisplay+"/",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        pokeCurrent = response
        $("#pokename").empty()
        $("#pokename").append("<h3>"+toUpper(pokeCurrent.name)+"</h3><br>")

        var sprite = document.createElement('img')
        sprite.src = response.sprites.front_default
        sprite.id = 'sprite'
        $('#pokeimage').empty()
        $('#pokeimage').append(sprite);

    })
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-species/"+pokeDisplay+'/',
        method: "GET"
    }).then(function(response) {
        speciesCurrent = response
    }) 
})

$("#button-1").on("click", function(){
    $("#pokename").empty()
    $("#pokename").append("<h3>"+toUpper(pokeCurrent.name)+"</h3><br>")
    $("#pokename").append("<p>"+pokeCurrent.id+"</p>")
    responsiveVoice.speak("Name." + pokeCurrent.name.toString() + "Number." + pokeCurrent.id.toString())
})

$("#button-2").on("click", function(){
    $("#pokename").empty()
    for(var i = 0; i < pokeCurrent.types.length; i++){
        var typeSpan = $("<p>"+toUpper(pokeCurrent.types[i].type.name)+"</p>")
        $("#pokename").append(typeSpan)
        responsiveVoice.speak(pokeCurrent.types[i].type.name.toString())
    }
})

$("#button-3").on("click", function(){
    $("#pokename").empty()
    $("#pokename").append(speciesCurrent.flavor_text_entries.find(x => x.language.name === 'en').flavor_text)
    responsiveVoice.speak(speciesCurrent.flavor_text_entries.find(x => x.language.name === 'en').flavor_text.toString())
})

$("#button-4").on("click", function(){
    $("#pokename").empty()
    $("#pokename").append("<h5>Appearance</h5><br>")
    $("#pokename").append("<p>Color: "+toUpper(speciesCurrent.color.name)+"</p>")
    $("#pokename").append("<p>Shape: "+toUpper(speciesCurrent.shape.name)+"</p>")
    responsiveVoice.speak(speciesCurrent.color.toString() + speciesCurrent.shape.name.toString())
})

$("#button-15").on("click", function() {
    $("#pokeimage").empty();
       //var pokeGif = $("#pokeInput").val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR&tag=pokemon";
    
        //
        $.ajax({
          url: queryURL,
          method: "GET"
        })
    
        //
          .then(function(response) {
           
            var imageUrl = response.data.image_original_url;
    
            //
            
        
            var pokeGif = $("<img>");
    
            //
            pokeGif.attr("src", imageUrl);
            pokeGif.attr("alt", "pokemon GIF image");
    
            //
            $("#pokeimage").prepend(pokeGif);
            console.log(pokeGif);
          });
      });

      function play() {
        var audio = document.getElementById('audio');
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0
        }
    }
