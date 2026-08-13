# Verse of the Day

A minimal static web page that displays a daily Bible verse, sourced from the [They Said So](https://theysaidso.com/api/bible) Bible Verse API. Built with plain HTML, CSS, and JavaScript — no framework, no build step, no dependencies.

## Features

- **On-demand fetch** — the verse loads only when you click the **Verse** button, not automatically on page load, to avoid burning API calls unnecessarily.
- **Daily caching** — once a verse is successfully fetched, it's cached in `localStorage` for the rest of the day. Reloading the page or clicking the button again the same day reuses the cached verse instead of calling the API again.
- **Error-safe caching** — only successful responses (ones that actually contain verse data) are cached. Rate-limit or error responses are never written to the cache, so a failed request doesn't block retries for the rest of the day.
- **Responsive card layout** — clean, centered verse card that scales down for mobile.

## Project structure

```
bible-verse/
├── index.html         # page markup
├── css/
│   ├── style.css       # site styling
│   ├── normalize.css   # cross-browser baseline reset
│   └── reset.css       # (unused) full CSS reset
├── js/
│   ├── main.js          # fetch, caching, and rendering logic
│   └── config.js        # API key (gitignored, not committed)
└── .gitignore
```

## Getting started

### Prerequisites

- A [quotes.rest / They Said So](https://theysaidso.com/api/bible) API key.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/phelpsdevelops/bible-verse.git
   cd bible-verse
   ```

2. Create `js/config.js` with your own API key:
   ```js
   const API_KEY = "your-api-key-here";
   ```

   This file is listed in `.gitignore` and is intentionally never committed, since the key is loaded as a plain global variable in the browser.

3. Open `index.html` in a browser (or serve the folder with any static file server).

4. Click the **Verse** button to fetch and display today's verse.

## How it works

`index.html` loads `js/config.js` before `js/main.js`, so the `API_KEY` constant it defines is available as a global by the time `main.js` runs.

Clicking the **Verse** button calls `getVerseOfTheDay()` in `js/main.js`, which:

1. Checks `localStorage` for a cached verse dated today. If found, it renders that immediately with no network request.
2. Otherwise, it fetches `https://quotes.rest/bible/vod.json?api_key=...`. On a successful response (one that actually contains `contents.verse`), it caches the result under today's date and renders it. Error/rate-limit responses are rendered but not cached, so the next click retries the request.

## API rate limits

The free tier of the They Said So Bible API is limited to a small number of requests per hour. The caching behavior described above exists specifically to stay within that limit — the app only calls the API once per day under normal use.

## License

No license specified.
