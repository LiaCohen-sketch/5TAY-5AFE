

function URLhistory(){
     window.location.href = "/api/history";
}

function URLinfo(){
    window.location.href = "/api/learnMore";
}

function URLcheck(){
    window.location.href = "/api/CheckURL";
}

function URLhome(){
    window.location.href = "/";
}

const header = document.getElementById("header");
if (header) {
  header.innerHTML =
    "<style>" +
    "#header-container {" +
    "display: flex;" +
    "flex-direction: column;" +
    "gap: 10px;" +
    "float: right;" +
    "padding: 24px;" +
    "position: fixed;" +
    "top: 0;" +
    "right: 0;" +
    "max-height: 100vh;" +
    "overflow-y: auto;" +
    "box-sizing: border-box;" +
    "font-size:24px;" +
    "color:white;" +
    "text-shadow: 3px 3px 3px black;" +
    "font-family:'Pixelify Sans';" +
    "z-index: 1000;" +
    "}" +
    "#header-container img {" +
    "height: 64px;" +
    "width: 72px;" +
    "}" +
    "</style>" +
    '<div id="header-container">' +
    '<div class="folders" id="URLchecker">' +
    '<img src="https://static.vecteezy.com/system/resources/thumbnails/078/371/825/small/open-yellow-file-folder-pixel-art-icon-for-data-storage-png.png" alt="URL Checker" onclick="URLcheck()">' +
    "<p>URL checker</p>" +
    "</div>" +
    '<div class="folders" id="URLinfo">' +
    '<img src="https://static.vecteezy.com/system/resources/thumbnails/078/371/825/small/open-yellow-file-folder-pixel-art-icon-for-data-storage-png.png" alt="URL Info" onclick="URLinfo()">' +
    "<p>Learn more</p>" +
    "</div>" +
    '<div class="folders" id="URLhistory">' +
    '<img src="https://static.vecteezy.com/system/resources/thumbnails/078/371/825/small/open-yellow-file-folder-pixel-art-icon-for-data-storage-png.png" alt="URL History" onclick="URLhistory()">' +
    "<p>URL history</p>" +
    "</div>" +
    '<div class="folders"  id="Homepage">' +
    '<img style = "outline: none; background: none;" src="/static/images/Homepagelogo.png" alt="Homepage" onclick="URLhome()">' +
    "<p>Homepage</p>" +
    "</div>" +
    "</div>";
}