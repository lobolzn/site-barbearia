# Leonardo David | Visagista

Site institucional e sistema de agendamento online para Leonardo David, visagista profissional em Caxias-MA.

---

## Funcionalidades

### Página principal (`index.html`)

#### Navegação
- Barra de navegação fixa com efeito de scroll (muda de aparência ao rolar a página)
- Links âncora para todas as seções: Sobre, Serviços, Galeria e Agendamento
- Botão de CTA "Agendar" em destaque
- Menu hamburguer responsivo para mobile com trap de foco e fechamento por ESC

#### Hero
- Seção de destaque com foto do profissional, título e botões de ação
- Animação de entrada ao carregar a página

#### Sobre
- Apresentação do profissional com foto e texto descritivo
- Animações de entrada com fade-in ao rolar

#### Serviços
Catálogo com 4 serviços, exibindo preço e duração:

| # | Serviço | Preço | Duração |
|---|---|---|---|
| 01 | Corte com Leonardo | R$ 150 | 1h |
| 02 | Desondulação | R$ 150 | 1h 30min |
| 03 | Corte com Visagismo ⭐ | R$ 220 | 1h |
| 04 | Aparar Barba | R$ 75 | 20min |

- Clicar em qualquer serviço redireciona automaticamente para o formulário de agendamento com o serviço já pré-selecionado

#### Galeria
- Grid de fotos dos trabalhos do profissional
- **Lightbox**: clique em qualquer foto para abrir em tela cheia com navegação por setas e teclado (← →, ESC para fechar)
- Link direto para o Instagram do profissional

#### Formulário de Agendamento (4 etapas)

**Etapa 1 — Escolha do serviço**
- Seleção de um ou mais serviços simultaneamente
- Exibe total acumulado (preço + duração) ao selecionar
- Botão "Continuar" ativado apenas quando ao menos um serviço é selecionado

**Etapa 2 — Data e horário**
- Calendário interativo com navegação por mês
- Bloqueia automaticamente dias e horários já passados
- Consulta o Firebase em tempo real para bloquear horários já reservados
- Abas Manhã / Tarde para filtrar os horários disponíveis
- Botão "Continuar" ativado apenas quando data e horário estão selecionados

**Etapa 3 — Dados pessoais**
- Campos: Nome, WhatsApp (com validação de formato) e Observações (opcional)
- Resumo do agendamento exibido ao lado (serviço, data, horário, total)
- Validação em tempo real dos campos com feedback visual (verde/vermelho)

**Etapa 4 — Confirmação**
- Salva o agendamento no Firebase Realtime Database (bloqueia o horário)
- Abre o WhatsApp automaticamente com mensagem pré-formatada para o profissional
- Exibe resumo completo da reserva
- Botão para iniciar um novo agendamento

**Proteções do formulário**
- Rate limit: máximo de 3 agendamentos por dispositivo a cada 24 horas (via localStorage)
- Detecção de conflito: impede duplo agendamento no mesmo horário via transação no Firebase
- Horários passados são desabilitados automaticamente no calendário

#### Elementos globais
- **Botão flutuante do WhatsApp**: acesso rápido para contato direto
- **Botão "Voltar ao topo"**: aparece após rolar 400px
- **Toast de notificação**: mensagens de sucesso e erro exibidas brevemente
- **Skip link**: acessibilidade para usuários de leitores de tela

---

### Painel administrativo (`meus-agendamentos.html`)

Página privada para Leonardo visualizar e gerenciar todos os agendamentos recebidos.

#### Autenticação
- Login via Google (OAuth) com popup
- Acesso restrito a um único e-mail autorizado
- Logout disponível no painel

#### Dashboard de agendamentos
- Lista todos os agendamentos salvos no Firebase em tempo real
- Cada card exibe: nome do cliente, serviço(s), data, horário, WhatsApp e observações
- **Status visual por cor e badge:**
  - `Hoje` — agendamentos do dia atual
  - `Pendente` — agendamentos futuros
  - `Realizado` — agendamentos passados
- Clique no WhatsApp do cliente abre conversa direta no WhatsApp
- Indicador de carregamento enquanto os dados são buscados

---

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Frontend | HTML5, CSS3, JavaScript puro (ES5) |
| Banco de dados | Firebase Realtime Database 8.x |
| Autenticação | Firebase Authentication (Google OAuth) |
| Deploy | GitHub Actions + GitHub Pages |
| Fontes | Google Fonts (Cormorant Garamond + Outfit) |
| Imagens | WebP com fallback JPG (`<picture>`) |

---

## Estrutura de arquivos

```
site-barbearia/
├── index.html                  # Página principal
├── meus-agendamentos.html      # Painel admin (privado)
├── style.css                   # Todos os estilos
├── script.js                   # Utilitários de UI (nav, lightbox, animações)
├── firebase-config.example.js  # Template de configuração (sem chaves reais)
├── favicon.svg                 # Ícone do site
├── photos/                     # Fotos do site
│   ├── hero.jpg / hero.webp
│   ├── leonardo-sobre.jpg / .webp
│   └── gallery/
│       └── 1.jpg … 4.jpg / .webp
└── .github/
    └── workflows/
        └── deploy.yml          # Pipeline de deploy automático
```

---

## Deploy e configuração

O deploy é feito automaticamente via **GitHub Actions** a cada push na branch `main`.

A API key do Firebase é injetada em tempo de build usando um **GitHub Secret** — a chave nunca fica exposta no código-fonte.

### Configuração necessária (uma vez só)

1. **Criar o Secret no GitHub**
   - `Settings` → `Secrets and variables` → `Actions` → `New repository secret`
   - Nome: `FIREBASE_API_KEY`
   - Valor: sua API key do Firebase

2. **Configurar o GitHub Pages**
   - `Settings` → `Pages` → Source → **GitHub Actions**

3. **Desenvolvimento local**
   - Copie `firebase-config.example.js` para `firebase-config.js`
   - Preencha com sua API key real
   - O arquivo `firebase-config.js` está no `.gitignore` e nunca será commitado

### Firebase Security Rules recomendadas

```json
{
  "rules": {
    "agendamentos": {
      ".read": true,
      ".write": true
    },
    "agendamentos-completos": {
      ".read": "auth != null",
      ".write": true
    }
  }
}
```
