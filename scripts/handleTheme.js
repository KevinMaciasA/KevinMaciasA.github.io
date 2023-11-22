import { updateLocalStorage, storageName } from "./utils/localStorage.js";

const storageString = localStorage.getItem(storageName);
const storage = JSON.parse(storageString);
let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

if (!storage) {
  const newStorage = {
    colorTheme: theme,
  };
  localStorage.setItem(storageName, JSON.stringify(newStorage));
} else {
  theme = storage.colorTheme ?? theme;
}
document.documentElement.setAttribute("color-theme", theme);

const themeButton = document.querySelector(".theme-button");
const themeHanlder = () => {
  const currentTheme = document.documentElement.getAttribute("color-theme");
  const swapTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("color-theme", swapTheme);
  updateLocalStorage("colorTheme", swapTheme);
};

export { themeHanlder, themeButton };
