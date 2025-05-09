var audio = document.getElementById("steveAudio");
var div = document.getElementById("mainDiv");

div.addEventListener('mouseover', function() {
    audio.play();
})

div.addEventListener('focusin', function() {
    audio.play();
})

div.addEventListener('mouseleave', function() {
    audio.pause();
    audio.currentTime = 0;
})

div.addEventListener('focusout', function() {
    audio.pause();
    audio.currentTime = 0;
})

