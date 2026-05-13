/**
 * Classe Navigation
 * Gerencia a interatividade do menu mobile e efeitos do cabeçalho.
 */
export class Navigation {
    constructor() {
        this.menuToggle = document.querySelector('[data-menu-toggle]');
        this.mobileMenu = document.querySelector('[data-mobile-menu]');
        this.header = document.querySelector('nav, header');
        this.isOpen = false;

        this.init();
    }

    init() {
        if (this.menuToggle && this.mobileMenu) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll(); // Check initial scroll position
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.mobileMenu.classList.remove('hidden');
            this.mobileMenu.classList.add('flex');
            document.body.style.overflow = 'hidden';
            this.menuToggle.innerHTML = '<span class="material-symbols-outlined">close</span>';
        } else {
            this.mobileMenu.classList.add('hidden');
            this.mobileMenu.classList.remove('flex');
            document.body.style.overflow = '';
            this.menuToggle.innerHTML = '<span class="material-symbols-outlined">menu</span>';
        }
    }

    handleScroll() {
        if (window.scrollY > 20) {
            this.header.classList.add('shadow-md', 'bg-surface/95', 'dark:bg-surface-dim/95');
            this.header.classList.remove('bg-surface/80', 'dark:bg-surface-dim/80');
        } else {
            this.header.classList.remove('shadow-md', 'bg-surface/95', 'dark:bg-surface-dim/95');
            this.header.classList.add('bg-surface/80', 'dark:bg-surface-dim/80');
        }
    }
}
