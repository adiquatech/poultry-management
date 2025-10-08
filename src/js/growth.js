// src/js/growth.js
import { initializeUI } from './dashBoard.mjs';
import { growthModule } from './growthModule.mjs';

async function loadPartials() {
  try {
    const [sidebarHtml, headerHtml, footerHtml] = await Promise.all([
      fetch('../partials/sidebar.html').then(res => res.text()),
      fetch('../partials/header.html').then(res => res.text()),
      fetch('../partials/footer.html').then(res => res.text())
    ]);
    document.getElementById('sidebarContainer').innerHTML = sidebarHtml;
    document.getElementById('headerContainer').innerHTML = headerHtml;
    document.getElementById('footerContainer').innerHTML = footerHtml;
    console.log('Partials loaded successfully');
    initializeUI();
  } catch (error) {
    console.error('Failed to load partials:', error);
    document.getElementById('sidebarContainer').innerHTML = '<div class="sidebar">Sidebar loading failed</div>';
    document.getElementById('headerContainer').innerHTML = '<header>Header loading failed</header>';
    document.getElementById('footerContainer').innerHTML = '<footer>Footer loading failed</footer>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartials();

  const form = document.getElementById('trackGrowthForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        count: document.getElementById('count').value,
        growthWeight: document.getElementById('weight').value
      };
      if (growthModule && growthModule.trackGrowth) {
        growthModule.trackGrowth(formData);
      } else {
        console.error('growthModule or trackGrowth not available');
      }
    });
  } else {
    console.error('Form not found');
  }
});



// In DOMContentLoaded, fetch and display API data
document.addEventListener('DOMContentLoaded', async () => {
  await loadPartials();

  const apiData = await growthModule.fetchChickenWeights();
  document.getElementById('growthData').innerHTML = `
    <p>API Data: Average chicken weight ${apiData.growthWeight}kg (${apiData.source})</p>
  `;

  const form = document.getElementById('trackGrowthForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        count: document.getElementById('count').value,
        growthWeight: document.getElementById('weight').value
      };
      if (growthModule && growthModule.trackGrowth) {
        growthModule.trackGrowth(formData);
      } else {
        console.error('growthModule or trackGrowth not available');
      }
    });
  } else {
    console.error('Form not found');
  }
});