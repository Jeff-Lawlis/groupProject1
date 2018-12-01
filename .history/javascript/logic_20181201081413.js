  var pokeToSearch
  var pokeCurrent
  var speciesCurrent

  
responsiveVoice.setDefaultVoice("UK English Male", {pitch: 1});

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
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+pokeDisplay+"/",
        method: "GET"
    }).then(function(response) {
        
        pokeCurrent = response
        $("#pokename").empty()
        $("#pokename").append("<h3>"+toUpper(pokeCurrent.name)+"</h3><br>")

        var sprite = document.createElement('img')
        sprite.src = response.sprites.front_default
        sprite.className = 'sprite'
        sprite.id = 'front_default'
        $('#pokeimage').empty()
        $('#pokeimage').append(sprite);

        var ch = $('.sprite').height();
        $('.sprite').css({'width':ch+'px'});

    })
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-species/"+pokeDisplay+'/',
        method: "GET"
    }).then(function(response) {
        speciesCurrent = response
    })
})

$("#button-1").on("click", function(){
    if(typeof speciesCurrent != "undefined"){
        $("#pokename").empty()
        $("#pokename").append("<h3>"+toUpper(pokeCurrent.name)+"</h3><br>")
        $("#pokename").append("<p>Pokedex #"+pokeCurrent.id+"</p>")
        responsiveVoice.speak(pokeCurrent.name.toString() + ", pokedex number" + pokeCurrent.id.toString())
    }else{
        $("#pokename").append("<h5>Select a Pokemon!</h5><br>")
    }
})

$("#button-2").on("click", function(){
    $("#pokename").empty()
    if(typeof speciesCurrent != "undefined"){
        for(var i = 0; i < pokeCurrent.types.length; i++){
            var typeSpan = $("<p>"+toUpper(pokeCurrent.types[i].type.name)+"</p>")
            $("#pokename").append(typeSpan)
            if(isVowel(pokeCurrent.types[i].type.name.toString().charAt(0))===true){
                responsiveVoice.speak("An " + pokeCurrent.types[i].type.name.toString() + " type")
            }else{
                responsiveVoice.speak("A " + pokeCurrent.types[i].type.name.toString() + " type")
            }
        }
    }else{
        $("#pokename").append("<h5>Select a Pokemon!</h5><br>")
    }
})

$("#button-3").on("click", function(){
    $("#pokename").empty()
    if(typeof speciesCurrent != "undefined"){
        $("#pokename").append('<p>'+speciesCurrent.flavor_text_entries.find(x => x.language.name === 'en').flavor_text)
        responsiveVoice.speak(speciesCurrent.flavor_text_entries.find(x => x.language.name === 'en').flavor_text.toString()+'</p>')
    }else{
        $("#pokename").append("<h5>Select a Pokemon!</h5><br>")
    }
})

$("#button-4").on("click", function(){
    $("#pokename").empty()
    if(typeof speciesCurrent != "undefined"){
        $("#pokename").append("<h5>Appearance</h5><br>")
        $("#pokename").append("<p>Color: "+toUpper(speciesCurrent.color.name)+"</p>")
        $("#pokename").append("<p>Shape: "+toUpper(speciesCurrent.shape.name)+"</p>")
        responsiveVoice.speak(pokeCurrent.name.toString() +"'s appearance is the color " + speciesCurrent.color.name.toString() + ", and the shape " + speciesCurrent.shape.name.toString())
    }else{
        $("#pokename").append("<h5>Select a Pokemon!</h5><br>")
    }
})

$("#button-5").on("click", function(){
    if(typeof speciesCurrent != "undefined"){
        var evolList = ''
        $("#pokename").empty()
        $("#pokename").append("<h5>Evolution Tree</h5><br>")
        $.ajax({
            url: speciesCurrent.evolution_chain.url,
            method: "GET"
        }).then(function(response) {
            var chain = response.chain
            $("#pokename").append("<p>"+toUpper(chain.species.name)+"</p>")
            evolList += chain.species.name+' '
            while(typeof chain.evolves_to[0] != 'undefined'){
                $("#pokename").append("<p>"+toUpper(chain.evolves_to[0].species.name)+"</p>")
                evolList += chain.evolves_to[0].species.name+' '
                chain = chain.evolves_to[0]
            }
            responsiveVoice.speak(pokeCurrent.name.toString() +"'s evolutions are " + evolList)
        })
    }else{
        $("#pokename").append("<h5>Select a Pokemon!</h5><br>")
    }
})

$("#button-15").on("click", function() {
    if($('.sprite').length){
        $("#pokeimage").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR&tag="+pokeCurrent.name;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        
            var imageUrl = response.data.image_original_url;
            var pokeGif = $("<img>");

            pokeGif.attr("src", imageUrl);
            pokeGif.attr("alt", "pokemon GIF image");
            pokeGif.attr('id','gifImage')

            $("#pokeimage").prepend(pokeGif);
        })
    }else{
        $("#pokeimage").empty();
        
        var sprite = document.createElement('img')
        sprite.src = poke.sprites.front_default
        sprite.className = 'sprite'
        sprite.id = 'front_default'
        $('#pokeimage').empty()
        $('#pokeimage').append(sprite);

        var ch = $('.sprite').height();
        $('.sprite').css({'width':ch+'px'});
    }
})

$("#d-pad-up").on("click", function() {
    if($('.sprite').length){
        var sprite = document.createElement('img')
        sprite.className = 'sprite'
        if($('.sprite').attr('id') =='front_default'){
            sprite.src = pokeCurrent.sprites.front_shiny
            sprite.id = 'front_shiny'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }else if($('.sprite').attr('id') =='front_shiny'){
            sprite.src = pokeCurrent.sprites.front_default
            sprite.id = 'front_default'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }else if($('.sprite').attr('id') =='front_female'){
            sprite.src = pokeCurrent.sprites.front_shiny_female
            sprite.id = 'front_shiny_female'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }else if($('.sprite').attr('id') =='front_shiny_female'){
            sprite.src = pokeCurrent.sprites.front_female
            sprite.id = 'front_female'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }if($('.sprite').attr('id') =='back_default'){
            sprite.src = pokeCurrent.sprites.back_shiny
            sprite.id = 'front_shiny'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }else if($('.sprite').attr('id') =='back_shiny'){
            sprite.src = pokeCurrent.sprites.back_default
            sprite.id = 'front_default'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }else if($('.sprite').attr('id') =='back_female'){
            sprite.src = pokeCurrent.sprites.back_shiny_female
            sprite.id = 'front_shiny_female'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }else if($('.sprite').attr('id') =='back_shiny_female'){
            sprite.src = pokeCurrent.sprites.back_female
            sprite.id = 'front_female'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }
        var ch = $('.sprite').height();
        $('.sprite').css({'width':ch+'px'});
    }
})

$("#d-pad-down").on("click", function() {
    if($('.sprite').length){
        var sprite = document.createElement('img')
        sprite.className = 'sprite'
        if($('.sprite').attr('id') =='front_default'){
            if(!!pokeCurrent.sprites.front_female){
                sprite.src = pokeCurrent.sprites.front_female
                sprite.id = 'front_female'
                $('#pokeimage').empty()
                $('#pokeimage').append(sprite);
            }
        }else if($('.sprite').attr('id') =='front_shiny'){
            if(!!pokeCurrent.sprites.front_female){
                sprite.src = pokeCurrent.sprites.front_shiny_female
                sprite.id = 'front_shiny_female'
                $('#pokeimage').empty()
                $('#pokeimage').append(sprite);
            }
        }else if($('.sprite').attr('id') =='front_female'){
            sprite.src = pokeCurrent.sprites.front_default
            sprite.id = 'front_default'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }else if($('.sprite').attr('id') =='front_shiny_female'){
            sprite.src = pokeCurrent.sprites.front_shiny
            sprite.id = 'front_shiny'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }if($('.sprite').attr('id') =='back_default'){
            if(pokeCurrent.sprites.front_female != 'null'){
                sprite.src = pokeCurrent.sprites.back_female
                sprite.id = 'back_female'
                $('#pokeimage').empty()
                $('#pokeimage').append(sprite);
            }
        }else if($('.sprite').attr('id') =='back_shiny'){
            if(!!pokeCurrent.sprites.front_female){
                sprite.src = pokeCurrent.sprites.back_shiny_female
                sprite.id = 'back_shiny_female'
                $('#pokeimage').empty()
                $('#pokeimage').append(sprite);
            }
        }else if($('.sprite').attr('id') =='back_female'){
            if(pokeCurrent.sprites.front_female != 'null'){
                sprite.src = pokeCurrent.sprites.back_default
                sprite.id = 'back_default'
                $('#pokeimage').empty()
                $('#pokeimage').append(sprite);
            }
        }else if($('.sprite').attr('id') =='back_shiny_female'){
            sprite.src = pokeCurrent.sprites.back_shiny
            sprite.id = 'back_shiny'
            $('#pokeimage').empty()
            $('#pokeimage').append(sprite);
        }
        var ch = $('.sprite').height();
        $('.sprite').css({'width':ch+'px'});
    }
})

// A more efficient method would be to scan for front_ and back_ and switch them
$("#d-pad-left").on("click", function() {
    if($('.sprite').length){
        var l = document.createElement('img')
        l.className = 'sprite'
        if($('.sprite').attr('id') =='front_default'){
            $(".sprite").attr("src", pokeCurrent.sprites.back_default)
            $(".sprite").attr("id", 'back_default')
        }else if($('.sprite').attr('id') =='front_shiny'){
            l.src = pokeCurrent.sprites.back_shiny
            l.id = 'back_shiny'
            $('#pokeimage').empty()
            $('#pokeimage').append(l);
        }else if($('.sprite').attr('id') =='front_female'){
            l.src = pokeCurrent.sprites.back_female
            l.id = 'back_female'
            $('#pokeimage').empty()
            $('#pokeimage').append(l);
        }else if($('.sprite').attr('id') =='front_shiny_female'){
            l.src = pokeCurrent.sprites.back_shiny_female
            l.id = 'back_shiny_female'
            $('#pokeimage').empty()
            $('#pokeimage').append(l);
        }if($('.sprite').attr('id') =='back_default'){
            $(".sprite").attr("src", pokeCurrent.sprites.front_default)
            $(".sprite").attr("id", 'front_default')
        }else if($('.sprite').attr('id') =='back_shiny'){
            l.src = pokeCurrent.sprites.front_shiny
            l.id = 'front_shiny'
            $('#pokeimage').empty()
            $('#pokeimage').append(l);
        }else if($('.sprite').attr('id') =='back_female'){
            l.src = pokeCurrent.sprites.front_female
            l.id = 'front_female'
            $('#pokeimage').empty()
            $('#pokeimage').append(l);
        }else if($('.sprite').attr('id') =='back_shiny_female'){
            l.src = pokeCurrent.sprites.front_shiny_female
            l.id = 'front_shiny_female'
            $('#pokeimage').empty()
            $('#pokeimage').append(l);
        }
        var ch = $('.sprite').height();
        $('.sprite').css({'width':ch+'px'});
    }
})

function play() {
    var audio = document.getElementById('audio');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function stop(){
    var audio2 = document.getElementById('audio2');
    audio.pause();
    audio.currentTime = 0
}
