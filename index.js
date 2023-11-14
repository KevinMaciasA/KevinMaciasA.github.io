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

const resumeButton = document.querySelector(".button__resume");
const contactButton = document.querySelector(".button__contact");

const themeButton = document.querySelector(".theme-button");
const themeHanlder = () => {
  const currentTheme = document.documentElement.getAttribute("color-theme");
  const swapTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("color-theme", swapTheme);
  updateLocalStorage("colorTheme", swapTheme);
};

const submenuButton = document.querySelector(".mobile-button__hamburger");
const submenuHanlder = (state) => {
  if (state === undefined) submenuButton.toggleAttribute("active");
  else {
    if (state) submenuButton.setAttribute("active");
    else submenuButton.removeAttribute("active");
  }
};

document.addEventListener("click", (event) => {
  const target = event.target;
  const button = target.closest("button");

  if (button === resumeButton) scrollToSection("info");
  if (button === contactButton) scrollToSection("find-me");

  if (button === themeButton) themeHanlder();

  if (button === submenuButton) submenuHanlder();
  else {
    submenuHanlder(false);
  }
});

function updateLocalStorage(key, value) {
  const storageName = "kevin-website";
  const storageString = localStorage.getItem(storageName);
  const storage = JSON.parse(storageString);
  let newStorage = { ...storage };
  newStorage[key] = value;
  localStorage.setItem(storageName, JSON.stringify(newStorage));
}

function scrollToSection(id) {
  let section = document.getElementById(id);

  if (section) window.scrollTo(0, section.offsetTop);
}
