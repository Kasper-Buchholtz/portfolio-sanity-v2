import React, { useEffect, useState } from "react";

// Function to update the meta tag for prefers-color-scheme
const updatePrefersColorSchemeMetaTag = (theme: string) => {
    let metaTag = document.querySelector('meta[name="color-scheme"]');
    if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'color-scheme');
        document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', theme);
};

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
updatePrefersColorSchemeMetaTag(localStorage.theme || "light");

const ThemeToggler = () => {
    const [theme, setTheme] = useState(localStorage.theme || "light");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.theme = theme;
        updatePrefersColorSchemeMetaTag(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <button onClick={toggleTheme}>
            {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
    );
};

export default ThemeToggler;