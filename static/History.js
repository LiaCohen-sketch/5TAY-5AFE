const STORAGE_KEY = "URLs";

const URL = document.getElementById("URLs");
const problems = document.getElementById("problems");

function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = String(text);
    return div.innerHTML;
  }