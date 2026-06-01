console.log('5tay 5afe app loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
});


function URLhistory(){
     window.location.href = "/api/history";
}

function URLinfo(){
    window.location.href = "/api/learnMore";
}

function URLcheck(){
    window.location.href = "/";
}

let header = document.getElementById("header");
header.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link alt="stylesheet" href="../static/StaySafe.css">
            <script src="../static/Header.js"></script>
        </head>
        <style>

            #header-container{
                display: flex;
                flex-direction: column;
                gap:40px;
                float: right;
                padding: 60px;
                position: fixed;
                top: 0;
                right: 0;
                z-index: 1000;
            }

            img{
                height:80px;
                width:90px;
            }

        </style>    
        <body>
            
            <div id="header-container">
                <div class="folders" id="URLchecker">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/078/371/825/small/open-yellow-file-folder-pixel-art-icon-for-data-storage-png.png" alt="URL Checker" onclick="URLcheck()">
                    <p>URL checker</p>
                </div>
                <div class="folders" id="URLinfo">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/078/371/825/small/open-yellow-file-folder-pixel-art-icon-for-data-storage-png.png" alt="URL Info" onclick="URLinfo()">
                    <p>Learn more</p>
                </div>
                <div class="folders" id="URLhistory">
                    <img src= "https://static.vecteezy.com/system/resources/thumbnails/078/371/825/small/open-yellow-file-folder-pixel-art-icon-for-data-storage-png.png" alt="URL History" onclick="URLhistory()">
                    <p>URL history</p>
                </div>
            </div>
        </body>
    </html>
`
