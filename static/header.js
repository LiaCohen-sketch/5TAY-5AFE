console.log('5tay 5afe app loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
});


function URLhistory(){
     fetch ("/api/history");
}

function URLinfo(){
    fetch ("/api/learnMore");
}

function URLcheck(){
    fetch ("/");
}

let header = document.getElementById("header");
header.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link alt="stylesheet" href="/staysafe.css">
            <script src="/header.js"></script>
        </head>
        <style>

            #header-container{
                display: flex;
                flex-direction: column;
                gap:40px;
                float: right;
                padding: 60px;
            }

            img{
                height:80px;
                width:90px;
            }

        </style>    
        <body>
            
            <div id="header-container">
                <div class="folders" id="urlChecker">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/078/371/825/small/open-yellow-file-folder-pixel-art-icon-for-data-storage-png.png" alt="URL Checker" onclick="URLcheck()">
                    <p>URL checker</p>
                </div>
                <div class="folders" id="URLinfo">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/078/371/825/small/open-yellow-file-folder-pixel-art-icon-for-data-storage-png.png" alt="URL Info" onclick="URLinfo()">
                    <p>Learn more</p>
                </div>
                <div class="folders" id="URLhistory">
                    <img src= "{{ url_for('static', filename=''}}" alt="URL History" onclick="URLhistory()">
                    <p>URL history</p>
                </div>
            </div>
        </body>

    </html>
`