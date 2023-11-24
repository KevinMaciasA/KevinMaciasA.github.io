import {
  themeHandler,
  themeButton,
  themeSlider,
  animateSlider,
} from "./scripts/handleTheme.js";
import scrollToSection from "./scripts/utils/scrollToSection.js";

const resumeButton = document.querySelector(".button__resume");
const contactButton = document.querySelector(".button__contact");

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

  if (button === themeSlider) animateSlider();
  if (button === themeButton || button === themeSlider) themeHandler();

  if (button === submenuButton) submenuHanlder();
  else {
    submenuHanlder(false);
  }
});

const animateBtn = (card) => {
  const btn = card.querySelector(".button__card");
  btn.addEventListener("animationend", () => {
    btn.classList.remove("animate");
  });
  btn.classList.add("animate");
};
document.addEventListener("click", (event) => {
  const target = event.target;

  const card = target.closest(".social-card");

  if (!card) return;

  animateBtn(card);
});

const headerSection = document.getElementById("header");

const observerOptions = { threshold: 0 };
const iObserver = new IntersectionObserver((entries) => {
  const [heroEntry, ...rest] = entries;
  if (!heroEntry.isIntersecting) {
    headerSection.setAttribute("active", "");
  } else {
    headerSection.removeAttribute("active");
  }
}, observerOptions);

const heroSection = document.getElementById("hero");
iObserver.observe(heroSection);

const mutationObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.attributeName !== "active") return;

    const value = mutation.target.attributes.getNamedItem("active");
    if (value) {
      headerSection.classList.add("hide");
    } else {
      headerSection.classList.remove("hide");
    }
  }
});

mutationObserver.observe(headerSection, {
  attributes: true,
  attributeFilter: ["active"],
});
