// SITE COMPONENTS

// Text sections:
var introSection = document.getElementById("introSection");
var listenSection = document.getElementById("listenSection");
var creditsSection = document.getElementById("creditsSection");
var resultsPart = document.getElementById("resultsPart");

// Page buttons:
var listenButton = document.getElementById("listenButton");
var creditsButton = document.getElementById("creditsButton");
var playlistButton = document.getElementById("playlistDropdownButton");

// Dropdown component:
var dropdown = document.getElementById("dropdownBox");
var playlistComponent = document.getElementById("playlistComponent");
var tracklistComponent = document.getElementById("tracklistComponent");
var dropFlag = false;

// Media query for mobile/narrow screens:
var mediaQuery = window.matchMedia("only screen and (orientation: portrait), (max-aspect-ratio: 1.2)");
var imageIndex = 0;
var buffer = document.getElementById("buffer");

// Site image:
var siteImage = document.getElementById("cherriesBackground");

//Initial section/text settings:
introSection.style.display = "inherit";
listenSection.style.display = "none";
creditsSection.style.display = "none";
resultsPart.style.display = "none";

// Background audio:
var siteTheme = document.getElementById("backgroundAudio");

const images = [
    "./assets/cherries-2.png", // 0
    "./assets/cherry-dessert.gif", // 1
    "./assets/dither_it_cherry-pepsi.png", // 2 
    "./assets/cherry-sparkle.gif", // 3
    "./assets/cherry-cola-casettes.jpg" // 4
]

// Changing sections:
function flowChange(text){
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
    return;
}

const playlists = [
    {
        "name": "#001 - (sims) metamorphosis",
        "link": "https://open.spotify.com/embed/playlist/2tmLf958J0arf60RVi2HSl?utm_source=generator",
        "blurb": "there's some saying by ursula le guin; that what goes too long unchanged destroys itself. the forest is forever because it dies and dies and so lives. and so i change. people change. we all grow and burn.",
        "date": "March 14, 2022",
        "songs": [
            "Dawn FM - The Weeknd",
            "Face Your Fear - Curtis Harding",
            "Dawning of the Season - Magdalena Bay",
            "Existential Dread - Thundercat",
            "MERCEDES - Brent Faiyaz 🅴",
            "BUS RIDE - KAYTRANADA, Karriem Riggins, River Tiber",
            "Suck Teeth - L'Rain",
            "Overthinking  - offonoff",
            "Jinx - Crumb",
            "OPEN A WINDOW (feat. Tyler, The Creator) - Rex Orange County, Tyler, The Creator",
            "10-20-40 - Rina Sawayama",
            "Stranger - Skrillex Remix with Tennyson & White Sea - Skrillex, Tennyson, White Sea",
            "Obituaries - Free Nationals, Shafiq Husayn",
            "Little Dark Age - MGMT",
            "0.00 - Childish Gambino"
        ]
    },
    {
        "name": "#002 - (many people) a little song survey",
        "link": "https://open.spotify.com/playlist/1OvaO6H6lNR7iba73eXbxp?si=fb12faeb070649a4",
        "blurb": "at a party I asked people to give me three of their favourite songs - these are the results, a mix of new and old goodies",
        "date": "November 27, 2022",
        "songs": [
            "Fireflies - Owl City",
            "Rasputin - Boney M.",
            "Mr. Blue Sky - Electric Light Orchestra",
            "I Bet You Look Good On The Dancefloor - Arctic Monkeys",
            "Space Song - Beach House",
            "Interstate Love Song - Stone Temple Pilots",
            "I Don't Wanna Be Me - Type O Negative",
            "My Demons - STARSET",
            "Changes - David Bowie",
            "Don't Stop Believin' - Journey",
            "Fallen Fruit - Lorde",
            "I'm Still Standing - Elton John",
            "Out of Time - The Weeknd",
            "Oh No! - MARINA",
            "(Don't Fear) The Reaper - Blue Öyster Cult"
        ]
    }
]

function showDropdown() {
    if (dropFlag) {
        playlistButton.innerText = "↑ close list";
        dropdown.style.display = "inherit";
    } else {
        playlistButton.innerText = "↓ open list";
        dropdown.style.display = "none";
    }
    dropFlag = !dropFlag;
    return;
}

function showPlaylist(number) {
    playlistComponent.style.background = "url(./assets/cherry.gif) no-repeat";
    playlistComponent.style.backgroundSize = "10%";
    const index = number - 1;
    if (index < 0) {
        console.error("Could not retrieve playlist.");
        resultsPart.style.display = "none";
        return;
    } else {
        resultsPart.style.display = "inherit";
        const selection = playlists[index];
        if (document.getElementById("playlistBlurb")) {
            const oldBlurb = document.getElementById("playlistBlurb");
            oldBlurb.remove();
        }
        if (document.getElementById("playlistIframe")) {
            const oldPlaylist = document.getElementById("playlistIframe");
            oldPlaylist.remove();
        }
        if (document.getElementById("tracklistText")) {
            const oldTracklist = document.getElementById("tracklistText");
            oldTracklist.remove();
        }
        showDropdown();
        let htmlPlaylistContent = [];
        let htmlTracklistContent = [];
        resultsPart.insertAdjacentHTML("afterbegin", "<div id=\"playlistBlurb\"><br><p><i>" + selection.blurb + "</i> (" + selection.date + ")</p><br></div>")
        // the Spotify playlist embed
        htmlPlaylistContent.push("<iframe id=\"playlistIframe\" src=\"" + selection.link + 
            "\" frameBorder=\"0\" allowfullscreen=\"\" onload=\"removeBackgroundGif()\"" + 
            "allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"></iframe>");
        playlistComponent.insertAdjacentHTML(
             "afterbegin",
             htmlPlaylistContent.join('')
        );
        // the tracklist
        htmlTracklistContent.push("<div id=\"tracklistText\"><ul>");
        for (i = 0; i < selection.songs.length; i++) {
            htmlTracklistContent.push("<li>" + selection.songs[i] + "</li>")
        }
        htmlTracklistContent.push("</ul><br></div>");
        tracklistComponent.insertAdjacentHTML(
            "afterbegin",
            htmlTracklistContent.join('')
        );
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        return;
    }
}

function removeBackgroundGif() {
    playlistComponent.style.background = "none";
    return;
}

function changeImage() {
    let randomIndex = imageIndex;
    while (randomIndex == imageIndex) {
        randomIndex = Math.floor(Math.random() * 5);
    }
    var tempImg = new Image();
    tempImg.src = images[randomIndex];
    tempImg.onload = function() {
        siteImage.src = tempImg.src;
        if (randomIndex == 0) {
            // re-applying flip:
            siteImage.style.WebkitTransform = "scaleX(-1)";
            siteImage.style.transform = "scaleX(-1)";
            siteImage.style.OTransform = "scaleX(-1)";
            siteImage.style.msTransform = "scaleX(-1)";
            siteImage.style.MozTransform = "scaleX(-1)";
            // other styling:
            siteImage.style.width = "calc(min(76vh, 100vw))";
            siteImage.style.marginRight = "25px";
            siteImage.style.marginLeft = "0px";
        } else if (randomIndex == 1) {
            // removing flip:
            siteImage.style.WebkitTransform = "none";
            siteImage.style.transform = "none";
            siteImage.style.OTransform = "none";
            siteImage.style.msTransform = "none";
            siteImage.style.MozTransform = "none";
            // other styling:
            siteImage.style.width = "calc(min(76vh, 100vw) + 75px)";
            siteImage.style.marginRight = "25px";
            siteImage.style.marginLeft = "-75px";
        } else if (randomIndex == 2) {
            // removing flip:
            siteImage.style.WebkitTransform = "none";
            siteImage.style.transform = "none";
            siteImage.style.OTransform = "none";
            siteImage.style.msTransform = "none";
            siteImage.style.MozTransform = "none";
            // other styling:
            siteImage.style.width = "calc(min(76vh, 100vw) + 75px)";
            siteImage.style.marginRight = "25px";
            siteImage.style.marginLeft = "-75px";
            if (mediaQuery.matches) {
                siteImage.style.marginRight = "0px";
                siteImage.style.marginLeft = "0px";
                siteImage.style.width = "100vw";      
            }
        } else if (randomIndex == 3) {
            // re-applying flip:
            siteImage.style.WebkitTransform = "scaleX(-1)";
            siteImage.style.transform = "scaleX(-1)";
            siteImage.style.OTransform = "scaleX(-1)";
            siteImage.style.msTransform = "scaleX(-1)";
            siteImage.style.MozTransform = "scaleX(-1)";
            // other styling:
            siteImage.style.width = "calc(min(76vh, 100vw) + 50px)";
            siteImage.style.marginRight = "25px";
            siteImage.style.marginLeft = "-50px";
            if (mediaQuery.matches) {
                siteImage.style.marginRight = "0px";
                siteImage.style.marginLeft = "0px";
                siteImage.style.width = "100vw";     
            }
        } else if (randomIndex == 4) {
            // removing flip:
            siteImage.style.WebkitTransform = "none";
            siteImage.style.transform = "none";
            siteImage.style.OTransform = "none";
            siteImage.style.msTransform = "none";
            siteImage.style.MozTransform = "none";
            // other styling:
            siteImage.style.width = "calc(min(76vh, 100vw))";
            siteImage.style.marginRight = "25px";
            siteImage.style.marginLeft = "0px";
        }
    }
    imageIndex = randomIndex;
}

function mediaQueryChange(mq) {
    buffer.style.display = "inherit";
    buffer.style.height = "100px";
    if (mq.matches && (imageIndex == 1 || imageIndex == 2 || imageIndex == 3 || imageIndex == 4)) {
        siteImage.style.marginRight = "0px";
        siteImage.style.marginLeft = "0px";
        siteImage.style.width = "100vw";    
    } else {
        if (imageIndex == 1 || imageIndex == 2) {
            siteImage.style.width = "calc(min(76vh, 100vw) + 75px)";
            siteImage.style.marginRight = "25px";
            siteImage.style.marginLeft = "-75px";
        } else if (imageIndex == 3) {
            siteImage.style.width = "calc(min(76vh, 100vw) + 50px)";
            siteImage.style.marginRight = "25px";
            siteImage.style.marginLeft = "-50px";
        } else {
            siteImage.style.width = "calc(min(76vh, 100vw))";
            siteImage.style.marginRight = "25px";
            siteImage.style.marginLeft = "0px";
        }
    }
}

mediaQuery.addEventListener('change', mediaQueryChange);
window.addEventListener("scroll", (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
});
