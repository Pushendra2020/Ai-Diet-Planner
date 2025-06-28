import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../app/authSlice';

const THEME_KEY = 'theme_preference';

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeInit() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.auth.darkMode);

  // On mount, initialize theme from localStorage or set dark as default
  useEffect(() => {
    let theme = localStorage.getItem(THEME_KEY);
    if (theme === null) {
      theme = 'dark'; // Set dark as default
      localStorage.setItem(THEME_KEY, theme);
    }
    dispatch(setDarkMode(theme === 'dark'));
  }, [dispatch]);

  // When darkMode changes, update <html> class and localStorage
  useEffect(() => {
    if (darkMode === null) return;
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [darkMode]);

  return null;
} 