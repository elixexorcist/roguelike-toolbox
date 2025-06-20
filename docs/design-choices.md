# Design Choices

This document explains the rationale behind the structure and technology choices in this repository.

## Modular Scripts

Initially the dice roller lived completely inside `index.html`. The project now separates the logic into small ES modules such as `src/DiceRoller.js`, `src/Stats.js` and `src/Party.js`. Each script focuses on a single responsibility which keeps the HTML file concise and makes the code easier to understand or extend. Users can still open the page directly in a browser because the modules are loaded using standard `<script type="module">` tags.

## Technology Stack

The page uses plain HTML5, modern CSS and vanilla JavaScript rather than a framework. Frameworks would be excessive for a simple dice roller and would increase the learning curve for newcomers exploring the project. Using standard web technologies keeps the code lightweight and easy to modify.

## Minimal Styling

A dark theme with subtle gradients and small animations was selected to evoke the feel of tabletop role‑playing games while keeping the interface focused on functionality. The layout centers a container to make the page usable on both desktop and mobile devices without additional responsive design tools.

## Expression Parser

Dice expressions are parsed using a regular expression that captures numbers and dice notations such as `2d6+3`. Each token is evaluated sequentially, allowing positive or negative modifiers. Although simple, this method is flexible enough for typical dice rolls and avoids a more complex parser.

## History Log

Results are stored in a scrollable log so players can review previous rolls. The log is maintained client‑side using DOM manipulation, which keeps the application fully offline.

## Why Not a Server or Framework?

Many dice rollers use a server to manage state or generate random numbers. Here, randomness comes from `Math.random` in the browser. This avoids setup costs and ensures the tool works entirely offline. Should the project expand, server functionality or a build system can be added later without rewriting the core logic.


## Stats Module

Game entities often share the same set of statistics regardless of whether they are controlled by the player or are enemies. `src/Stats.js` defines a small class with hit points, attack, defense and speed values. Keeping this logic separate from the dice roller lets other tools in the toolbox reuse the same implementation.
