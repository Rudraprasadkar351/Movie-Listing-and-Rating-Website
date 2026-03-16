/**
 * data.js — CineRate Movie Database
 * ===================================
 * This file contains the MOVIES array — the single source of truth
 * for all movie data displayed on the site.
 *
 * To add a new movie:
 *   1. Copy any existing object below.
 *   2. Give it the next available id number.
 *   3. Fill in all fields (see field guide below).
 *   4. Save and refresh — it appears automatically.
 *
 * FIELD GUIDE:
 *   id          – Unique number (must be unique, never reused)
 *   title       – Full movie title (string)
 *   genre       – One of: "Action" | "Superhero" | "Drama" |
 *                         "Sci-Fi" | "Thriller" | "Animation"
 *   year        – Release year (number)
 *   director    – Director's full name (string)
 *   cast        – Array of lead actor names (strings)
 *   description – 1–2 sentence plot summary (string)
 *   poster      – Direct image URL (TMDB CDN recommended)
 *   baseRating  – Starting average rating out of 5 (number, 1 decimal)
 *   votes       – Starting vote count (number)
 *   trailer     – Full YouTube watch URL (string)
 *
 * Poster URL format (TMDB CDN):
 *   https://image.tmdb.org/t/p/w500/<poster_path>
 */

const MOVIES = [

  // ── SCI-FI ──────────────────────────────────────────────────
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    baseRating: 4.8,
    votes: 2341,
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },

  {
    id: 6,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    baseRating: 4.7,
    votes: 3001,
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
  },

  {
    id: 9,
    title: "Dune: Part Two",
    genre: "Sci-Fi",
    year: 2024,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler"],
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    baseRating: 4.6,
    votes: 890,
    trailer: "https://www.youtube.com/watch?v=Way9Dexny3w"
  },

  // ── DRAMA ───────────────────────────────────────────────────
  {
    id: 2,
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg",
    baseRating: 4.9,
    votes: 3102,
    trailer: "https://www.youtube.com/watch?v=6hB3S9bIaco"
  },

  {
    id: 10,
    title: "Whiplash",
    genre: "Drama",
    year: 2014,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist"],
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.",
    poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    baseRating: 4.7,
    votes: 1450,
    trailer: "https://www.youtube.com/watch?v=7d_jQycdQGo"
  },

  {
    id: 12,
    title: "Oppenheimer",
    genre: "Drama",
    year: 2023,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    baseRating: 4.6,
    votes: 1320,
    trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg"
  },

  {
    id: 15,
    title: "Titanic",
    genre: "Drama",
    year: 1997,
    director: "James Cameron",
    cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates"],
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    baseRating: 4.5,
    votes: 2988,
    trailer: "https://www.youtube.com/watch?v=2e-eXJ6HgkQ"
  },

  // ── ACTION ──────────────────────────────────────────────────
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Maggie Gyllenhaal"],
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    baseRating: 4.9,
    votes: 4508,
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },

  {
    id: 11,
    title: "Mad Max: Fury Road",
    genre: "Action",
    year: 2015,
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners.",
    poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    baseRating: 4.4,
    votes: 2100,
    trailer: "https://www.youtube.com/watch?v=hEJnMQG9ev8"
  },

  // ── THRILLER ────────────────────────────────────────────────
  {
    id: 4,
    title: "Parasite",
    genre: "Thriller",
    year: 2019,
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    baseRating: 4.6,
    votes: 1899,
    trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY"
  },

  {
    id: 7,
    title: "Pulp Fiction",
    genre: "Thriller",
    year: 1994,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    baseRating: 4.5,
    votes: 2780,
    trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY"
  },

  {
    id: 16,
    title: "Joker",
    genre: "Thriller",
    year: 2019,
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz", "Frances Conroy"],
    description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He embarks on a downward spiral of revolution and bloody crime.",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    baseRating: 4.5,
    votes: 3401,
    trailer: "https://www.youtube.com/watch?v=zAGVQLHvwOY"
  },

  // ── ANIMATION ───────────────────────────────────────────────
  {
    id: 5,
    title: "Spirited Away",
    genre: "Animation",
    year: 2001,
    director: "Hayao Miyazaki",
    cast: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"],
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    baseRating: 4.7,
    votes: 2210,
    trailer: "https://www.youtube.com/watch?v=ByXuk9QqQkk"
  },

  {
    id: 8,
    title: "The Lion King",
    genre: "Animation",
    year: 1994,
    director: "Roger Allers",
    cast: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"],
    description: "Lion cub Simba idolises his father, King Mufasa, but his treacherous uncle Scar plots to take the throne.",
    poster: "https://image.tmdb.org/t/p/w500/sIire8QhNovTaqvwzslQhNegHJV.jpg",
    baseRating: 4.5,
    votes: 1750,
    trailer: "https://www.youtube.com/watch?v=4sj1MT05lAA"
  },

  // ── SUPERHERO ───────────────────────────────────────────────
  {
    id: 13,
    title: "Doctor Strange",
    genre: "Superhero",
    year: 2016,
    director: "Scott Derrickson",
    cast: ["Benedict Cumberbatch", "Chiwetel Ejiofor", "Rachel McAdams", "Tilda Swinton"],
    description: "A brilliant but arrogant surgeon's life changes after a horrific car accident. He must put ego aside and learn the secrets of a hidden world of mysticism and alternate dimensions.",
    poster: "https://image.tmdb.org/t/p/w500/uGBVAWjjkHJTdCVZfxNpiypkm7A.jpg",
    baseRating: 4.2,
    votes: 1876,
    trailer: "https://www.youtube.com/watch?v=HSzx-zryEgM"
  },

  {
    id: 14,
    title: "Spider-Man: No Way Home",
    genre: "Superhero",
    year: 2021,
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jamie Foxx", "Alfred Molina"],
    description: "With Spider-Man's identity now revealed, Peter Parker asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    baseRating: 4.6,
    votes: 3210,
    trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA"
  },

  {
    id: 17,
    title: "Avengers: Endgame",
    genre: "Superhero",
    year: 2019,
    director: "Anthony & Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
    description: "After the devastating events of Infinity War, the universe is in ruins. The Avengers assemble once more to reverse Thanos's actions and restore balance to the universe.",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    baseRating: 4.7,
    votes: 4120,
    trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
  }

]; // end MOVIES array
