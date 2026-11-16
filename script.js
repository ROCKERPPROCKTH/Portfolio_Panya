const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const themeLabel = themeToggle.querySelector(".theme-toggle__label");
const savedTheme = localStorage.getItem("portfolio-theme");
let currentTheme = savedTheme === "dark" ? "dark" : "light";

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  themeIcon.className = `ri-${isDark ? "sun" : "moon"}-line`;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${isDark ? "light" : "dark"} mode`
  );
  themeLabel.textContent = `${isDark ? "Light" : "Dark"} mode`;
}

applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", currentTheme);
  applyTheme(currentTheme);
});

const navLinks = Array.from(document.querySelectorAll(".nav__link"));
const navSections = navLinks
  .map((link) => {
    const target = link.getAttribute("href");
    return target && target.startsWith("#") ? document.querySelector(target) : null;
  })
  .filter(Boolean);

function updateActiveNavLink() {
  const isAtPageBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 1;
  const currentSection = isAtPageBottom
    ? navSections[navSections.length - 1]
    : navSections
        .filter((section) => section.getBoundingClientRect().top <= 120)
        .pop() || navSections[0];

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active-link",
      link.getAttribute("href") === `#${currentSection.id}`
    );
  });
}

window.addEventListener("scroll", updateActiveNavLink, { passive: true });
window.addEventListener("hashchange", updateActiveNavLink);
updateActiveNavLink();
