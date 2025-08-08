document.addEventListener('DOMContentLoaded', () => {
  console.log('ML page: DOM loaded, starting component fetch...');
  
  Promise.all([
    fetch('components/header.html').then(r => {
      console.log('Header fetch response:', r.status);
      return r.text();
    }),
    fetch('components/ml-skill.html').then(r => {
      console.log('ML skill fetch response:', r.status);
      return r.text();
    }),
    fetch('components/footer.html').then(r => {
      console.log('Footer fetch response:', r.status);
      return r.text();
    })
  ]).then(([headerHTML, skillsHTML, footerHTML]) => {
    console.log('All components fetched successfully');
    console.log('Header HTML length:', headerHTML.length);
    
    // Insert components
    const headerDiv = document.getElementById('header');
    const skillDiv = document.getElementById('power-skill');
    const footerDiv = document.getElementById('footer');
    
    console.log('Header div found:', !!headerDiv);
    console.log('Skill div found:', !!skillDiv);
    console.log('Footer div found:', !!footerDiv);
    
    if (headerDiv) headerDiv.innerHTML = headerHTML;
    if (skillDiv) skillDiv.innerHTML = skillsHTML;
    if (footerDiv) footerDiv.innerHTML = footerHTML;

    // Add CSS
    const addCSS = (href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
        console.log('Added CSS:', href);
      }
    };

    addCSS('assets/css/header.css');
    addCSS('assets/css/ml-skill.css');
    addCSS('assets/css/footer.css');

    // Wait a moment for CSS to load, then initialize
    setTimeout(() => {
      console.log('Attempting to initialize hamburger...');
      initializeHamburger();
    }, 200);

    // Smooth Scroll
    setTimeout(() => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }, 300);

  }).catch(err => {
    console.error('Component Load Failed:', err);
  });

  // Hamburger functionality
  function initializeHamburger() {
    console.log('initializeHamburger called');
    
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    console.log('Hamburger element:', hamburger);
    console.log('Mobile nav element:', mobileNav);
    console.log('Hamburger exists:', !!hamburger);
    console.log('Mobile nav exists:', !!mobileNav);

    if (!hamburger || !mobileNav) {
      console.error('Hamburger or mobile nav elements not found');
      console.log('Available elements with IDs:');
      document.querySelectorAll('[id]').forEach(el => {
        console.log('- ID:', el.id, 'Tag:', el.tagName);
      });
      
      // Try again after more delay
      setTimeout(() => {
        console.log('Retrying hamburger initialization...');
        initializeHamburger();
      }, 1000);
      return;
    }

    console.log('Hamburger initialized successfully!');

    // Remove any existing listeners to prevent duplicates
    hamburger.removeEventListener('click', hamburgerClickHandler);
    
    // Toggle mobile menu
    function hamburgerClickHandler(e) {
      console.log('Hamburger clicked!');
      e.preventDefault();
      e.stopPropagation();
      
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      console.log('Current expanded state:', isExpanded);
      
      // Toggle attributes and classes
      hamburger.setAttribute('aria-expanded', String(!isExpanded));
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      console.log('After toggle - hamburger active:', hamburger.classList.contains('active'));
      console.log('After toggle - mobile nav active:', mobileNav.classList.contains('active'));
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';
    }
    
    hamburger.addEventListener('click', hamburgerClickHandler);

    // Close menu when clicking on nav links
    const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
    console.log('Found mobile nav links:', mobileNavLinks.length);
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        console.log('Mobile nav link clicked, closing menu');
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
      console.log('Closing menu');
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = 'auto';
    }
  }
});