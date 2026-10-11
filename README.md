# QuickNotes

QuickNotes is a simple note-taking web app built with HTML, CSS and vanilla JavaScript. You can write short notes, sort them into Personal, Work or Study categories, search through them, and delete the ones you no longer need. Your notes are saved in the browser, so they are still there when you refresh the page.

## Features

- Add notes with a category (Personal, Work or Study)
- Each note shows its text, category label, and the date and time it was created
- Colour-coded note cards, with a different left border for each category
- Validation: empty notes and notes over 200 characters are rejected with an error message
- Delete any note with its own Delete button
- Live note count ("You have no notes yet.", "You have 1 note.", "You have N notes.")
- Search notes as you type (not case-sensitive), with a message when nothing matches
- Notes saved to localStorage and loaded when the page opens
- Responsive layout: the form stacks vertically on screens 600px wide or narrower

## How to run locally

1. Clone the repository: https://github.com/Msandory/quicknotes-app.git
2. Open the `quicknotes-app` folder.
3. Open `index.html` in your web browser (or use the VS Code Live Server extension).

No installation or build step is needed.

## What I learned

- How to build a page with semantic HTML (`header`, `main`, `section`, `footer`) and link a `label` to its input.
- How to lay out a form with Flexbox and use a media query to change the layout on small screens.
- How to keep data in an array of objects and rebuild the page from it with a `render()` function.
- Why to use `textContent` instead of `innerHTML` for user text, so typed input can never inject HTML.
- How to save and load data with `localStorage` using `JSON.stringify` and `JSON.parse`.
- How to make small, clear Git commits as I finish each part of a project.