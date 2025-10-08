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

export function loadDashboardData() {
  const data = (typeof feedModule !== 'undefined' && feedModule.getFeedLogs) ? feedModule.getFeedLogs() : [];
  const summaryCards = document.getElementById('summaryCards');
  if (summaryCards) {
    summaryCards.innerHTML = data.map(item => `
      <div class="card">
        <h3>${item.type.toUpperCase()}</h3>
        <p>Count: ${item.count || 'N/A'}</p>
        <p>Eggs Today: ${item.eggsToday || 'N/A'}</p>
        <p>Feed: ${item.feedConsumed || 'N/A'}kg</p>
        <p>Avg Weight: ${item.growthWeight || 'N/A'}kg</p>
        <p>Date: ${item.date}</p>
      </div>
    `).join('');
  } else {
    console.error('Summary cards element not found at 10:50 AM WAT on October 08, 2025');
  }
}