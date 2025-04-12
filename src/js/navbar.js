export function renderNavbar() {
    const nav = document.querySelector('nav');
    nav.innerHTML = `
      <div class="nav-container">
        <button class="hamburger" aria-label="Toggle menu">☰</button>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="browse.html">Gallery</a></li>
          <li><a href="favorites.html">Favorites</a></li>
          <li><button id="toggleTheme">🌓</button></li>
        </ul>
      </div>
    `;
  
    const hamburger = nav.querySelector('.hamburger');
    const navLinks = nav.querySelector('.nav-links');
  
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
  