/**
 * Classe Router
 * Gerencia a navegação SPA (Single Page Application)
 */
export class Router {
    constructor(app) {
        this.app = app;
        this.contentContainer = document.getElementById('page-content');
        this.init();
    }

    init() {
        // Intercepta cliques em links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (this.shouldIntercept(link)) {
                e.preventDefault();
                this.navigateTo(link.getAttribute('href'));
            }
        });

        // Gerencia o botão "Voltar/Avançar" do navegador
        window.addEventListener('popstate', () => {
            this.loadPage(window.location.pathname);
        });
    }

    shouldIntercept(link) {
        if (!link) return false;
        const href = link.getAttribute('href');
        if (!href) return false;
        
        // Não intercepta links externos ou âncoras internas (#)
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return false;
        }

        return true;
    }

    async navigateTo(url) {
        window.history.pushState({}, '', url);
        await this.loadPage(url);
    }

    async loadPage(url) {
        // Se a URL estiver vazia ou for apenas '/', assume index
        const targetUrl = (url === '/' || url === '') ? 'index.html' : 
                         (url.endsWith('.html') ? url : `${url}.html`);

        try {
            // Efeito de saída
            this.contentContainer.classList.add('page-fade-out');
            await new Promise(r => setTimeout(r, 300));

            const response = await fetch(targetUrl);
            const html = await response.text();
            
            // Faz o parse do HTML recebido
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.getElementById('page-content');

            if (newContent) {
                // Atualiza o conteúdo
                this.contentContainer.innerHTML = newContent.innerHTML;
                
                // Atualiza o título da página
                document.title = doc.title;

                // Scroll para o topo
                window.scrollTo(0, 0);

                // Efeito de entrada
                this.contentContainer.classList.remove('page-fade-out');
                this.contentContainer.classList.add('page-fade-in');
                setTimeout(() => this.contentContainer.classList.remove('page-fade-in'), 400);

                // Notifica o App para reinicializar componentes
                this.app.onPageLoaded();
            }
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            // Fallback: recarrega a página normalmente se o fetch falhar
            window.location.href = url;
        }
    }
}
