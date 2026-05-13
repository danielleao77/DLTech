import { Navigation } from './Navigation.js';
import { ContactForm } from './ContactForm.js';
import { Router } from './Router.js';

/**
 * App Class
 * Orquestra a inicialização dos componentes do site.
 */
class App {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Inicializa o roteador para navegação SPA
        this.router = new Router(this);

        // Inicializa a navegação em todas as páginas
        this.components.navigation = new Navigation();

        // Inicializa componentes específicos da página
        this.initComponents();

        console.log('DL Tech App inicializado');
    }

    /**
     * Inicializa componentes baseados nos elementos presentes no DOM
     */
    initComponents() {
        // Inicializa o formulário apenas se estiver na página de contato
        if (document.querySelector('form')) {
            this.components.contactForm = new ContactForm();
        } else {
            this.components.contactForm = null;
        }
    }

    /**
     * Chamado pelo Router sempre que uma nova página é carregada
     */
    onPageLoaded() {
        // Reinicializa componentes que dependem do novo conteúdo do DOM
        this.initComponents();
        
        // Se o menu mobile estava aberto, fecha ele
        if (this.components.navigation && this.components.navigation.isOpen) {
            this.components.navigation.toggleMenu();
        }
    }
}

// Instancia o App quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
