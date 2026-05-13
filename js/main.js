import { Navigation } from './Navigation.js';
import { ContactForm } from './ContactForm.js';

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
        // Inicializa a navegação em todas as páginas
        this.components.navigation = new Navigation();

        // Inicializa o formulário apenas se estiver na página de contato
        if (document.querySelector('form')) {
            this.components.contactForm = new ContactForm();
        }

        console.log('DL Tech App inicializado');
    }
}

// Instancia o App quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
