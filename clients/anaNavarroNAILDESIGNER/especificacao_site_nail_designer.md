# Projeto: Website Premium - Nail Designer Studio

Este arquivo serve como instrução direta e briefing estruturado para a criação de uma Landing Page de alta conversão para um estúdio de Nail Design usando a IDE agentica.

---

## 🛠️ Configurações de Design (Diretrizes Taste-Skill)

Use os parâmetros abaixo para guiar o estilo visual do front-end, garantindo uma interface sofisticada, moderna e com alto nível de acabamento (evitando layouts genéricos de IA).

```yaml
SKILL: design-taste-frontend
VERSION: 2.0
DESIGN_VARIANCE: 6      # Layout assimétrico moderno para seções visuais como a galeria
MOTION_INTENSITY: 4     # Micro-interações e transições suaves ao rolar a página
VISUAL_DENSITY: 3       # Layout minimalista com bastante espaço em branco (whitespace)
SHAPE_CONSISTENCY: 8px  # Cantos suavemente arredondados em botões e cards

COLOR_THEME:
  name: "Luxury Soft"
  background: "#FAF6F0"   # Creme caloroso e sofisticado
  text_primary: "#1C1B19" # Grafite profundo (alta legibilidade)
  accent_color: "#C29B85" # Tom terracota/nude rosé para CTAs e destaques
  borders: "#EAE3D8"      # Linhas finas e discretas

TYPOGRAPHY:
  headings: "Playfair Display, serif" # Estilo elegante editorial
  body: "Inter, sans-serif"           # Estilo moderno e limpo
```

---

## 📐 Estrutura de Seções (Página Única / Landing Page)

### 1. Cabeçalho (Navbar)
- **Comportamento:** Fixo no topo (Sticky Navbar) com efeito de desfoque (`backdrop-filter: blur(10px)`).
- **Elementos:** Logo minimalista à esquerda e links de navegação à direita.
- **Links:** Início | Serviços | Galeria | Sobre Mim | Localização | Contato
- **CTA Secundário:** Botão discreto com a ação "Agendar Horário".

### 2. Seção Inicial (Hero Section)
- **Título principal:** Nome da Profissional / Nome do Studio (ex: *Juliana Silva • Nail Studio*).
- **Frase de Impacto:**
  > "Realce sua beleza com unhas perfeitas e duradouras."
- **CTA Principal:** Botão em destaque com animação suave de hover: `[ Agendar via WhatsApp ]`.
- **Imagem de Apoio:** Foto em alta resolução de um trabalho autoral em close (iluminação de estúdio, estética limpa).

### 3. Serviços e Especialidades
Apresentar em um grid limpo e espaçado. Cada bloco deve conter o título do serviço, uma descrição curta e elegante, e o preço inicial.
- **Alongamento em Gel:** Extensão duradoura com acabamento natural e perfeito.
- **Fibra de Vidro:** Máxima resistência e espessura ultrafina.
- **Banho de Gel:** Blindagem e brilho duradouro sobre o comprimento natural.
- **Manutenção:** Cuidado periódico para garantir a saúde e a estética do alongamento.
- **Esmaltação em Gel:** Cor impecável e brilho intenso por semanas sem descascar.
- **Nail Art:** Decorações personalizadas feitas à mão (do minimalista ao artístico).
- **Blindagem de Unhas:** Camada protetora ideal para unhas fracas ou quebradiças.

### 4. Galeria de Fotos (Portfólio)
- **Layout:** Grid assimétrico (estilo *Masonry* ou revista editorial) para dar dinamismo visual.
- **Filtros rápidos:** Botões clicáveis para filtrar por categorias: `[ Todas ]` `[ Alongamentos ]` `[ Nail Art ]` `[ Antes & Depois ]`.
- **Interação:** Efeito de zoom suave ao passar o mouse sobre as imagens.
- **Diferencial:** Um componente interativo deslizante (slider antes/depois) para exibir transformações de unhas roídas ou danificadas.

### 5. Depoimentos (Prova Social)
- **Formato:** Carrossel de cards flutuantes, sem bordas pesadas.
- **Exemplo de Conteúdo:**
  - ⭐⭐⭐⭐⭐ - *"Minhas unhas ficaram perfeitas e duraram muito! O ambiente é maravilhoso e o atendimento é impecável."* — Marina S.

### 6. Sobre Mim e Diferenciais
- **Layout:** Duas colunas (Foto profissional da especialista em ação vs. Texto biográfico).
- **Pontos a abordar:**
  - Experiência no mercado e paixão pela estética.
  - Certificações e cursos de especialização técnica.
  - **Diferenciais cruciais:** Foco em biossegurança (materiais 100% esterilizados e descartáveis) e atendimento humanizado.

### 7. Tabela de Preços (Menu de Valores)
- **Design:** Tabela minimalista com linhas finas.
- **Formato:** Nome do serviço à esquerda, linha pontilhada discreta e o preço à direita (ex: *A partir de R$ XX,XX*).
- **Aviso:** *"Valores base. Decorações complexas sob consulta."*

### 8. Promoções e Fidelidade
Exibir em blocos destacados com fundo levemente contrastante:
- **Boas-vindas:** Desconto especial na primeira aplicação.
- **Indique uma Amiga:** Bônus ou desconto na próxima manutenção para quem indicou e para a convidada.
- **Pacotes Mensais:** Assinatura ou planos recorrentes para manutenção e esmaltação.

### 9. Localização e Horários
- **Conteúdo:** Endereço físico completo, pontos de referência e mapa interativo integrado.
- **Botão de Ação:** `[ Abrir no Google Maps / Waze ]`.

### 10. Perguntas Frequentes (FAQ)
- **Formato:** Componente de acordeão dinâmico (abre e fecha suavemente).
- **Perguntas:**
  1. *Quanto tempo dura o alongamento?* (Média de 20 a 30 dias com os devidos cuidados).
  2. *Estraga a unha natural?* (Não, desde que a aplicação e a remoção sejam feitas por profissionais).
  3. *De quanto em quanto tempo faz manutenção?* (Recomendado entre 15 e 21 dias).
  4. *Posso escolher qualquer decoração?* (Sim, temos um catálogo completo e fazemos artes personalizadas).

---

## 🎯 Botões de Ação Principais (CTAs)

Garanta que estes botões sejam de fácil acesso no mobile (zona de alcance do polegar):
1. **WhatsApp:** Link direto para conversa com mensagem pré-definida: *"Olá! Vi o site e gostaria de agendar um horário."*
2. **Ver Instagram:** Link para o feed de portfólio atualizado.
3. **Pedir Orçamento:** Para designs personalizados ou eventos.
