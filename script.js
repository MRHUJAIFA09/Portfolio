// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Initialize contact section background
  if (typeof createAnimatedBackground === 'function') {
    createAnimatedBackground();
  }
  
  // Check for saved theme preference or use preferred color scheme
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('darkMode');
  
  // Apply saved theme or preferred color scheme
  if (savedTheme === 'enabled' || (!savedTheme && prefersDarkMode)) {
    body.classList.add('dark-mode');
  }
  
  // Toggle theme when button is clicked
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function(e) {
      // Prevent default button behavior
      e.preventDefault();
      
      // Add ripple effect
      if (typeof createRipple === 'function') {
        createRipple(e, darkModeToggle);
      }
      
      // Add animation class
      darkModeToggle.classList.add('animate-toggle');
      
      // Toggle dark mode with a slight delay for effect
      setTimeout(() => {
        // Toggle the dark mode class
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
          localStorage.setItem('darkMode', 'enabled');
          console.log('Dark mode enabled and saved');
        } else {
          localStorage.setItem('darkMode', 'disabled');
          console.log('Dark mode disabled and saved');
        }
        
        // Remove animation class after completion
        setTimeout(() => {
          darkModeToggle.classList.remove('animate-toggle');
        }, 700);
        
        // Update animated background
        if (typeof createAnimatedBackground === 'function') {
          createAnimatedBackground();
        }
        
        // Update interactive elements
        if (typeof updateInteractiveElements === 'function') {
          updateInteractiveElements();
        }
      }, 200);
    });
  } else {
    console.error('Dark mode toggle button not found');
  }
  
  // Mobile Menu Functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-left');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      // Toggle the active class on both the button and menu
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // For accessibility - update aria attributes
      const isExpanded = mobileMenuBtn.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking a navigation link
    const navItems = document.querySelectorAll('.nav-left a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnMenuBtn && navLinks.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
});

// Typewriter effect
document.addEventListener('DOMContentLoaded', function() {
  const typewriterText = document.querySelector('.typewriter-text');
  if (!typewriterText) return;
  
  const fullText = "Hujaifa Shaikh";
  let i = 0;
  let typingSpeed = 150; // Milliseconds between characters
  let deletingSpeed = 75; // Faster when deleting
  let pauseDelay = 1500; // Pause at full text
  
  function typeWriter() {
    // If text is incomplete, keep typing
    if (i < fullText.length) {
      typewriterText.textContent += fullText.charAt(i);
      i++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      // Pause at the end of typing
      setTimeout(eraseText, pauseDelay);
    }
  }
  
  function eraseText() {
    // Erase text letter by letter
    if (i > 0) {
      typewriterText.textContent = fullText.substring(0, i - 1);
      i--;
      setTimeout(eraseText, deletingSpeed);
    } else {
      // After erasing, start typing again
      setTimeout(typeWriter, typingSpeed);
    }
  }
  
  // Start the typewriter effect
  setTimeout(typeWriter, 1000); // Initial delay
});

// Infinite marquee animation for tech logos
document.addEventListener('DOMContentLoaded', function() {
  const marqueeContent = document.querySelector('.marquee-content');
  
  if (marqueeContent) {
    // Adjust animation speed based on screen width
    function updateMarqueeSpeed() {
      const viewportWidth = window.innerWidth;
      const baseSpeed = 20; // seconds for one full cycle
      
      // Smaller screens get faster animation
      let speedAdjustment = baseSpeed;
      if (viewportWidth < 768) {
        speedAdjustment = baseSpeed * 0.7;
      } else if (viewportWidth > 1440) {
        speedAdjustment = baseSpeed * 1.3;
      }
      
      marqueeContent.style.animationDuration = `${speedAdjustment}s`;
    }
    
    // Initial speed setting
    updateMarqueeSpeed();
    
    // Update speed on window resize
    window.addEventListener('resize', updateMarqueeSpeed);
  }
});

// Create animated background elements for contact section only
function createAnimatedBackground() {
  const animatedBg = document.querySelector('.contact-section .animated-bg');
  if (!animatedBg) return;
  
  // Remove any existing spans
  animatedBg.innerHTML = '';
  
  // Create 15 animated floating elements
  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    const size = Math.random() * 30 + 10; // Random size between 10px and 40px
    const posX = Math.random() * 100; // Random X position
    const delay = Math.random() * 15; // Random delay up to 15s
    const duration = Math.random() * 15 + 20; // Random duration between 20s and 35s
    
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${posX}%`;
    span.style.animationDelay = `${delay}s`;
    span.style.animationDuration = `${duration}s`;
    span.style.opacity = Math.random() * 0.5 + 0.1; // Random opacity between 0.1 and 0.6
    
    animatedBg.appendChild(span);
  }
}

// Reapply animated backgrounds on window resize
window.addEventListener('resize', function() {
  createAnimatedBackground();
});

// Create ripple effect on click
function createRipple(event, element) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  
  const rect = element.getBoundingClientRect();
  
  // Calculate position relative to the button
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  
  element.appendChild(ripple);
  
  // Remove ripple after animation completes
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Apply hover effects to tech logos in dark mode
const techLogos = document.querySelectorAll('.tech-logo');

techLogos.forEach(logo => {
  logo.addEventListener('mouseenter', () => {
    if (body.classList.contains('dark-mode')) {
      logo.classList.add('glow-effect');
    }
  });
  
  logo.addEventListener('mouseleave', () => {
    logo.classList.remove('glow-effect');
  });
});

// Apply interactive effects to other elements
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth transitions when switching modes
  const projectCards = document.querySelectorAll('.project-card');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-links button');
  const socialIcons = document.querySelectorAll('.social-icon');
  
  // Ensure all elements have proper transition classes when dark mode changes
  function updateInteractiveElements() {
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Apply different interactions based on the theme
    [projectCards, navLinks, socialIcons].forEach(elements => {
      elements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
      });
    });
  }
  
  // Call on initial load and when theme changes
  updateInteractiveElements();
  darkModeToggle.addEventListener('click', updateInteractiveElements);
});
