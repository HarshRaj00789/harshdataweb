document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    fetch('components/header.html').then(r => r.text()),
    fetch('components/power-skill.html').then(r => r.text()),
    fetch('components/footer.html').then(r => r.text())
  ]).then(([headerHTML, skillsHTML, footerHTML]) => {
    document.getElementById('header').innerHTML = headerHTML;
    document.getElementById('power-skill').innerHTML = skillsHTML;
    document.getElementById('footer').innerHTML = footerHTML;

    const addCSS = (href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    };

    addCSS('assets/css/header.css');
    addCSS('assets/css/power-skill.css');
    addCSS('assets/css/footer.css');

    // Initialize hamburger AFTER all components are loaded
    initializeHamburger();

    // Smooth Scroll AFTER components are loaded
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

  }).catch(err => {
    console.error('Component Load Failed:', err);
  });

  // Hamburger functionality
  function initializeHamburger() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (!hamburger || !mobileNav) {
      console.error('Hamburger or mobile nav elements not found');
      return;
    }

    console.log('Hamburger initialized successfully'); // Debug log

    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      
      // Toggle attributes and classes
      hamburger.setAttribute('aria-expanded', String(!isExpanded));
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';
    });

    // Close menu when clicking on nav links
    const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1023) {
        closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });

    function closeMenu() {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = 'auto';
    }
  }
});