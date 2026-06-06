---
trigger: always_on
glob: "*"
description: Regras de estilo de código e desenvolvimento para o projeto DLTech
---

# Regras do Projeto DLTech

Sempre siga estas diretrizes ao interagir com este repositório ou propor alterações:

## 1. Comunicação e Instruções
- **Idioma**: Sempre fale comigo em português do Brasil.
- **Instruções Git**: Sempre me forneça os comandos do git para subir as alterações (ex: `git add .`, `git commit -m "mensagem"`, `git push`) formatados em blocos de comando bash.

## 2. Restrições Técnicas de Hospedagem (GitHub Pages)
- **Apenas Estático**: O projeto está hospedado no GitHub Pages. Não é permitido o uso de linguagens server-side como PHP, Python, ASP.NET ou .NET.
- **Processamento no Cliente**: Toda a lógica dinâmica deve ser executada no lado do cliente (client-side) utilizando HTML5, CSS3 e JavaScript.

## 3. Padrões de Código
- **JavaScript Orientado a Objetos (OO)**: Evite funções e scripts globais dispersos. Toda funcionalidade interativa ou lógica de negócio deve ser encapsulada em classes JavaScript instanciáveis que gerenciam seus próprios estados e ciclos de vida.
- **CSS e Tailwind CSS**: O projeto utiliza Tailwind CSS. Sempre que fizer alterações de estilo, certifique-se de compilar os assets usando o comando `npm run build` para gerar o arquivo final compilado (`css/main.css`). Evite inserir estilos inline arbitrários se puder utilizar classes utilitárias ou o arquivo de estilos centralizado.
- **Caminhos Relativos**: Utilize caminhos de recursos (imagens, scripts, CSS) relativos ou compatíveis com a estrutura do GitHub Pages para garantir que os links não quebrem ao fazer o deploy em subdiretórios.

## 4. Otimização e Performance
- **Otimização de Imagens**: Novas imagens devem ser otimizadas ou convertidas para formatos modernos de alta compressão (como WebP) antes de serem adicionadas, garantindo um carregamento rápido no GitHub Pages.
- **Semântica HTML e SEO**: Mantenha o uso de tags semânticas (como `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) e garanta que as meta tags de acessibilidade (ARIA) e SEO/Open Graph estejam sempre atualizadas.
