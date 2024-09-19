// DOM Elements
const body = document.body;
const darkButton = document.getElementById("toggleDark");
const lightButton = document.getElementById("toggleLight");

// Apply the cached theme on reload
const theme = localStorage.getItem("theme");
if (theme) {
    body.classList.add(theme);
}

// Button Event Handlers
darkButton.addEventListener("click", (e) => {
    e.preventDefault;
    body.classList.replace("light", "light");
    localStorage.setItem("theme", "light");
});

lightButton.addEventListener("click", (e) => {
    e.preventDefault;
    body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
});