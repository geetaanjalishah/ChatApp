// theme.js

// Define theme colors and shades
export const themes = {
  green: {
    primaryColor: '#4caf50',
    primaryHoverColor: '#45a049',
    secondaryColor: '#f8f8f8',
    textColor: '#000',
  },
  blue: {
    primaryColor: '#2196f3',
    primaryHoverColor: '#1976d2',
    secondaryColor: '#e3f2fd',
    textColor: '#000',
  },
  purple: {
    primaryColor: '#9c27b0',
    primaryHoverColor: '#7b1fa2',
    secondaryColor: '#f3e5f5',
    textColor: '#000',
  },
};

// Apply selected theme
export const applyTheme = (theme) => {
  const selectedTheme = themes[theme];
  if (selectedTheme) {
    Object.keys(selectedTheme).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, selectedTheme[key]);
    });
    localStorage.setItem('selectedTheme', theme);
  }
};

// Set default theme on initial load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('selectedTheme') || 'green';
  applyTheme(savedTheme);
});
