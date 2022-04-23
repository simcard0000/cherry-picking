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

//Initial section/text settings:
introSection.style.display = "inherit";
listenSection.style.display = "none";
creditsSection.style.display = "none";
resultsPart.style.display = "none";

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

const playlists = [
    {
        "name": "#001 - (sims) metamorphosis",
        "link": "https://open.spotify.com/embed/playlist/2tmLf958J0arf60RVi2HSl?utm_source=generator",
        "blurb": "there's some saying by ursula le guin; that what goes too long unchanged destroys itself. the forest is forever because it dies and dies and so lives. and so i change. people change. we all grow and burn.",
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
}

function showPlaylist(number) {
    const index = number - 1;
    if (index < 0) {
        console.error("Could not retrieve playlist.");
        resultsPart.style.display = "none";
        return
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
        let htmlPlaylistContent = [];
        let htmlTracklistContent = [];
        resultsPart.insertAdjacentHTML("afterbegin", "<div id=\"playlistBlurb\"><br><p><i>" + selection.blurb +"</i></p><br></div>")
        // the Spotify playlist embed
        htmlPlaylistContent.push("<iframe id=\"playlistIframe\" style=\"border-radius:12px\" src=\"" + selection.link + 
            "\" width=\"100%\" height=\"380\" frameBorder=\"0\" allowfullscreen=\"\"" + 
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
        )
    }
}