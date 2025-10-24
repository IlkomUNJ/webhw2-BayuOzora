// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle flex display for mobile
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('hidden');
      navLinks.classList.add('flex', 'flex-col', 'absolute', 'top-20', 'right-4', 'bg-white', 'w-56', 'shadow-2xl', 'rounded-xl', 'p-4', 'z-[1000]', 'gap-0');
    } else {
      navLinks.classList.add('hidden');
      navLinks.classList.remove('flex', 'flex-col', 'absolute', 'top-20', 'right-4', 'bg-white', 'w-56', 'shadow-2xl', 'rounded-xl', 'p-4', 'z-[1000]', 'gap-0');
      // Restore desktop classes on larger screens
      if (window.innerWidth >= 768) {
        navLinks.classList.remove('hidden');
        navLinks.classList.add('flex');
      }
    }
  });
}

// Function to handle tab switching
function showTab(tabName) {
    // Hide all tab panels
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.classList.add('hidden');
    });

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.classList.remove('bg-white', 'text-gray-800', 'shadow-lg', '-translate-y-0.5');
        button.classList.add('text-gray-600');
    });

    // Show the selected tab panel
    const targetPanel = document.getElementById(tabName);
    if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.classList.remove('hidden');
    }
    
    // Add active class to the clicked button
    const activeButton = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active', 'bg-white', 'text-gray-800', 'shadow-lg', '-translate-y-0.5');
        activeButton.classList.remove('text-gray-600');
    }
}

// Initialize tabs - ensure first tab is active on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('description')) {
        showTab('description');
    }
});
