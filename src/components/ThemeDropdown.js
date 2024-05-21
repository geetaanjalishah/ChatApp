
// ThemeDropdown.js
import React from 'react';

const ThemeDropdown = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="theme-dropdown">
      <label htmlFor="theme-select">Change Theme:</label>
      <select id="theme-select" value={currentTheme} onChange={onThemeChange}>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="purple">Purple</option>
      </select>
    </div>
  );
};

export default ThemeDropdown;
