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
function isVowel(char)
{   if (char.length == 1)
  { var vowels = new Array('a','e','i','o','u');
    var isVowel = false;
    for(e in vowels){
        if(vowels[e] == char){
            isVowel = true;
        }
    }

    return isVowel;
  }
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
    $("#pokename").append("<p>Pokedex #"+pokeCurrent.id+"</p>")
    responsiveVoice.speak(pokeCurrent.name.toString() + ", pokedex number" + pokeCurrent.id.toString())
})

$("#button-2").on("click", function(){
    $("#pokename").empty()
    for(var i = 0; i < pokeCurrent.types.length; i++){
        var typeSpan = $("<p>"+toUpper(pokeCurrent.types[i].type.name)+"</p>")
        $("#pokename").append(typeSpan)
        if(isVowel(pokeCurrent.types[i].type.name.toString().charAt(0))===true){
            responsiveVoice.speak("An " + pokeCurrent.types[i].type.name.toString() + " type")
        }else{
            responsiveVoice.speak("A " + pokeCurrent.types[i].type.name.toString() + " type")
        }
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
    responsiveVoice.speak(pokeCurrent.name.toString() +"'s appearance is the color " + speciesCurrent.color.name.toString() + ", and the shape " + speciesCurrent.shape.name.toString())
})
$("#button-5").on("click", function(){
    console.log(pokeCurrent.species.url);
    
    $.ajax({
        url: pokeCurrent.species.url,
        method: "GET"
    }).then(function(response){
        $.ajax({
            url: response.evolution_chain.url,
            method: "GET"
        }).then(function(response){
            console.log(response);
            
            console.log(response.chain.species.name);
            
        })
        
    })
})

$("#button-5").on("click", function(){
    var evolList = []
    $("#pokename").empty()
    $("#pokename").append("<h5>Evolution Tree</h5><br>")
    $.ajax({
        url: speciesCurrent.evolution_chain.url,
        method: "GET"
    }).then(function(response) {
        var chain = response.chain
        $("#pokename").append("<p>"+toUpper(chain.species.name)+"</p>")
        evolList.push(chain.species.name)
        while(typeof chain.evolves_to[0] != 'undefined'){
            $("#pokename").append("<p>"+toUpper(chain.evolves_to[0].species.name)+"</p>")
            evolList.push(chain.evolves_to[0].species.name)
            chain = chain.evolves_to[0]
            console.log(evolList)
            responsiveVoice.speak(chain.evolves_totoString())
        }
    })
    // responsiveVoice.speak(pokeCurrent.name.toString() +"'s evolutions are " + evolList.toString())
})

$("#button-15").on("click", function() {
    $("#pokeimage").empty();
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR&tag="+pokeCurrent.name;
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
    
    var imageUrl = response.data.image_original_url;

    var pokeGif = $("<img>");

    pokeGif.attr("src", imageUrl);
    pokeGif.attr("alt", "pokemon GIF image");
    pokeGif.attr('id','gifImage')

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
    }
}

function stop(){
    audio.pause();
    audio.currentTime = 0
}
