export default function scrollToSection(id) {
  let section = document.getElementById(id);

  if (section) window.scrollTo(0, section.offsetTop);
}
