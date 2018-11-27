var voicelist = responsiveVoice.getVoices();
console.log(voicelist);

responsiveVoice.setDefaultVoice("UK English Male", {pitch: 1});

// var msg = document.getElementById('pokename').value.toString();

/* 
Source From: https://code.responsivevoice.org/develop/examples/example2.html
*/

$("#playbutton").onclick = function() {
    responsiveVoice.cancel();
    responsiveVoice.speak(msg)
  };
  $("#stopbutton").onclick = function() {
    responsiveVoice.cancel();
  };

