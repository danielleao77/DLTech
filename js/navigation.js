/**
 * NavigationManager Class
 * Manages sticky navigation scroll behavior, section highlighting,
 * and mobile navigation overlay.
 */
export class NavigationManager {
  constructor() {
    this.header = document.getElementById('main-nav');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    this.navLinks = document.querySelectorAll('nav a, #mobile-nav-overlay a');
    this.sections = document.querySelectorAll('section[id]');
    
    this.isMobileMenuOpen = false;
    this.lastScrollY = window.scrollY;

    this.init();
  }

  init() {
    // Scroll events
    window.addEventListener('scroll', () => {
      this.handleHeaderScroll();
      this.highlightActiveSection();
    });

    // Mobile menu toggle
    if (this.mobileMenuBtn && this.mobileNavOverlay) {
      this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Smooth scrolling & active links handling
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e));
    });

    // Initial triggers
    this.handleHeaderScroll();
    this.highlightActiveSection();
  }

  handleHeaderScroll() {
    const currentScrollY = window.scrollY;

    // Header scroll background opacity and border
    if (currentScrollY > 50) {
      this.header.classList.add('bg-slate-950/80', 'border-b', 'border-slate-800/80', 'backdrop-blur-md');
      this.header.classList.remove('bg-transparent', 'border-transparent');
    } else {
      this.header.classList.remove('bg-slate-950/80', 'border-b', 'border-slate-800/80', 'backdrop-blur-md');
      this.header.classList.add('bg-transparent', 'border-transparent');
    }

    // Optional: Hide header on scroll down, show on scroll up
    if (currentScrollY > this.lastScrollY && currentScrollY > 150) {
      this.header.classList.add('-translate-y-full');
    } else {
      this.header.classList.remove('-translate-y-full');
    }
    this.lastScrollY = currentScrollY;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      this.mobileNavOverlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      
      // Animate hamburger to X
      const burgerLines = this.mobileMenuBtn.querySelectorAll('span');
      if (burgerLines.length >= 3) {
        burgerLines[0].classList.add('rotate-45', 'translate-y-2');
        burgerLines[1].classList.add('opacity-0');
        burgerLines[2].classList.add('-rotate-45', '-translate-y-2');
      }
    } else {
      this.mobileNavOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      
      // Animate X back to hamburger
      const burgerLines = this.mobileMenuBtn.querySelectorAll('span');
      if (burgerLines.length >= 3) {
        burgerLines[0].classList.remove('rotate-45', 'translate-y-2');
        burgerLines[1].classList.remove('opacity-0');
        burgerLines[2].classList.remove('-rotate-45', '-translate-y-2');
      }
    }
  }

  handleLinkClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    // Check if it's an internal anchor
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // If mobile menu is open, close it first
        if (this.isMobileMenuOpen) {
          this.toggleMobileMenu();
        }

        const headerHeight = this.header.offsetHeight;
        const targetOffset = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetOffset,
          behavior: 'smooth'
        });
      }
    }
  }

  highlightActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove('text-purple-400');
          link.classList.add('text-slate-400');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-purple-400');
            link.classList.remove('text-slate-400');
          }
        });
      }
    });
  }
}
