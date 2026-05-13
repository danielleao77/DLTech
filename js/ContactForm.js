/**
 * Classe ContactForm
 * Gerencia a validação e o envio do formulário de contato.
 */
export class ContactForm {
    constructor() {
        this.form = document.querySelector('form');
        this.submitBtn = this.form ? this.form.querySelector('button[type="submit"]') : null;
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Simulação de envio
        if (this.submitBtn) {
            const originalText = this.submitBtn.innerHTML;
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = 'Sending...';

            try {
                console.log('Enviando dados do formulário:', data);
                
                // Simula um delay de rede
                await new Promise(resolve => setTimeout(resolve, 1500));

                alert('Thank you! Your message has been sent successfully.');
                this.form.reset();
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                alert('Oops! Something went wrong. Please try again later.');
            } finally {
                this.submitBtn.disabled = false;
                this.submitBtn.innerHTML = originalText;
            }
        }
    }
}
