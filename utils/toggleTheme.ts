type Mode = "light" | "dark";

export const toggleTheme = (setMode: (mode: Mode) => void, currentMode: Mode) => {
  const nextMode = currentMode === "dark" ? "light" : "dark";
  setMode(nextMode);
  document.documentElement.setAttribute("data-theme", nextMode);
  localStorage.setItem("theme", nextMode);
};
