document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
});


const STORAGE_KEY = "URLs";

const bodyEl = document.getElementById("history-body");
const URL = document.getElementById("URL");
const Problems = document.getElementById("Problems");

function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = String(text);
    return div.innerHTML;
  }

  console.log(URL);
  console.log(Problems);

function saveURLsToStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function loadURLsFromStorage() {
  urls = [{
    url: "https://www.google.com",
    problems: "No problems"
  }]
}

function addURL(url) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
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
    <td>${escapeHtml(s.url)}</td>
    <td>${escapeHtml(s.problems)}</td>
    </tr>`
  )
  .join("");

}

async function loadStoriesFromServer() {
  const res = await fetch("/api/urls");
  urlsFromServer = await res.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urlsFromServer));
  console.log(urlsFromServer);
  renderURLs();
}