# CLAUDE.md

Este arquivo fornece orientações para Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Comandos de desenvolvimento

- **Iniciar servidor de desenvolvimento**: `npm run dev` (usa Vercel Dev)
- **Build do projeto**: `npm run build` (site estático, sem build necessário)

## Arquitetura do projeto

Este é um site estático para a empresa Fiador Profissional, hospedado na Vercel com funcionalidade de formulário de contato via API serverless.

### Estrutura principal:
- `index.html` - Página principal do site
- `api/contact.js` - API serverless (Vercel) para processamento de formulários de contato
- `src/` - Assets estáticos (CSS, JS, imagens, vídeos)
- `vercel.json` - Configuração de hosting com headers de segurança e cache

### Tecnologias:
- Site estático HTML/CSS/JS
- API serverless Node.js (Vercel Functions)
- Resend para envio de emails
- Google Tag Manager para analytics

### API de contato:
- Endpoint POST em `/api/contact`
- Processa formulários de contato e envia emails via Resend
- Validação de campos obrigatórios e formato de email
- Resposta em JSON com status de sucesso/erro

### Configuração Vercel:
- Headers de segurança configurados (XSS, CSRF, etc.)
- Cache otimizado para diferentes tipos de assets
- URLs limpas habilitadas

## Regras de desenvolvimento

**IMPORTANTE**: Este projeto possui regras rígidas de desenvolvimento definidas em `.cursor/rules/regras-de-desenvolvimento.mdc`:

- Execute APENAS o que foi explicitamente solicitado
- NÃO faça sugestões adicionais ou melhorias não pedidas
- Mantenha respostas concisas e diretas
- NÃO adicione funcionalidades extras não solicitadas
- NÃO sugira refatorações ou "melhores práticas" não pedidas

### Exceções permitidas:
- Avisos de segurança críticos
- Erros de sintaxe que impedem execução
- Dependências obrigatórias para funcionamento