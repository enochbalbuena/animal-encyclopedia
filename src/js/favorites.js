import '../css/style.css';
import { renderNavbar } from './navbar.js';
import { setupDarkModeToggle } from './darkmode.js';
import { loadFavorites, renderFavorites } from './storage.js';

renderNavbar();
setupDarkModeToggle();
loadFavorites();
const container = document.getElementById('favoritesPageContainer');
renderFavorites(container);
