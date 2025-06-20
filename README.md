# Roguelike Toolbox

This repository contains small utilities for roguelike development. The current tools are:

- **Dice Roller** – a simple web-based roller. Serve `index.html` using a local web server (for example `python -m http.server`) and open it in a browser to roll dice by entering expressions like `1d20+5+1d6` or by using the provided buttons. Logic for rolling dice now lives in `DiceRoller.js` and is loaded as an ES module.
- **Stats Module** – `Stats.js` provides a basic set of statistics that can represent the player, allies or enemies in a game.
- **Party Module** – `Party.js` renders a small party UI where characters are displayed in individual slots. It is automatically populated with a sample player when the page loads.

Additional documentation for each tool can be found in the `Docs` directory.
