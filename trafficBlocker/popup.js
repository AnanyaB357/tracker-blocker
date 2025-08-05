document.addEventListener('DOMContentLoaded', () => {
    const domainList = document.getElementById('domainList');
    const categoryList = document.getElementById('categoryList');
  
    chrome.storage.local.get(['trackerCounts', 'categoryCounts'], (result) => {
      const trackerCounts = result.trackerCounts || {};
      const categoryCounts = result.categoryCounts || {};
  
      // Populate domain list
      domainList.innerHTML = '';
      if (Object.keys(trackerCounts).length === 0) {
        domainList.innerHTML = '<li>No tracker blocks recorded yet.</li>';
      } else {
        Object.entries(trackerCounts).forEach(([domain, count]) => {
          const li = document.createElement('li');
          li.textContent = `${domain}: ${count}`;
          domainList.appendChild(li);
        });
      }
  
      // Populate category list
      categoryList.innerHTML = '';
      if (Object.keys(categoryCounts).length === 0) {
        categoryList.innerHTML = '<li>No category data recorded yet.</li>';
      } else {
        Object.entries(categoryCounts).forEach(([category, count]) => {
          const li = document.createElement('li');
          li.textContent = `${category}: ${count}`;
          categoryList.appendChild(li);
        });
      }
    });
  });
  