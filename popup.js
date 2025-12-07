document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('darkModeToggle');
  const status = document.getElementById('status');

  // Load the current state
  chrome.storage.local.get(['darkModeEnabled'], function(result) {
    const isEnabled = result.darkModeEnabled || false;
    toggle.checked = isEnabled;
    status.textContent = isEnabled ? 'On' : 'Off';
    
    // Toggle dark mode class on the popup
    document.body.classList.toggle('dark-mode', isEnabled);
  });

  // Toggle dark mode when switch is clicked
  toggle.addEventListener('change', function() {
    const isEnabled = this.checked;
    status.textContent = isEnabled ? 'On' : 'Off';
    
    // Toggle dark mode class on the popup
    document.body.classList.toggle('dark-mode', isEnabled);
    
    // Save the state and send message to content script
    chrome.storage.local.set({ darkModeEnabled: isEnabled }, function() {
      // Send message to the active tab
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleDarkMode',
          enabled: isEnabled
        });
      });
    });
  });
});
