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
const themeSlider = document.querySelector(".theme-slider");
const animateSlider = () => {
  const moonIcon = themeSlider.querySelector(".moon-icon");
  const sunIcon = themeSlider.querySelector(".sun-icon");
  const theme = document.documentElement.getAttribute("color-theme");
  const sliderIcon = theme === "light" ? moonIcon : sunIcon;
  sliderIcon.addEventListener("animationend", () => {
    sliderIcon.classList.remove("animate");
  });
  sliderIcon.classList.add("animate");
};
const themeHandler = () => {
  const currentTheme = document.documentElement.getAttribute("color-theme");
  const swapTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("color-theme", swapTheme);
  updateLocalStorage("colorTheme", swapTheme);
};

export { themeHandler, themeButton, themeSlider, animateSlider };
