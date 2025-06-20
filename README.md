# Roguelike Toolbox

This repository contains small utilities for roguelike development. The current tools are:

 - **Dice Roller** – a simple web-based roller. Serve `index.html` using a local web server (for example `python -m http.server`) and open it in a browser to roll dice by entering expressions like `1d20+5+1d6` or by using the provided buttons. Logic for rolling dice now lives in `src/DiceRoller.js` and is loaded as an ES module.
 - **Stats Module** – `src/Stats.js` provides a basic set of statistics that can represent the player, allies or enemies in a game.
 - **Party Module** – `src/Party.js` renders a small party UI where characters are displayed in individual slots. It is automatically populated with a sample player when the page loads.
- **Drag and Drop Layout** – modules in the grid can be reordered by dragging the module sections.

Additional documentation for each tool can be found in the `docs` directory.

## Development

Install the dev dependencies and start a local server with:

```bash
npm install
npm start
```

This uses [`http-server`](https://www.npmjs.com/package/http-server) to serve `index.html` so the ES modules load correctly.

## Bug Reporting
Use the floating **Report a Bug** button in the bottom-right corner of the page
to open a dialog box. Select the affected module from the drop-down list,
describe the problem, and click **Submit**. If a `BUG_REPORT_TOKEN` variable is
defined on the page, the tool will automatically create an issue via the
GitHub API including your browser information. Without a token, or if the
request fails, it falls back to opening the GitHub issue form with the details
pre‑filled. Browsers that do not support the `<dialog>` element will still
prompt for text before opening the GitHub form.
