(function () {
  "use strict";

  const cylinderEl = document.getElementById("cylinder");
  const labelCylinderEl = document.getElementById("labelCylinder");
  const dotsEl = document.getElementById("dots");
  const stageEl = document.getElementById("stage");

  const N = CARD_DATA.length;
  const CARD_W = 230; // keep in sync with --card-w (desktop default)
  const ANGLE_STEP = (2 * Math.PI) / N;
  // radius so adjacent cards sit edge-to-edge around the cylinder
  const RADIUS = Math.round((CARD_W / 2) / Math.tan(Math.PI / N));

  let active = 1; // start on "Rediscovered" to match the captured state
  let cardSlots = [];
  let labelNodes = [];
  let dotNodes = [];

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function buildCardInner(item) {
    if (item.type === "mosaic") {
      const tiles = item.mosaic.map(src =>
        `<div class="mosaic-tile"><img src="${src}" alt="" loading="lazy" onerror="this.style.display='none'"></div>`
      ).join("");
      return `
        <div class="mosaic-grid">${tiles}</div>
        <div class="mosaic-footer">
          <p class="mosaic-title">${escapeHtml(item.title)}</p>
          <p class="mosaic-subtext">${escapeHtml(item.subtitle)}</p>
        </div>`;
    }

    const metaLine = item.date
      ? `<p class="card-date">${escapeHtml(item.date)}</p>`
      : item.meta
        ? `<p class="card-date">${escapeHtml(item.meta)}</p>`
        : item.count
          ? `<div class="card-shazam-row"><svg viewBox="0 0 24 24"><use href="#icon-shazam"></use></svg><span class="card-shazam-count">${escapeHtml(item.count)}</span></div>`
          : "";

    return `
      <img class="card-art" src="${item.img}" alt="" loading="lazy" onerror="this.remove()">
      <div class="card-inner">
        <button type="button" class="play-btn" aria-label="Play preview of ${escapeHtml(item.title)}">
          <svg viewBox="0 0 24 24"><use href="#icon-play"></use></svg>
        </button>
        <div class="card-footer">
          <div class="card-text-stack">
            <p class="card-title">${escapeHtml(item.title)}</p>
            <p class="card-artist">${escapeHtml(item.artist)}</p>
            ${metaLine}
          </div>
          <button type="button" class="share-btn" aria-label="Share ${escapeHtml(item.title)}">
            <svg viewBox="0 0 24 24"><use href="#icon-share"></use></svg>
          </button>
        </div>
      </div>`;
  }

  function build() {
    CARD_DATA.forEach((item, i) => {
      const slot = document.createElement("div");
      slot.className = "card-slot";
      slot.dataset.index = i;
      slot.innerHTML = `<div class="card" style="background:${item.bg}">${buildCardInner(item)}</div>`;
      slot.addEventListener("click", (e) => {
        // ignore clicks on play/share buttons for slot-select
        if (e.target.closest(".play-btn") || e.target.closest(".share-btn")) return;
        if (Number(slot.dataset.index) !== active) {
          e.preventDefault();
          goTo(Number(slot.dataset.index));
        }
      });
      cylinderEl.appendChild(slot);
      cardSlots.push(slot);

      const label = document.createElement("div");
      label.className = "label";
      label.innerHTML = `
        <p class="label-category">${escapeHtml(item.category)}</p>
        <p class="label-subtitle">${escapeHtml(item.subtitle)}</p>`;
      labelCylinderEl.appendChild(label);
      labelNodes.push(label);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", item.category);
      dot.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(dot);
      dotNodes.push(dot);
    });
  }

  function shortestDelta(from, to, n) {
    let d = (to - from) % n;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }

  function render() {
    cardSlots.forEach((slot, i) => {
      const rawDelta = i - active;
      // wrap to the shortest visual path around the cylinder
      let delta = rawDelta;
      if (delta > N / 2) delta -= N;
      if (delta < -N / 2) delta += N;

      const angle = delta * ANGLE_STEP;
      const isActive = i === active;
      const absDelta = Math.abs(delta);

      let opacity = 0;
      let visibility = "hidden";
      if (absDelta === 0) { opacity = 1; visibility = "visible"; }
      else if (absDelta === 1) { opacity = 0.68; visibility = "visible"; }
      else if (absDelta === 1.5 || (N % 2 === 0 && absDelta === N / 2)) { opacity = 0.35; visibility = "visible"; }

      slot.style.transform = `rotateY(${angle}rad) translateZ(${RADIUS}px)`;
      slot.style.opacity = String(opacity);
      slot.style.visibility = visibility;
      slot.style.zIndex = String(100 - Math.round(absDelta * 10));
      slot.dataset.active = String(isActive);
      slot.setAttribute("aria-hidden", String(!isActive));
      slot.tabIndex = isActive ? 0 : -1;
    });

    labelNodes.forEach((label, i) => {
      label.style.opacity = i === active ? "1" : "0";
      label.style.pointerEvents = i === active ? "auto" : "none";
    });

    dotNodes.forEach((dot, i) => {
      const isActive = i === active;
      dot.setAttribute("aria-current", String(isActive));
    });
  }

  function goTo(index) {
    active = ((index % N) + N) % N;
    render();
  }

  function next() { goTo(active + 1); }
  function prev() { goTo(active - 1); }

  // nav zones + arrows
  document.querySelectorAll('[data-nav="next"]').forEach(el => el.addEventListener("click", next));
  document.querySelectorAll('[data-nav="prev"]').forEach(el => el.addEventListener("click", prev));

  // keyboard
  stageEl.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  });

  // swipe / drag support
  let dragStartX = null;
  stageEl.addEventListener("pointerdown", (e) => { dragStartX = e.clientX; });
  stageEl.addEventListener("pointerup", (e) => {
    if (dragStartX === null) return;
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    dragStartX = null;
  });

  build();
  render();
})();
