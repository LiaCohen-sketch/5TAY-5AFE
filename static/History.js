console.log('History page loaded successfully!');


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  renderURLs();
});


const STORAGE_KEY = "urls";

const bodyEl = document.getElementById("historyBody");
/*
const URL = document.getElementById("url");
const Problems = document.getElementById("Problems");
*/

function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = String(text);
    return div.innerHTML;
  }

function saveURLsToStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function URLtoList(urlFromLS){
  const getInfo = JSON.parse(localStorage.getItem(urlFromLS));

  let URLsaver = "";
  for (let i = 0; i < getInfo.length; i++){
    URLsaver += "<p>URL : " + getInfo[i].URL + "</p>";
    URLsaver += "<p>Problems : " + getInfo[i].Problems + "</p>";

    URLsaver += "<hr>";
  }

  document.getElementById("URLlist").innerHTML = URLsaver;
}

/*function addURLsToStorage() {
  localStorage.setItem("urls" , JSON.stringify([
    {
      "URL":"https:/www.google.com",
      "Problems":"No problems"
    },
    {
      "URL":"https:/www.paypa1.com",
      "Problems":"1 instead of l"
    }

  ]))
  URLtoList("urls");
}
 /* לקיחת URL מהמודל ולשים בלוקלסטורג'*/
function addURL(url) {
  const urls = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  urls.push(url);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  renderURLs();
}

function probFound() {
  const pblm = await fetch ("/")
}

function renderURLs() {
  if (!bodyEl) return;

  const urls = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  if (urls.length === 0) {
    bodyEl.innerHTML = `<tr><td colspan="2">אין קישורים עדיין</td></tr>`;
    return;
  }
  bodyEl.innerHTML = urls
  .slice()
  .reverse()
  .map(
    (s)=> `<tr>
    <td>${escapeHtml(s.URL)}</td>
    <td>${escapeHtml(s.Problems)}</td>
    </tr>`
  )
  .join("");

}

async function loadURLsFromServer() {
  const res = await fetch("/api/urls");
  URLFromServer = await res.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify( URLFromServer));
  console.log( URLFromServer);
  renderURLs();
}
 
/*
addURLsToStorage()