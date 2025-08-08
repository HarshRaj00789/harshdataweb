document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    fetch('components/header.html').then(r => r.text()),
    fetch('components/skills-section.html').then(r => r.text()),
    fetch('components/stats.html').then(r => r.text()),
    fetch('components/footer.html').then(r => r.text())
  ]).then(([headerHTML, skillsHTML, statsHTML, footerHTML]) => {
    document.getElementById('header').innerHTML = headerHTML;
    document.getElementById('skills-section').innerHTML = skillsHTML;
    document.getElementById('stats-section').innerHTML = statsHTML;
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
    addCSS('assets/css/skills-section.css');
    addCSS('assets/css/stats.css');
    addCSS('assets/css/footer.css');
  });
});
// Add this to your assets/main.js file

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for header content to load if it's being loaded dynamically
    setTimeout(initializeHamburger, 100);
    
    function initializeHamburger() {
        const hamburger = document.getElementById('hamburger');
        const mobileNav = document.getElementById('mobileNav');

        if (!hamburger || !mobileNav) {
            console.error('Hamburger or mobile nav elements not found');
            // Try again after a longer delay
            setTimeout(initializeHamburger, 500);
            return;
        }

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});