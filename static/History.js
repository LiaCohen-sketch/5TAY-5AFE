console.log('History page loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
});


const STORAGE_KEY = "urls";

const bodyEl = document.getElementById("history-body");
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

function loadURLsFromStorage() {
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
  JSON.parse(localStorage.getItem("urls"));
}

function addURL(url) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(url));
}

function renderURLs() {
    if (!URL || !Problems) return;

  msgEl.textContent = "";
  detailsCard.style.display = "none";

  if (!URLs.length) {
    URL.innerHTML = `<tr><td colspan="6">אין קישורים עדיין</td></tr>`;
    return;
  }

  bodyEl.innerHTML = URLs
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

async function loadStoriesFromServer() {
  const res = await fetch("/api/urls");
  URLFromServer = await res.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify( URLFromServer));
  console.log( URLFromServer);
  renderURLs();
}

loadURLsFromStorage()