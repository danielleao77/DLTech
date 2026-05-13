/**
 * Classe Router
 * Gerencia a navegação SPA (Single Page Application)
 */
export class Router {
    constructor(app) {
        this.app = app;
        this.contentContainer = document.getElementById('page-content');
        // Detecta a base do projeto (ex: /DLTech/)
        this.basePath = window.location.pathname.includes('/DLTech/') ? '/DLTech/' : '/';
        this.init();
    }

    init() {
        // Intercepta cliques em links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (this.shouldIntercept(link)) {
                e.preventDefault();
                let href = link.getAttribute('href');
                // Normaliza index.html para vazio para a home
                if (href === 'index.html' || href === 'index') href = '';
                this.navigateTo(href);
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
        // Remove .html da URL para exibição na barra de endereços
        const cleanUrl = url.replace('index.html', '').replace('.html', '');
        
        // Constrói a URL final respeitando o basePath
        const finalUrl = this.basePath + cleanUrl;
        
        window.history.pushState({}, '', finalUrl);
        await this.loadPage(cleanUrl || 'index');
    }

    async loadPage(url) {
        // Normaliza a URL para encontrar o arquivo .html correspondente
        let targetUrl = url;
        
        // Se for a raiz ou vazio, vai para index.html
        if (url === '/' || url === '' || url.endsWith('/')) {
            targetUrl = 'index.html';
        } else if (!url.endsWith('.html')) {
            targetUrl = url + '.html';
        }

        // Remove a barra inicial se existir para o fetch ser relativo à pasta atual
        const fetchUrl = targetUrl.startsWith('/') ? targetUrl.substring(1) : targetUrl;

        try {
            // Efeito de saída
            this.contentContainer.classList.add('page-fade-out');
            await new Promise(r => setTimeout(r, 300));

            const response = await fetch(fetchUrl);
            if (!response.ok) throw new Error('Falha ao carregar página');
            
            const html = await response.text();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.getElementById('page-content');

            if (newContent) {
                this.contentContainer.innerHTML = newContent.innerHTML;
                document.title = doc.title;
                window.scrollTo(0, 0);

                this.contentContainer.classList.remove('page-fade-out');
                this.contentContainer.classList.add('page-fade-in');
                setTimeout(() => this.contentContainer.classList.remove('page-fade-in'), 400);

                // Notifica o App para reinicializar componentes e atualizar navegação
                this.app.onPageLoaded(targetUrl);
            }
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            window.location.href = url;
        }
    }
}
