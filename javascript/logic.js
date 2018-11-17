  var pokeToSearch

  $("#goButton").on("click", function(e){
      e.preventDefault()
      pokeToSearch = $("#pokeInput").val()
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+pokeToSearch+"/",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        $("#textName").html(
            "<h3>"+response.name+"</h3>"+
            "<p>#"+response.id+"</p>"
            )
        $("#sprite").attr("src", response.sprites.front_default)

        $("#button-2").on("click", function(){
            $("#textName").empty()
            $("#textName").append("<h3>"+response.name+"</h3>")
            for(var i = 0; i < response.types.length; i++){
                var typeSpan = $("<p>"+response.types[i].type.name+"</p>")
                $("#textName").append(typeSpan)
            }
        })
        $("#button-4").on("click", function(){
            $("#textName").empty()
            $("#textName").append("<h3>"+response.name+"</h3>")
            for(var i = 0; i < 5; i++){
                var moveSpan = $("<p>"+response.moves[i].move.name+"</p>")
                $("#textName").append(moveSpan)
            }
        })
    });
  })
