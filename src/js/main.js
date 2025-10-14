// src/js/main.js
import { initializeUI } from './dashBoard.mjs';
import { feedModule } from './feedModule.mjs';
import { growthModule } from './growthModule.mjs';
import { login, isAuthenticated, getUser, handleAuthCallback } from './auth.js';

// Load partials
async function loadPartials() {
  try {
    const [sidebarHtml, headerHtml, footerHtml] = await Promise.all([
      fetch('partials/sidebar.html').then(res => res.text()),
      fetch('partials/header.html').then(res => res.text()),
      fetch('partials/footer.html').then(res => res.text())
    ]);
    document.getElementById('sidebarContainer').innerHTML = sidebarHtml;
    document.getElementById('headerContainer').innerHTML = headerHtml;
    document.getElementById('footerContainer').innerHTML = footerHtml;
    console.log('Partials loaded successfully at 01:22 PM WAT on October 14, 2025');
    initializeUI();
  } catch (error) {
    console.error('Failed to load partials:', error);
    document.getElementById('sidebarContainer').innerHTML = '<div class="sidebar">Sidebar loading failed</div>';
    document.getElementById('headerContainer').innerHTML = '<header>Header loading failed</header>';
    document.getElementById('footerContainer').innerHTML = '<footer>Footer loading failed</footer>';
  }
}

// Dashboard
export async function loadDashboardData() {
  const apiData = await feedModule.fetchEggProduction();
  const localData = feedModule.getFeedLogs();
  const combinedData = [...localData, { ...apiData, type: 'api-eggs', date: new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Lagos' }) }];
  
  const summaryCards = document.getElementById('summaryCards');
  if (summaryCards) {
    summaryCards.innerHTML = combinedData.map(item => `
      <div class="card">
        <h3>${item.type.toUpperCase()}</h3>
        <p>Eggs Today: ${item.eggsToday || 'N/A'}</p>
        <p>Feed: ${item.feedConsumed || 'N/A'}kg</p>
        <p>Avg Weight: ${item.growthWeight || 'N/A'}kg</p>
        <p>Date: ${item.date}</p>
        ${item.type === 'api-eggs' ? `<small>(USDA API: ${item.source})</small>` : ''}
      </div>
    `).join('');
  } else {
    console.error('Summary cards element not found');
  }

  // Add growth data (optional, moved to growth.js primarily)
  const growthData = await growthModule.fetchChickenWeights();
  const growthElement = document.getElementById('growthData');
  if (growthElement) {
    growthElement.innerHTML = `
      <p>API Data: Average chicken weight ${growthData.growthWeight}kg (${growthData.source})</p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await handleAuthCallback();
  await loadPartials();
  await updateAuthUI();
  initializeUI(); // Call after partials
  if (await isAuthenticated()) {
    await loadDashboardData();
  } else {
    const summaryCards = document.getElementById('summaryCards');
    if (summaryCards) {
      summaryCards.innerHTML = '<p>Login to access growth tracking <button onclick="login()">Login</button></p>';
    }
  }
  const form = document.getElementById('addDataForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        count: document.getElementById('count').value,
        eggsToday: document.getElementById('eggs').value,
        feedConsumed: document.getElementById('feed').value,
        growthWeight: document.getElementById('weight').value
      };
      feedModule.addFeedLog(formData);
      loadDashboardData();
    });
  } else {
    console.error('Add form not found');
  }
});

// User Auth
async function updateAuthUI() {
  const loginLink = document.getElementById('loginLink');
  const signupLink = document.getElementById('signupLink');
  const logoutLink = document.getElementById('logoutLink');
  if (await isAuthenticated()) {
    const user = await getUser();
    document.querySelector('header h1').textContent = `Welcome, ${user.name}!`;
    if (loginLink) loginLink.style.display = 'none';
    if (signupLink) signupLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'block';
  } else {
    if (loginLink) loginLink.style.display = 'block';
    if (signupLink) signupLink.style.display = 'block';
    if (logoutLink) logoutLink.style.display = 'none';
  }
}

export { updateAuthUI };