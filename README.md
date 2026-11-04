# BeeN Tools

A hub page of small tools. Live at https://muzammilj.github.io/BeeN_Tools/

## Structure

- `index.html` is the main Tools page.
- Each tool lives in its own folder, e.g. `bill-calculator/index.html`.
- `assets/shared.css` and `assets/shared.js` hold the shared theme (dark/light, remembered across tools) and the Firebase config used for login.

## Add a new tool

1. Create a folder (e.g. `my-tool/`) with an `index.html`. Add a link back to `../`, and include `../assets/shared.css` and `../assets/shared.js` for the shared theme and login config.
2. Copy a card in the main `index.html` grid and set its `href`, icon, title, text and tags.
