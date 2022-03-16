// Text sections:
var introSection = document.getElementById("introSection");
var listenSection = document.getElementById("listenSection");
var creditsSection = document.getElementById("creditsSection");
// Page buttons:
var listenButton = document.getElementById("listenButton");
var creditsButton = document.getElementById("creditsButton");
//Initial setting:
    introSection.style.display = "inherit";
    listenSection.style.display = "none";
    creditsSection.style.display = "none";
// Changing sections:
function flowChange(text){
    console.log(text);
    switch(text){
        case 'intro':
            introSection.style.display = "inherit";
            listenSection.style.display = "none";
            creditsSection.style.display = "none";
            break;
        case 'listen':
            introSection.style.display = "none";
            listenSection.style.display = "inherit";
            creditsSection.style.display = "none";
            break;
        case 'credits':
            introSection.style.display = "none";
            listenSection.style.display = "none";
            creditsSection.style.display = "inherit";
            break;
    }
    console.log(text);
}