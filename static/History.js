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

  async function addURL(url, problems) {
    URLs = [{
        "url": url,
        "problems": problems
    }]
  }

  function loadURLs() {
    const storedURLs = localStorage.getItem(STORAGE_KEY);
    if (!storedURLs) return JSON.parse("");
    URLs = JSON.parse(storedURLs);
  }