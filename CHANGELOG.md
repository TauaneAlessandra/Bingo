# Changelog

Todas as mudanças notáveis neste projeto serão documentadas aqui.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Não lançado]

### Adicionado
- Logger estruturado (`src/utils/logger.js`) com contexto de módulo, timestamp e versão, pronto para integração com Sentry
- Suite de testes com Vitest + React Testing Library cobrindo utilitários e hooks
- Cobertura de testes com threshold mínimo de 70% aplicado no CI
- CI/CD aprimorado: lint check, upload de relatório de cobertura e sumário de status no GitHub

### Alterado
- `useImageUploads.js` refatorado com factory function `createImageHandlers`, eliminando duplicação de código
- `indexedDB.js` e `ErrorBoundary.jsx` integrados ao logger estruturado
- Carregamento de imagens no IndexedDB agora usa `Promise.all` para paralelismo real
- `package.json`: scripts `test:watch` e `test:coverage` adicionados

---

## [1.0.0] — 2026-07

### Adicionado
- Geração determinística de cartelas de bingo (1 a 20.000 cartelas) via RNG com seed (Mulberry32)
- Suporte a dois tamanhos de bingo: 75 e 90 números
- Customização completa: título, subtítulo, regras, prêmios (1–6), cores por prêmio
- Upload de logo principal, logos de patrocinadores, logo central, QR Code e "Realizado por"
- Modo de impressão otimizado (2 cartelas por folha A4 Paisagem) com lazy batch rendering
- Sorteador integrado (Draw Mode) com controle de velocidade e auto-play
- Validador de cartelas em tempo real cruzando com números sorteados
- Modo escuro persistido em `localStorage`
- Configuração persistida em `localStorage` com debounce de 300ms
- Imagens persistidas em `IndexedDB`
- `ErrorBoundary` global com opção de limpar tudo e reiniciar
- CI/CD com GitHub Actions (install, build, test)
- Thumb de cartelas com paginação
- Material Web Components para inputs e abas
- PropTypes em todos os componentes públicos
- `React.memo` em componentes de alto custo de renderização

### Tecnologias
- React 18 + Vite 5 + Tailwind CSS v4
- Material Web Components
- Lucide React (ícones)
- Python 3 + Flask + SQLite (backend)
