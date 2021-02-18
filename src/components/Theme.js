import React from "react";
import "./Theme.css";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Switch } from "antd";
import storage from "local-storage-fallback";

function Theme() {
  function getInitialTheme() {
    const savedTheme = storage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  }

  const [isDarkMode, setIsDarkMode] = React.useState(getInitialTheme);
  const { switcher, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
    isChecked
      ? storage.setItem("theme", "dark")
      : storage.setItem("theme", "light");
  };

  // Avoid theme change flicker
  if (status === "loading") {
    return null;
  }

  return (
    <div className="main fade-in">
      <span>Change theme</span>&nbsp;
      <Switch checked={isDarkMode} onChange={toggleTheme} />
    </div>
  );
}

export default Theme;
