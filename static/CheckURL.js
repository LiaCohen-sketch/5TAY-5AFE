// This file is only loaded from CheckURL.html — it does not run on Home, History, etc.

function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = String(text);
  return div.innerHTML;
}

function renderResult(result) {
  const risk =
    result.phishing_probability >= 0.5 ? "Likely phishing" : "Likely safe";
  return `
    <p><strong>URL:</strong> ${escapeHtml(result.url)}</p>
    <p><strong>Result:</strong> ${escapeHtml(risk)}</p>
    <p><strong>Phishing likelihood:</strong> ${result.phishing_percent}%</p>
    <hr>
  `;
}

async function runCheck(url) {
  const resultsEl = document.getElementById("results");
  resultsEl.innerHTML = "<p>Checking URL...</p>";

  const response = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Could not analyze this URL.");
  }

  resultsEl.innerHTML = data.results.map(renderResult).join("");
}

// Runs only on the Check URL page (when this script loads). Does not run inference until the user clicks Check.
async function main() {
  const form = document.getElementById("url-form");
  const input = document.getElementById("url-input");
  const resultsEl = document.getElementById("results");

  if (!form || !input || !resultsEl) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = input.value.trim();
    if (!url) {
      resultsEl.innerHTML = "<p>Please enter a URL.</p>";
      return;
    }

    try {
      await runCheck(url);
    } catch (error) {
      resultsEl.innerHTML = `<p>Failed to check URL: ${escapeHtml(error.message)}</p>`;
    }
  });
}

document.addEventListener("DOMContentLoaded", main);
