# BeeN Tools

A hub page of small tools. Live at https://muzammilj.github.io/BeeN_Tools/

## Structure

- `index.html` is the main Tools page.
- Each tool lives in its own folder, e.g. `bill-calculator/index.html`.
- `assets/shared.css` and `assets/shared.js` hold the shared theme (dark/light, remembered across tools) and the Firebase config used for login.

## Add a new tool

1. Create a folder (e.g. `my-tool/`) with an `index.html`. Add a link back to `../`, and include `../assets/shared.css` and `../assets/shared.js` for the shared theme and login config.
2. Copy a card in the main `index.html` grid and set its `href`, icon, title, text and tags.

## Tools

- `bill-calculator/` BeeN Calculator (bill and rent splitting)
- `mp3-to-wav/` BeeN Converter (MP3/M4A/OGG/FLAC to WAV, runs fully in the browser)
- `fiverr-tracker/` Fiverr Tracker (login only, not indexed)

## SEO, schema and ads

- Every public page has a title, description, canonical link, Open Graph/Twitter tags and JSON-LD schema. `sitemap.xml`, `robots.txt`, `favicon.svg` and `og-image.png` are in the root. The login-only Fiverr Tracker is `noindex` and has no ads.
- Info pages for AdSense approval: `about/`, `contact/`, `privacy/`, `terms/`.
- Ads are OFF by default. Master switch: `BeeN.site.ads.enabled` in `assets/shared.js`. `assets/ads.js` loads AdSense with a consent banner; only the hub and the calculator include it.
- After buying a domain / getting AdSense approval, run once:
  `scripts/set-site.sh https://yourdomain.com you@yourdomain.com [ca-pub-XXXXXXXXXXXXXXXX]`
  (updates the address and email everywhere; with a publisher id it also turns ads on and writes `ads.txt`).
- New tool checklist: add a page with its own title/description/canonical/JSON-LD, add it to `sitemap.xml`, the hub grid and the footer.
