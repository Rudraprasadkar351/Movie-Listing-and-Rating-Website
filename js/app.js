/**
 * app.js — CineRate Application Logic
 * =====================================
 * This file handles ALL interactivity for the CineRate website.
 * It reads the MOVIES array from data.js (loaded before this file).
 *
 * TABLE OF CONTENTS
 * ──────────────────
 * A. State Management        – variables that track app state
 * B. Utility Helpers         – small reusable functions
 * C. Star Rating Widget      – interactive ★ rating component
 * D. Render Movie Cards      – builds the movie grid
 * E. Filter / Search / Sort  – data pipeline before rendering
 * F. Modal – Open & Close    – movie detail popup
 * G. Event Listeners         – wires all UI controls to handlers
 * H. Initial Render          – kicks everything off on page load
 */


/* ================================================================
   A. STATE MANAGEMENT
   ─────────────────────────────────────────────────────────────────
   These four variables represent the complete "state" of the app.
   Any time one changes, applyFilters() is called to re-render.
================================================================ */

// Stores the star value a user chose for each movie  { movieId: 1–5 }
const userRatings = {};

// Stores the live average for each movie  { movieId: { avg, votes } }
// Seeded from the baseRating / votes fields in data.js
const avgRatings = {};
MOVIES.forEach(movie => {
  avgRatings[movie.id] = { avg: movie.baseRating, votes: movie.votes };
});

let activeGenre = "All";    // Which genre filter button is active
let searchQuery = "";        // Current text in the search box
let sortMode    = "default"; // Current value of the sort dropdown


/* ================================================================
   B. UTILITY HELPERS
================================================================ */

/**
 * renderStars(value)
 * Returns an HTML string of 5 gold/dim star characters
 * used for the static average-rating display on each card.
 *
 * @param {number} value  – average rating (e.g. 4.7)
 * @returns {string}      – HTML string
 */
function renderStars(value) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.round(value)) {
      html += `<span class="avg-star">★</span>`;
    } else {
      html += `<span class="avg-star" style="color:var(--gold-dim)">★</span>`;
    }
  }
  return html;
}

/**
 * showToast(message)
 * Briefly displays a notification popup at the bottom-right.
 * Auto-hides after 2.8 seconds.
 *
 * @param {string} message – Text to display
 */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}


/* ================================================================
   C. STAR RATING WIDGET
   ─────────────────────────────────────────────────────────────────
   createStarWidget(movieId, containerEl)
   Builds 5 interactive ★ elements and appends them to containerEl.

   HOW IT WORKS:
     • Each star is a <span> with a data-value (1–5).
     • mouseenter  → "hovered" class highlights stars up to cursor
     • mouseleave  → reverts to the user's saved rating (or dim)
     • click       → saves rating, plays pop animation,
                     recalculates the average, fires toast
================================================================ */
function createStarWidget(movieId, containerEl) {
  const wrap = document.createElement("div");
  wrap.className = "star-rating";

  const stars = []; // holds references to all 5 star elements

  for (let i = 1; i <= 5; i++) {

    const star = document.createElement("span");
    star.className  = "star";
    star.textContent = "★";
    star.dataset.value = i;

    // ── Hover: highlight stars 1 → i ──
    star.addEventListener("mouseenter", () => {
      stars.forEach((s, idx) => {
        s.classList.toggle("hovered", idx < i);
        s.classList.remove("filled");
      });
    });

    // ── Mouse leave widget: restore saved rating ──
    wrap.addEventListener("mouseleave", () => {
      const saved = userRatings[movieId] || 0;
      stars.forEach((s, idx) => {
        s.classList.remove("hovered");
        s.classList.toggle("filled", idx < saved);
      });
    });

    // ── Click: save, animate, update average ──
    star.addEventListener("click", () => {
      userRatings[movieId] = i; // save user's choice

      // Pop animation on the clicked star
      star.classList.add("pop");
      star.addEventListener("animationend", () => star.classList.remove("pop"), { once: true });

      // Fill all stars up to chosen value
      stars.forEach((s, idx) => {
        s.classList.remove("hovered");
        s.classList.toggle("filled", idx < i);
      });

      // Recalculate average:
      //   newAvg = (oldAvg × oldVotes + newRating) / (oldVotes + 1)
      const prev   = avgRatings[movieId];
      const newAvg = ((prev.avg * prev.votes) + i) / (prev.votes + 1);
      avgRatings[movieId] = {
        avg:   parseFloat(newAvg.toFixed(1)),
        votes: prev.votes + 1
      };

      // Update every avg-display element on the page for this movie
      document.querySelectorAll(`.avg-display[data-movie="${movieId}"]`).forEach(el => {
        el.innerHTML =
          renderStars(newAvg) +
          `<span class="avg-number">${newAvg.toFixed(1)}</span>` +
          `<span class="avg-count">(${prev.votes + 1} votes)</span>`;
      });

      // Confirm to user via toast
      const movieTitle = MOVIES.find(m => m.id === movieId).title;
      showToast(`⭐ You rated "${movieTitle}" ${i}/5`);
    });

    stars.push(star);
    wrap.appendChild(star);
  }

  // Restore previously saved rating (in case widget re-created in modal)
  const saved = userRatings[movieId] || 0;
  stars.forEach((s, idx) => s.classList.toggle("filled", idx < saved));

  // "Rate this" label next to the stars
  const label = document.createElement("span");
  label.className   = "rate-label";
  label.textContent = "Rate this";
  wrap.appendChild(label);

  containerEl.appendChild(wrap);
}


/* ================================================================
   D. RENDER MOVIE CARDS
   ─────────────────────────────────────────────────────────────────
   renderCards(movies)
   Clears the grid and builds one <article> card per movie.
   Each card contains: poster (with shimmer + fallback), title,
   director/year meta, average rating display, star widget.
================================================================ */

// Maps genre names to emoji icons used in the poster fallback tile
const GENRE_ICONS = {
  "Sci-Fi":    "🚀",
  "Drama":     "🎭",
  "Action":    "⚡",
  "Thriller":  "🔪",
  "Animation": "✨",
  "Superhero": "🦸"
};

function renderCards(movies) {
  const grid  = document.getElementById("moviesGrid");
  const count = document.getElementById("resultsCount");

  // Clear previous cards
  grid.innerHTML = "";
  count.textContent = `— ${movies.length} film${movies.length !== 1 ? "s" : ""}`;

  // No results message
  if (!movies.length) {
    grid.innerHTML = `<p class="no-results">🎬 No movies match your search. Try a different filter.</p>`;
    return;
  }

  movies.forEach((movie, index) => {
    const rating = avgRatings[movie.id];
    const icon   = GENRE_ICONS[movie.genre] || "🎬";

    // Create card element
    const card = document.createElement("article");
    card.className = "movie-card";
    card.style.animationDelay = `${index * 60}ms`; // staggered entrance
    card.setAttribute("aria-label", movie.title);

    card.innerHTML = `
      <!-- Poster with shimmer skeleton and fallback -->
      <div class="card-poster" id="poster-${movie.id}">
        <img
          src="${movie.poster}"
          alt="${movie.title} poster"
          loading="lazy"
          onload="this.closest('.card-poster').classList.add('loaded')"
          onerror="
            this.style.display='none';
            this.closest('.card-poster').classList.add('loaded');
            this.closest('.card-poster').insertAdjacentHTML('beforeend',
              \`<div class='poster-fallback'>
                <span class='fb-icon'>${icon}</span>
                <span class='fb-title'>${movie.title}</span>
                <span class='fb-genre'>${movie.genre} · ${movie.year}</span>
              </div>\`
            );
          "
        />
        <div class="poster-overlay">
          <span class="overlay-hint">👁 View Details</span>
        </div>
        <span class="genre-badge">${movie.genre}</span>
      </div>

      <!-- Card body text -->
      <div class="card-body">
        <h3 class="card-title" title="${movie.title}">${movie.title}</h3>
        <p class="card-meta">${movie.director} · ${movie.year}</p>

        <!-- Average rating display — updated live when user rates -->
        <div class="avg-rating avg-display" data-movie="${movie.id}">
          ${renderStars(rating.avg)}
          <span class="avg-number">${rating.avg}</span>
          <span class="avg-count">(${rating.votes})</span>
        </div>
      </div>
    `;

    // Append interactive star widget below the avg display
    createStarWidget(movie.id, card.querySelector(".card-body"));

    // Click card → open modal (but not if clicking the stars themselves)
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("star")) return;
      openModal(movie.id);
    });

    grid.appendChild(card);
  });
}


/* ================================================================
   E. FILTER / SEARCH / SORT  PIPELINE
   ─────────────────────────────────────────────────────────────────
   applyFilters()
   Reads the three state variables, produces a filtered + sorted
   array, updates the section label, then calls renderCards().
================================================================ */
function applyFilters() {
  let result = [...MOVIES]; // start with a full copy

  // 1. Genre filter
  if (activeGenre !== "All") {
    result = result.filter(m => m.genre === activeGenre);
  }

  // 2. Search filter (case-insensitive title match)
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(m => m.title.toLowerCase().includes(q));
  }

  // 3. Sort
  switch (sortMode) {
    case "rating":
      result.sort((a, b) => avgRatings[b.id].avg - avgRatings[a.id].avg);
      break;
    case "year-desc":
      result.sort((a, b) => b.year - a.year);
      break;
    case "year-asc":
      result.sort((a, b) => a.year - b.year);
      break;
    case "title":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break; // keep original order from data.js
  }

  // Update section heading
  const label = document.getElementById("resultsLabel");
  const heading = activeGenre === "All" ? "All" : activeGenre;
  label.innerHTML = `${heading} Movies <span id="resultsCount"></span>`;

  renderCards(result);
}


/* ================================================================
   F. MODAL – OPEN & CLOSE
   ─────────────────────────────────────────────────────────────────
   openModal(movieId)
   Injects full movie details into the modal and shows it.

   closeModal()
   Hides the modal and restores body scrolling.
================================================================ */
function openModal(movieId) {
  const movie  = MOVIES.find(m => m.id === movieId);
  const rating = avgRatings[movieId];

  // Populate modal content
  document.getElementById("modalContent").innerHTML = `
    <!-- Left column: poster -->
    <div class="modal-poster">
      <img
        src="${movie.poster}"
        alt="${movie.title}"
        onerror="
          this.style.display='none';
          this.parentElement.style.background='linear-gradient(135deg,#1a1a2e,#0f3460)';
          this.insertAdjacentHTML('afterend',
            '<div style=&quot;display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;&quot;>🎬</div>'
          );
        "
      />
    </div>

    <!-- Right column: movie info -->
    <div class="modal-info">
      <h2>${movie.title}</h2>

      <!-- Metadata pills -->
      <div class="modal-meta">
        <span>📅 ${movie.year}</span>
        <span>🎭 ${movie.genre}</span>
        <span>🎬 ${movie.director}</span>
        <span>⭐ ${rating.avg} / 5 (${rating.votes} votes)</span>
      </div>

      <!-- Plot description -->
      <p class="modal-description">${movie.description}</p>

      <!-- Cast chips -->
      <p class="modal-section-title">Cast</p>
      <div class="cast-list">
        ${movie.cast.map(actor => `<span class="cast-chip">${actor}</span>`).join("")}
      </div>

      <!-- Watch Trailer button (opens YouTube in new tab) -->
      <button class="trailer-btn" onclick="window.open('${movie.trailer}', '_blank')">
        ▶ Watch Trailer
      </button>

      <!-- Interactive star rating inside modal -->
      <div class="modal-rating-wrap">
        <p class="modal-section-title">Your Rating</p>
        <div id="modalStarWidget"></div>
      </div>
    </div>
  `;

  // Attach star widget inside modal
  createStarWidget(movieId, document.getElementById("modalStarWidget"));

  // Show modal + freeze background scroll
  document.getElementById("modalBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("open");
  document.body.style.overflow = ""; // restore scrolling
}


/* ================================================================
   G. EVENT LISTENERS
   ─────────────────────────────────────────────────────────────────
   Wire every interactive UI element to its handler.
================================================================ */

// Close modal: ✕ button
document.getElementById("modalClose").addEventListener("click", closeModal);

// Close modal: click on dark backdrop (outside the panel)
document.getElementById("modalBackdrop").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modalBackdrop")) closeModal();
});

// Close modal: Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Search: re-filter 200ms after the user stops typing (debounce)
let searchTimer;
document.getElementById("searchInput").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  searchQuery = e.target.value;
  searchTimer = setTimeout(applyFilters, 200);
});

// Genre filter buttons: delegate click to parent #filterBar
document.getElementById("filterBar").addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter-btn")) return;

  // Move "active" class to the clicked button
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");

  activeGenre = e.target.dataset.genre;
  applyFilters();
});

// Sort dropdown
document.getElementById("sortSelect").addEventListener("change", (e) => {
  sortMode = e.target.value;
  applyFilters();
});


/* ================================================================
   H. INITIAL RENDER
   ─────────────────────────────────────────────────────────────────
   Called once when the page loads — renders all movies with
   default filter/sort settings.
================================================================ */
applyFilters();
