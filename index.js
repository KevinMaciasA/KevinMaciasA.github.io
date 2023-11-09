const storageString = localStorage.getItem("kevin-website");
const storage = JSON.parse(storageString);
let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

if (!storage) {
  const newStorage = {
    colorTheme: theme,
  };
  localStorage.setItem("kevin-website", JSON.stringify(newStorage));
} else {
  theme = storage.colorTheme ?? theme;
}
document.documentElement.setAttribute("color-theme", theme);

const themeButton = document.querySelector(".theme-button");

themeButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("color-theme");
  const swapTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("color-theme", swapTheme);
  updateLocalStorage("colorTheme", swapTheme);
});

function updateLocalStorage(key, value) {
  const storageName = "kevin-website";
  const storageString = localStorage.getItem(storageName);
  const storage = JSON.parse(storageString);
  let newStorage = { ...storage };
  newStorage[key] = value;
  localStorage.setItem(storageName, JSON.stringify(newStorage));
}
