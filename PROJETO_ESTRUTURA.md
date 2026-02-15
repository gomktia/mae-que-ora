📜 Manual de Estrutura: Projeto "Mãe que Ora" (Premium)
1. Objetivo
Migração de WordPress/Elementor para Next.js + Tailwind CSS. O design deve seguir o padrão visual de alta conversão do modelo "Meu Terapeuta chamado Deus", focando em elegância, autoridade e paz.

2. Paleta de Cores (Baseada no Novo Modelo)
Primária (Autoridade): Azul Marinho Profundo (padrão de confiança espiritual).

Secundária (Elegância): Dourado Sóbrio (para destaques e divisores).

Fundo: Branco Puro ou Gelo (para máximo respiro e clareza).

Botões (Ação): Verde Vibrante #2ECC70 (padrão Kiwify/Conversão).

3. Arquitetura de Pastas e Arquivos
/public/assets
Colocar apenas o que será usado na nova página (extraído da pasta uploads):

logo-mae-que-ora-alta.png

foto-especialista.webp

depoimentos-grade.webp (fotos 05 e 06 da pasta uploads)

selos-seguranca-premium.png

/src/pages (Rotas do Funil)
index.js ou start.js: O Ponto de Entrada. Quiz de segmentação por dor (afastamento, rebeldia, proteção).

vsl.js: A Revelação. Página com vídeo Vturb e o script de delay de 130s.

oferta.js ou mqo1.js: A Landing Page Final. Onde está a oferta de R$ 67,00.

/src/components (Peças do Quebra-cabeça)
PrecoAncorado.js: Mostra o "De R$ 197 por apenas R$ 67".

BotaoCheckout.js: Botão pulsante com link da Kiwify.

AcordeaoFAQ.js: Dúvidas sobre o cronograma espiritual.

4. Scripts e Regras (O "Coração" da Venda)
Delay de 130 Segundos: O conteúdo de venda (botão e preço) só é montado após 130s de vídeo.

Ancoragem de Preço: Destaque para o parcelamento: 8x de R$ 9,83.

Mobile First: Prioridade total no ajuste para celular (iPhone/Android).

## 🎨 DIRETRIZES DE DESIGN PREMIUM (BASEADO NO MODELO HTML)

# IMPORTANTE: Descartar completamente o estilo visual do backup WordPress (Rosa/Lilás). 
# A cliente aprovou o design do modelo "Meu Terapeuta chamado Deus".

### 1. Paleta de Cores e Estética:
- **Background Principal:** Branco Neve ou Off-White bem leve para limpeza visual.
- **Seções de Destaque:** Azul Marinho Profundo (Passa autoridade, segurança e paz espiritual).
- **Acentos e Detalhes:** Dourado Sóbrio (Usar em divisores, ícones pequenos e palavras de poder).
- **Tipografia:** - Títulos: Serifada elegante (ex: 'Playfair Display') para um ar de "Escritura Sagrada/Mentoria".
  - Corpo: Sans-serif moderna (ex: 'Inter' ou 'Montserrat') para leitura leve no telemóvel.

### 2. Elementos de Conversão:
- **Botões:** Verde Vibrante (#2ECC70) com bordas levemente arredondadas e efeito de pulsação suave.
- **Cards:** Design "Clean" com bordas finas e sombras muito leves (Shadow-sm do Tailwind).
- **Imagens:** Devem ter bordas arredondadas e, se possível, um filtro leve para harmonizar com o azul marinho.

### 3. Instrução para o Desenvolvedor (IA):
"Ao criar qualquer página deste projeto, priorize uma interface de 'Página de Vendas de Alta Conversão'. O design deve ser minimalista, sem poluição visual, focando no contraste entre o texto escuro e o fundo claro. As seções devem ter bastante 'respiro' (padding vertical amplo) para transmitir calma à utilizadora."