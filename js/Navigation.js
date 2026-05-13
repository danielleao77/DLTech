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
            const isMobileLink = link.closest('[data-mobile-menu]');
            let href = link.getAttribute('href') || '';
            href = href.replace('.html', '');

            link.classList.remove('text-primary', 'dark:text-primary-fixed', 'font-semibold', 'border-b-2', 'border-primary');
            link.classList.add('text-secondary', 'dark:text-secondary-fixed');

            if (href === normalizedPath || (normalizedPath === 'index' && href === 'index')) {
                link.classList.add('text-primary', 'dark:text-primary-fixed', 'font-semibold');
                link.classList.remove('text-secondary', 'dark:text-secondary-fixed');
                
                // Só adiciona a borda se NÃO for link do menu mobile
                if (!isMobileLink) {
                    link.classList.add('border-b-2', 'border-primary');
                }
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.mobileMenu.classList.add('active');
            this.menuToggle.classList.add('active');
            this.menuToggle.querySelector('span').textContent = 'close';
            document.body.classList.add('menu-open');
            this.header.classList.add('bg-transparent');
            this.header.classList.remove('backdrop-blur-md', 'bg-surface/80', 'dark:bg-surface-dim/80');
        } else {
            this.mobileMenu.classList.remove('active');
            this.menuToggle.classList.remove('active');
            this.menuToggle.querySelector('span').textContent = 'menu';
            document.body.classList.remove('menu-open');
            this.header.classList.remove('bg-transparent');
            this.handleScroll();
            
            // Pequeno delay apenas para restaurar o blur do header após o menu sair
            setTimeout(() => {
                if (!this.isOpen) {
                    this.header.classList.add('backdrop-blur-md');
                }
            }, 400);
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
