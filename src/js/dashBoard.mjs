// src/js/dashboard.mjs
export function initializeUI() {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
    console.log('Hamburger and sidebar initialized at 10:50 AM WAT on October 08, 2025');
  } else {
    console.error('Hamburger or sidebar element not found at 10:50 AM WAT on October 08, 2025');
  }
}
