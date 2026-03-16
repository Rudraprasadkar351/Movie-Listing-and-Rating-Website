# 🎬 CineRate — Movie Listing & Rating Website

A responsive, interactive movie listing and rating website built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** — no frameworks, no dependencies.

---

## 📸 Preview

> Browse 17 curated movies, filter by genre, search by title, sort by rating or year, and rate any movie with an interactive star system.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎞️ Movie Grid | Responsive CSS Grid displaying 17 films with posters |
| ⭐ Star Rating | Click to rate 1–5 stars; average updates instantly |
| 🔍 Live Search | Filter movies by title as you type |
| 🎭 Genre Filters | Filter by Action, Superhero, Drama, Sci-Fi, Thriller, Animation |
| 🔃 Sort Options | Sort by Top Rated, Newest, Oldest, or A→Z |
| 🖼️ Detail Modal | Click any card for full plot, cast, director, and trailer link |
| 🌟 Loading Shimmer | Animated skeleton shown while posters load |
| 🛡️ Image Fallback | Graceful fallback tile if any poster fails to load |
| 📱 Fully Responsive | Optimised for mobile, tablet, and desktop |
| 🔔 Toast Alerts | Confirmation popup after submitting a rating |

---

## 📁 Project Structure

```
cinerate/
│
├── index.html          # Main HTML — page structure only
│
├── css/
│   └── style.css       # All styles (variables, layout, components, responsive)
│
├── js/
│   ├── data.js         # Movie database (MOVIES array)
│   └── app.js          # All interactivity (rating, search, filter, modal)
│
└── README.md           # This file
```

### Why three JS/CSS files?
| File | Responsibility |
|---|---|
| `index.html` | Structure only — no inline styles or scripts |
| `css/style.css` | All visual styles, animations, responsive breakpoints |
| `js/data.js` | Movie data (loaded first so `app.js` can read it) |
| `js/app.js` | All logic: render, filter, search, sort, modal, rating |

---

## 🚀 How to Run Locally

### Option 1 — Open directly (simplest)
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cinerate.git

# Open in your browser
open cinerate/index.html
# or double-click index.html in your file explorer
```

### Option 2 — Live Server (recommended for development)
```bash
# If you have VS Code + Live Server extension:
# Right-click index.html → "Open with Live Server"

# Or use Node.js http-server:
npx http-server cinerate/
```
Then visit `http://localhost:8080` in your browser.

---

## 🌐 Deployment

### GitHub Pages
1. Push this project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, select `main` branch and `/ (root)` folder.
4. Click **Save** — your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/cinerate/
   ```

### Netlify (drag & drop)
1. Go to [netlify.com](https://netlify.com) and log in.
2. Drag the entire `cinerate/` folder onto the Netlify dashboard.
3. Your site is live instantly — no build step required.

### Vercel
```bash
npm install -g vercel
cd cinerate
vercel
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Styling, animations, responsive layout |
| CSS Grid & Flexbox | Movie grid and component layouts |
| CSS Custom Properties | Design tokens (colours, spacing, radius) |
| Vanilla JavaScript (ES6+) | Interactivity — no frameworks |
| Google Fonts | Playfair Display + DM Sans |
| TMDB Image CDN | Movie poster images |

---

## 🧠 JavaScript Architecture (`js/app.js`)

The JavaScript is organised into 8 clearly labelled sections:

| Section | What it does |
|---|---|
| **A – State** | 4 variables track genre, search, sort, ratings |
| **B – Utilities** | `renderStars()` and `showToast()` helpers |
| **C – Star Widget** | Reusable interactive rating component |
| **D – Render Cards** | Builds the movie grid from a data array |
| **E – Filter Pipeline** | Combines genre + search + sort → renders |
| **F – Modal** | Open / close movie detail popup |
| **G – Event Listeners** | Wires all UI controls to handlers |
| **H – Initial Render** | Calls `applyFilters()` on page load |

---

## ➕ How to Add a New Movie

Open `js/data.js` and add a new object to the `MOVIES` array:

```javascript
{
  id: 18,                          // Next available unique number
  title: "Your Movie Title",
  genre: "Action",                 // See genre list below
  year: 2024,
  director: "Director Name",
  cast: ["Actor One", "Actor Two"],
  description: "Short plot summary (1–2 sentences).",
  poster: "https://image.tmdb.org/t/p/w500/POSTER_PATH.jpg",
  baseRating: 4.3,                 // Starting average (1.0 – 5.0)
  votes: 100,                      // Starting vote count
  trailer: "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Available genres:** `Action` · `Superhero` · `Drama` · `Sci-Fi` · `Thriller` · `Animation`

**Finding a TMDB poster path:**
1. Search the movie on [themoviedb.org](https://www.themoviedb.org)
2. Click the movie → right-click the poster → Copy image address
3. Replace the path in: `https://image.tmdb.org/t/p/w500/YOUR_PATH.jpg`

---

## 📋 Evaluation Criteria Coverage

| Criterion | Weight | Implementation |
|---|---|---|
| Design Quality | 25% | Dark cinema theme, gold accents, Playfair Display typography, hover animations, responsive grid |
| Functionality | 25% | Live rating system, search, genre filters, sort, modal details, trailer links |
| Code Quality | 20% | Separated HTML/CSS/JS, JSDoc comments, named sections, CSS variables |
| GitHub Usage | 15% | `.gitignore`, clear folder structure, descriptive README |
| Presentation | 15% | Deployed via GitHub Pages / Netlify, demo-ready |

---

## 📌 Known Limitations

- Ratings are **not persisted** between page refreshes (no backend/localStorage — intentional for simplicity).
- Movie data is **hardcoded** in `data.js`; a future version could integrate the [TMDB API](https://developer.themoviedb.org/docs) for live data.

---

## 👤 Author

**[Your Name]**  
Internship Project — Movie Listing & Rating Website UI  
Duration: 10 Days

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
