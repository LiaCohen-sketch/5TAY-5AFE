console.log('5tay 5afe app loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
});


function URLhistory(){
    fetch ("/api/history");
}

function URLlearnMore(){
    fetch ("/api/learnMore.html");
}

function URLcheck(){
    window.location.href = "/";
}