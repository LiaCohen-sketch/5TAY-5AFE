let sessionPromise = null;

function getSession() {
  if (!sessionPromise) {
    sessionPromise = ort.InferenceSession.create("/model.onnx");
  }
  return sessionPromise;
}

async function checkUrl(url) {
  const resultsEl = document.getElementById("results");
  const fromInput = document.getElementById("url-input")?.value?.trim();
  const targetUrl = (url || fromInput || "").trim();

  if (!targetUrl) {
    if (resultsEl) resultsEl.textContent = "Please enter a URL.";
    return;
  }

  if (resultsEl) resultsEl.textContent = "Checking...";

  try {
    const session = await getSession();
    const urls = [targetUrl];
    const tensor = new ort.Tensor("string", urls, [urls.length]);
    const results = await session.run({ inputs: tensor });
    const probas = results.probabilities.data;
    const proba = probas[1];
    const percent = (proba * 100).toFixed(2);

    if (resultsEl) {
      resultsEl.innerHTML =
        `URL: ${escapeHtml(targetUrl)}<br>` +
        `Likelihood of being a phishing site: ${percent}%`;
    }
  } catch (e) {
    if (resultsEl) {
      resultsEl.textContent = `Failed to check URL: ${e.message || e}`;
    }
  }
}

function escapeHtml(text) {
  const el = document.createElement("div");
  el.textContent = text;
  return el.innerHTML;
}

window.checkUrl = checkUrl;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("check-btn")?.addEventListener("click", () => checkUrl());
});
