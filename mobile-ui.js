(function () {
  const BREAKPOINT = 900;

  function applyMobileLayout() {
    if (window.innerWidth > BREAKPOINT) return;

    const body = document.body;
    if (!body || body.dataset.mobileUiApplied === "true") return;
    if (!body.classList.contains("VisualizationMainPage")) return;

    const main = document.getElementById("mainContent");
    const canvas = document.getElementById("canvas");
    if (!main || !canvas) return;

    body.dataset.mobileUiApplied = "true";
    body.classList.add("mobile-mode");

    const accordion = document.createElement("div");
    accordion.className = "mobile-accordion";

    const wrapSection = (title, node, openDefault) => {
      if (!node) return;
      const item = document.createElement("details");
      item.className = "mobile-accordion__item";
      item.open = !!openDefault;

      const summary = document.createElement("summary");
      summary.className = "mobile-accordion__title";
      summary.textContent = title;

      const panel = document.createElement("div");
      panel.className = "mobile-accordion__panel";
      panel.appendChild(node);

      item.appendChild(summary);
      item.appendChild(panel);
      accordion.appendChild(item);
    };

    wrapSection("Algorithm Inputs", document.getElementById("algoControlSection"), true);
    wrapSection("Playback Controls", document.getElementById("generalAnimationControlSection"), false);
    wrapSection("Pseudocode & Notes", document.getElementById("pseudocodeSection"), false);

    if (accordion.childNodes.length > 0) {
      main.insertBefore(accordion, main.firstChild);
    }

    main.insertBefore(canvas, main.firstChild);
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  onReady(applyMobileLayout);
  window.addEventListener("resize", applyMobileLayout);
})();

