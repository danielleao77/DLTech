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
        
        // Inicializa o link ativo com base na URL atual
        this.updateActiveLink(window.location.pathname);
    }

    updateActiveLink(path) {
        const links = document.querySelectorAll('nav a, [data-mobile-menu] a');
        
        // Normaliza o path: pega apenas o nome final (sem .html e sem barras)
        let normalizedPath = path.split('/').pop() || 'index';
        normalizedPath = normalizedPath.replace('.html', '');
        
        links.forEach(link => {
            let href = link.getAttribute('href') || '';
            href = href.replace('.html', ''); // Garantia extra

            link.classList.remove('text-primary', 'dark:text-primary-fixed', 'font-semibold', 'border-b-2', 'border-primary');
            link.classList.add('text-secondary', 'dark:text-secondary-fixed');

            if (href === normalizedPath || (normalizedPath === 'index' && href === 'index')) {
                link.classList.add('text-primary', 'dark:text-primary-fixed', 'font-semibold', 'border-b-2', 'border-primary');
                link.classList.remove('text-secondary', 'dark:text-secondary-fixed');
            }
        });
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
