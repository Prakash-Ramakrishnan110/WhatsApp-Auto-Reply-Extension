// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleDarkMode') {
    toggleDarkMode(request.enabled);
  }
  return true;
});

// Function to toggle dark mode
function toggleDarkMode(enabled) {
  if (enabled) {
    // Create and inject dark mode styles
    const style = document.createElement('style');
    style.id = 'dark-mode-styles';
    style.textContent = `
      :root {
        --dark-bg: #121212;
        --dark-text: #e0e0e0;
        --dark-secondary: #1e1e1e;
        --dark-border: #333333;
      }
      
      /* Base styles */
      body {
        background-color: var(--dark-bg) !important;
        color: var(--dark-text) !important;
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      
      /* Text and links */
      p, h1, h2, h3, h4, h5, h6, span, div, a, li, td, th, label, input, textarea, select, button {
        color: var(--dark-text) !important;
        border-color: var(--dark-border) !important;
      }
      
      /* Backgrounds */
      div, section, article, header, footer, aside, nav, main, form, fieldset, details, summary {
        background-color: var(--dark-bg) !important;
        color: var(--dark-text) !important;
      }
      
      /* Cards and containers */
      .card, .box, .container, .panel, .modal-content, .dropdown-menu {
        background-color: var(--dark-secondary) !important;
        border-color: var(--dark-border) !important;
      }
      
      /* Inputs and buttons */
      input, textarea, select, button {
        background-color: var(--dark-secondary) !important;
        border-color: var(--dark-border) !important;
      }
      
      /* Tables */
      table, th, td {
        border-color: var(--dark-border) !important;
      }
      
      /* Images and videos */
      img, video {
        filter: brightness(0.85) contrast(1.1);
        transition: filter 0.3s ease;
      }
      
      /* Code blocks */
      pre, code {
        background-color: #1a1a1a !important;
        color: #f0f0f0 !important;
      }
      
      /* Scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: var(--dark-bg);
      }
      
      ::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #777;
      }
    `;
    
    document.head.appendChild(style);
    
    // Add dark mode class to html element
    document.documentElement.setAttribute('data-dark-mode', 'true');
  } else {
    // Remove dark mode styles
    const style = document.getElementById('dark-mode-styles');
    if (style) {
      style.remove();
    }
    document.documentElement.removeAttribute('data-dark-mode');
  }
  
  // Save the state
  chrome.storage.local.set({ darkModeEnabled: enabled });
}

// Check if dark mode should be enabled when the page loads
chrome.storage.local.get(['darkModeEnabled'], (result) => {
  if (result.darkModeEnabled) {
    toggleDarkMode(true);
  }
});
