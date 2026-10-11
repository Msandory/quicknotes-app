// Select elements
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const clearAllBtn = document.querySelector("#clear-all");
const MAX_LENGTH = 200;
const STORAGE_KEY = "quicknotes-notes";

// Notes are stored as an array of objects
let notes = loadNotes();

// Load notes from localStorage (falls back to an empty array)
function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return [];
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Build the count message for zero, one and many notes
function getCountMessage(total) {
  if (total === 0) {
    return "You have no notes yet.";
  }
  if (total === 1) {
    return "You have 1 note.";
  }
  return "You have " + total + " notes.";
}

// Remove one note by id
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// Rebuild the list from the array (filtered by the search box)
function render() {
  notesList.innerHTML = ""; // clears the list only; no user text goes through innerHTML

  const searchTerm = searchInput.value.trim().toLowerCase();

  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchTerm);
  });

  // Search found nothing (but there are notes)
  if (notes.length > 0 && visibleNotes.length === 0) {
    const li = document.createElement("li");
    li.className = "empty-message";
    li.textContent = "No notes match your search.";
    notesList.append(li);
  }

  visibleNotes.forEach(function (note) {
    const li = document.createElement("li");
    li.className = "note-card category-" + note.category.toLowerCase();

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const label = document.createElement("span");
    label.className = "category-label";
    label.textContent = note.category;

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    meta.append(label, date, deleteBtn);
    li.append(text, meta);
    notesList.append(li);
  });

  // The count always shows the total number of saved notes
  noteCount.textContent = getCountMessage(notes.length);
  // Clear all notes (after confirmation)
clearAllBtn.addEventListener("click", function () {
  if (notes.length === 0) {
    return;
  }
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});
}

// Handle form submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  // Validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Valid note: clear the error and add it
  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);
  saveNotes();
  render();

  noteInput.value = "";
  noteInput.focus();
});

// Search as the user types
searchInput.addEventListener("input", render);



render();