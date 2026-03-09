# XGYM - Design System & Documentação DEV

## Visão Geral

Este documento centraliza os **design tokens**, **diretrizes visuais** e **componentes-base** para a construção das landing pages e interfaces da XGYM.

O sistema segue uma direção **dark mode**, com aparência **premium**, **exclusiva** e orientada a **performance e resultado**. A cor de destaque oficial é o **amarelo/dourado**, usada para ações primárias, estados de foco e elementos de destaque.

Este arquivo foi consolidado a partir da documentação-base de desenvolvimento da XGYM e deve ser tratado como referência de implementação.

## Direção da Marca

- Posicionamento visual: premium, forte, técnico e exclusivo
- Base cromática: fundos escuros com contraste alto
- Cor de destaque: amarelo/dourado
- Tipografia: Montserrat
- Linguagem de interface: objetiva, confiante e orientada à conversão
- Títulos: preferencialmente em `uppercase`

## 1. Setup Global

Todo o projeto deve importar a fonte **Montserrat** do Google Fonts e declarar os tokens abaixo na raiz do CSS.

Regra obrigatória:

- Não usar cores hardcoded quando existir uma variável correspondente no design system.

### Import da Fonte

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&display=swap');
```

### Design Tokens

```css
:root {
    --primary-color: #ffb800;
    --primary-hover: #e6a600;
    --bg-dark: #0a0a0a;
    --bg-card: #161616;
    --bg-card-hover: #1e1e1e;
    --border-color: #2a2a2a;
    --text-light: #ffffff;
    --text-muted: #a0a0a0;

    /* Espaçamentos e Estrutura */
    --space-xs: 8px;
    --space-sm: 16px;
    --space-md: 24px;
    --space-lg: 32px;
    --space-xl: 48px;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;

    /* Sombras e Efeitos */
    --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 10px 20px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 0 15px rgba(255, 184, 0, 0.3);
    --transition: all 0.3s ease;

    /* Tipografia Base */
    --font-main: 'Montserrat', sans-serif;
}

body {
    font-family: var(--font-main);
    background-color: var(--bg-dark);
    color: var(--text-light);
    line-height: 1.6;
}
```

## 2. Logo e Marca

O logotipo deve ser carregado preferencialmente em `.webp` ou `.svg`.

### Asset oficial

- Logo para fundo escuro: [https://xgymct.com.br/wp-content/uploads/2025/03/Logo-xgym1.webp](https://xgymct.com.br/wp-content/uploads/2025/03/Logo-xgym1.webp)

### Boas práticas

- Preferir versões com transparência
- Manter boa área de respiro ao redor da marca
- Evitar aplicar sombras exageradas no logo
- Em superfícies escuras, usar a versão oficial clara

## 3. Cores

### Paleta principal

- `--primary-color`: `#ffb800`
- `--primary-hover`: `#e6a600`
- `--bg-dark`: `#0a0a0a`
- `--bg-card`: `#161616`
- `--bg-card-hover`: `#1e1e1e`
- `--border-color`: `#2a2a2a`
- `--text-light`: `#ffffff`
- `--text-muted`: `#a0a0a0`

### Regras

- O dourado deve ser reservado para destaque, conversão, ícones e estados de foco
- Os fundos devem manter contraste suficiente com os textos
- Cards e superfícies elevadas devem usar `--bg-card` e `--bg-card-hover`

## 4. Espaçamento e Sombras

### Espaçamentos

- `--space-xs`: `8px`
- `--space-sm`: `16px`
- `--space-md`: `24px`
- `--space-lg`: `32px`
- `--space-xl`: `48px`

### Raios

- `--radius-sm`: `4px`
- `--radius-md`: `8px`
- `--radius-lg`: `16px`

### Sombras

- `--shadow-sm`: `0 4px 6px rgba(0, 0, 0, 0.3)`
- `--shadow-md`: `0 10px 20px rgba(0, 0, 0, 0.5)`
- `--shadow-glow`: `0 0 15px rgba(255, 184, 0, 0.3)`

## 5. Tipografia

A tipografia principal da XGYM deve transmitir força, presença e clareza.

### Regras

- Títulos em `uppercase`
- Peso visual forte em headings
- Textos auxiliares com contraste reduzido usando `--text-muted`

### Classes base

```css
.h1, .h2, .h3 {
    text-transform: uppercase;
    font-weight: 800;
    line-height: 1.2;
    font-family: var(--font-main);
    color: var(--text-light);
}

.h1 { font-size: 3rem; }
.h2 { font-size: 2.5rem; }
.h3 { font-size: 1.5rem; }

.body-text {
    font-weight: 400;
    color: var(--text-light);
    line-height: 1.6;
}

.subtitle-text {
    font-weight: 600;
    color: var(--text-muted);
}
```

## 6. Iconografia (SVG)

A iconografia base deve ser simples, geométrica e preferencialmente em SVG inline usando `currentColor`.

### Diretrizes

- Preferir SVG inline em vez de imagens rasterizadas
- Ícones de ação podem herdar `var(--primary-color)`
- Para listas e benefícios, usar check icons com traço consistente

### Exemplo SVG

```html
<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="24"
    height="24"
>
    <polyline points="20 6 9 17 4 12"></polyline>
</svg>
```

## 7. Botões (CTAs)

Existem duas hierarquias de botões:

- `btn-primary`: ação principal e foco de conversão
- `btn-secondary`: ação de apoio ou navegação

### Exemplo HTML

```html
<button class="btn btn-primary">Agendar Experiência</button>
<button class="btn btn-secondary">Conhecer Planos</button>
```

### CSS

```css
.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: var(--transition);
    font-family: var(--font-main);
    text-decoration: none;
    border: none;
}

.btn-primary {
    background-color: var(--primary-color);
    color: var(--bg-dark);
}

.btn-primary:hover {
    background-color: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.btn-secondary {
    background-color: transparent;
    color: var(--text-light);
    border: 2px solid var(--border-color);
}

.btn-secondary:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}
```

## 8. Formulários

Os campos de formulário devem manter o padrão escuro da interface e aplicar glow dourado no estado de foco.

### Exemplo HTML

```html
<div class="form-group">
    <label class="form-label">Nome Completo</label>
    <input type="text" class="form-control" placeholder="Insira o seu nome">
</div>
```

### CSS

```css
.form-group {
    margin-bottom: var(--space-md);
    display: flex;
    flex-direction: column;
    max-width: 400px;
}

.form-label {
    color: var(--text-light);
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: var(--space-xs);
    font-family: var(--font-main);
}

.form-control {
    background-color: var(--bg-dark);
    border: 1px solid var(--border-color);
    color: var(--text-light);
    padding: 14px 16px;
    border-radius: var(--radius-md);
    font-family: var(--font-main);
    font-size: 1rem;
    transition: var(--transition);
}

.form-control:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: var(--shadow-glow);
}

.form-control::placeholder {
    color: #555;
}
```

## 9. Badges

Badges servem para destacar planos, recomendações ou avisos importantes.

### Exemplo HTML

```html
<span class="badge badge-primary">Recomendado</span>
<span class="badge badge-dark">Esgotado</span>
```

### CSS

```css
.badge {
    display: inline-flex;
    padding: 6px 16px;
    font-weight: 800;
    font-size: 0.8rem;
    border-radius: 30px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.badge-primary {
    background-color: var(--primary-color);
    color: var(--bg-dark);
}

.badge-dark {
    background-color: var(--bg-dark);
    color: var(--text-light);
    border: 1px solid var(--border-color);
}
```

## 10. Cartões de Serviço (Features)

Os cards de serviço apresentam programas, diferenciais e blocos de conteúdo institucional.

### Exemplo HTML

```html
<div class="card">
    <h3>Plano Musculação</h3>
    <p>Avaliação física, anamnese e periodização.</p>
</div>
```

### CSS

```css
.card {
    background-color: var(--bg-card);
    padding: 40px 30px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    transition: var(--transition);
}

.card:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
    background-color: var(--bg-card-hover);
}

.card h3 {
    color: var(--primary-color);
    margin-bottom: 16px;
    font-size: 1.25rem;
    text-transform: uppercase;
    font-weight: 800;
}

.card p {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.7;
}
```

## 11. Cartões de Preço (Pricing)

O card intermediário deve receber obrigatoriamente a classe `recommended` para funcionar como âncora visual da oferta.

### Exemplo HTML

```html
<div class="pricing-card recommended">
    <div class="badge-recommended">Recomendado</div>
    <h3>Até 4 Alunos</h3>
    <div class="price">R$ 600<span>por mês</span></div>
    <ul class="features-list">
        <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="18" height="18">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Avaliação Física
        </li>
    </ul>
    <button class="btn btn-primary" style="width: 100%;">Tenho interesse</button>
</div>
```

### CSS

```css
.pricing-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 48px 32px;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
}

.pricing-card.recommended {
    border: 2px solid var(--primary-color);
    background: linear-gradient(180deg, #161616 0%, #221c0b 100%);
    transform: scale(1.05);
}

.badge-recommended {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--primary-color);
    color: var(--bg-dark);
    padding: 6px 20px;
    font-weight: 800;
    font-size: 0.85rem;
    border-radius: 30px;
    text-transform: uppercase;
}

.pricing-card h3 {
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: var(--text-light);
    text-transform: uppercase;
    font-weight: 800;
}

.pricing-card .price {
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--primary-color);
    margin: 24px 0;
    line-height: 1;
}

.pricing-card .price span {
    display: block;
    font-size: 1rem;
    color: var(--text-muted);
    font-weight: 600;
    margin-top: 8px;
    text-transform: uppercase;
}

.features-list {
    list-style: none;
    margin-bottom: 40px;
    text-align: left;
}

.features-list li {
    margin-bottom: 16px;
    display: flex;
    align-items: flex-start;
    color: var(--text-light);
    font-size: 0.95rem;
}

.features-list li svg {
    color: var(--primary-color);
    min-width: 20px;
    margin-right: 12px;
    margin-top: 2px;
}
```

## 12. Acordeão (FAQ)

O componente de FAQ deve ser simples, responsivo e com estado visual claro para itens abertos.

### Exemplo HTML

```html
<div class="accordion-item">
    <button class="accordion-header active">
        Como funciona? <span class="accordion-icon">+</span>
    </button>
    <div class="accordion-content open">
        <p>Resposta da pergunta aqui.</p>
    </div>
</div>
```

### CSS

```css
.accordion-item {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-bottom: 16px;
}

.accordion-header {
    width: 100%;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    color: var(--text-light);
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    font-family: var(--font-main);
}

.accordion-icon {
    color: var(--primary-color);
    font-size: 1.5rem;
    line-height: 1;
    transition: transform 0.3s ease;
}

.accordion-header.active .accordion-icon {
    transform: rotate(45deg);
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
    background-color: rgba(0, 0, 0, 0.2);
}

.accordion-content.open {
    max-height: 500px;
}

.accordion-content p {
    padding: 0 24px 24px 24px;
    color: var(--text-muted);
    line-height: 1.7;
}
```

## 13. Depoimentos em Vídeo

Os depoimentos em vídeo devem ter aparência premium e interação clara, com hover indicando reprodução.

### Exemplo HTML

```html
<div class="video-thumbnail" style="background-image: url('URL_DA_IMAGEM_AQUI');">
    <div class="video-overlay">
        <div class="play-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" style="margin-left: 4px;">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
        </div>
    </div>
</div>
```

### CSS

```css
.video-thumbnail {
    position: relative;
    width: 100%;
    max-width: 250px;
    aspect-ratio: 9 / 16;
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    background-color: #222;
    background-size: cover;
    background-position: center;
    transition: var(--transition);
}

.video-thumbnail:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
}

.video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

.video-thumbnail:hover .video-overlay {
    background: rgba(0, 0, 0, 0.2);
}

.play-btn {
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    border: 2px solid #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: var(--transition);
}

.video-thumbnail:hover .play-btn {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--bg-dark);
    transform: scale(1.1);
}
```

## 14. WhatsApp Flutuante (FAB)

O botão de WhatsApp deve permanecer fixo no canto inferior direito da tela, sempre visível e com animação de pulso.

### Exemplo HTML

```html
<a href="https://wa.me/5511994045454" class="fab-whatsapp" target="_blank">
    <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
        <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.124.551 4.192 1.597 6.014L.203 24l6.096-1.597C8.106 23.332 10.046 23.86 12.031 23.86c6.648 0 12.031-5.383 12.031-12.031S18.679 0 12.031 0zm0 21.84c-1.782 0-3.527-.478-5.056-1.385l-.362-.214-3.754.985.998-3.662-.235-.374a9.96 9.96 0 0 1-1.545-5.368c0-5.523 4.493-10.016 10.016-10.016 5.522 0 10.015 4.493 10.015 10.016 0 5.523-4.493 10.016-10.015 10.016zm5.5-7.514c-.302-.151-1.782-.88-2.059-.981-.277-.101-.478-.151-.68.151-.201.302-.78 1.006-.956 1.208-.176.201-.352.226-.654.075-1.583-.787-2.651-1.371-3.655-2.613-.257-.319.255-.296.843-1.465.075-.151.038-.277-.019-.378-.057-.101-.68-1.637-.932-2.241-.246-.59-.495-.51-.68-.52h-.578c-.201 0-.528.075-.805.378-.277.302-1.057 1.031-1.057 2.515 0 1.484 1.082 2.918 1.233 3.119.151.201 2.125 3.245 5.145 4.549.719.31 1.28.495 1.717.634.721.229 1.378.196 1.895.119.578-.086 1.782-.729 2.033-1.433.252-.704.252-1.308.176-1.433-.075-.126-.277-.201-.578-.352z"></path>
    </svg>
</a>
```

### CSS

```css
.fab-whatsapp {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: #25D366;
    color: #fff;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(37, 211, 102, 0.4);
    text-decoration: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
    transition: transform 0.3s ease;
}

.fab-whatsapp:hover {
    transform: scale(1.1);
}

.fab-whatsapp::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #25D366;
    border-radius: 50%;
    z-index: -1;
    animation: pulse-whatsapp 2s infinite;
}

@keyframes pulse-whatsapp {
    0% {
        transform: scale(1);
        opacity: 0.8;
    }

    100% {
        transform: scale(1.6);
        opacity: 0;
    }
}
```

## 15. Princípios de Implementação

### Consistência

- Usar sempre os tokens declarados em `:root`
- Respeitar a hierarquia visual entre fundo, conteúdo e destaque
- Manter a cor primária reservada para pontos de atenção e conversão

### Acessibilidade

- Garantir contraste adequado entre texto e fundo
- Manter áreas clicáveis confortáveis em botões e FABs
- Preservar estados de foco visíveis em campos e ações principais

### Responsividade

- Evitar títulos excessivamente longos em mobile
- Garantir espaçamento vertical consistente entre seções
- Ajustar grids de cards e pricing sem quebrar a hierarquia do destaque central

## 16. Checklist de Uso

- Fonte Montserrat importada globalmente
- Tokens declarados no `:root`
- Sem cores soltas fora das variáveis oficiais
- Títulos principais em `uppercase`
- Ícones preferencialmente em SVG inline
- CTA principal usando `btn-primary`
- Card de preço principal usando `.recommended`
- Inputs com estado de `focus` dourado
- FAB do WhatsApp fixo no canto inferior direito
