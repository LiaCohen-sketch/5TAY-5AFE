console.log('History page loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
});


const STORAGE_KEY = "URLs";

const URL = document.getElementById("URLs");
const problems = document.getElementById("problems");

function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = String(text);
    return div.innerHTML;
  }

  console.log(URL);
  console.log(problems);

function saveURLsToStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function addURL(url) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(url));
}