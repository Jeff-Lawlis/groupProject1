var voicelist = responsiveVoice.getVoices();
console.log(voicelist);

responsiveVoice.setDefaultVoice("Korean Male", {pitch: 1});

/* 
Source From: https://code.responsivevoice.org/develop/examples/example2.html
*/

$("#playbutton").onclick = function() {
    responsiveVoice.cancel();
    responsiveVoice.speak(document.getElementById('pokename').value)
  };
  $("#stopbutton").onclick = function() {
    responsiveVoice.cancel();
  };

