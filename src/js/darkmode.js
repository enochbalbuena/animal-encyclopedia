export function setupDarkModeToggle() {
    // Restore saved theme on load
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', storedTheme === 'dark');
  
    // Toggle and save theme on click
    document.getElementById('toggleTheme').addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
    });
  }
  