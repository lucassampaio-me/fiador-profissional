# Guia de Configuração: Google Tag Manager e Google Analytics 4
**Fiador Profissional - Implementação de Data Layer**

## 📋 Resumo dos Eventos Implementados

O site agora dispara automaticamente os seguintes eventos:

### 1. 🟢 `whatsapp_click` 
**Disparado quando:** Usuário clica em qualquer botão do WhatsApp
**Parâmetros enviados:**
- `button_location`: Localização do botão (header_contact, header_navigation, contact_section)
- `button_text`: Texto do botão clicado
- `contact_method`: "whatsapp" (fixo)
- `phone_number`: "5511942543949" (fixo)
- `timestamp`: Data/hora do evento

### 2. 🟢 `form_submission_success`
**Disparado quando:** Formulário de contato é enviado com sucesso
**Parâmetros enviados:**
- `form_type`: "contact" (fixo)
- `form_location`: "contact_section" (fixo)
- `has_name`: true/false se nome foi preenchido
- `has_email`: true/false se email foi preenchido
- `has_phone`: true/false se telefone foi preenchido
- `has_message`: true/false se mensagem foi preenchida
- `message_length`: Tamanho da mensagem (número)
- `timestamp`: Data/hora do evento

---

## 🔧 PARTE 1: Configuração no Google Tag Manager

### 1.1 Criar Variáveis do Data Layer

Acesse **Variáveis > Nova** e crie as seguintes variáveis:

#### Para evento `whatsapp_click`:
| Nome da Variável | Tipo | Nome da Variável do Data Layer |
|------------------|------|--------------------------------|
| `DL - Button Location` | Variável do data layer | `button_location` |
| `DL - Button Text` | Variável do data layer | `button_text` |
| `DL - Contact Method` | Variável do data layer | `contact_method` |
| `DL - Phone Number` | Variável do data layer | `phone_number` |

#### Para evento `form_submission_success`:
| Nome da Variável | Tipo | Nome da Variável do Data Layer |
|------------------|------|--------------------------------|
| `DL - Form Type` | Variável do data layer | `form_type` |
| `DL - Form Location` | Variável do data layer | `form_location` |
| `DL - Has Name` | Variável do data layer | `has_name` |
| `DL - Has Email` | Variável do data layer | `has_email` |
| `DL - Has Phone` | Variável do data layer | `has_phone` |
| `DL - Has Message` | Variável do data layer | `has_message` |
| `DL - Message Length` | Variável do data layer | `message_length` |

#### Variável adicional (útil para debug):
| Nome da Variável | Tipo | Nome da Variável do Data Layer |
|------------------|------|--------------------------------|
| `DL - Timestamp` | Variável do data layer | `timestamp` |

### 1.2 Criar Acionadores (Triggers)

Acesse **Acionadores > Novo** e crie:

#### Acionador 1: WhatsApp Click
- **Nome:** `Trigger - WhatsApp Click`
- **Tipo de acionador:** Evento personalizado
- **Nome do evento:** `whatsapp_click`
- **Este acionador é disparado em:** Todos os eventos personalizados

#### Acionador 2: Form Success
- **Nome:** `Trigger - Form Success`
- **Tipo de acionador:** Evento personalizado
- **Nome do evento:** `form_submission_success`
- **Este acionador é disparado em:** Todos os eventos personalizados

### 1.3 Criar Tags do Google Analytics 4

Certifique-se de ter a **Tag de configuração do GA4** já criada. Se não tiver:

#### Tag de Configuração GA4 (se ainda não existe):
- **Nome:** `GA4 - Configuration`
- **Tipo de tag:** Configuração do Google Analytics: GA4
- **ID de medição:** Seu ID do GA4 (formato: G-XXXXXXXXXX)
- **Acionador:** All Pages

#### Tag 1: WhatsApp Click Event
- **Nome:** `GA4 - WhatsApp Click`
- **Tipo de tag:** Evento do Google Analytics: GA4
- **Tag de configuração:** Selecione sua tag de configuração GA4
- **Nome do evento:** `whatsapp_click`
- **Parâmetros:**
  - `button_location` → `{{DL - Button Location}}`
  - `button_text` → `{{DL - Button Text}}`
  - `contact_method` → `{{DL - Contact Method}}`
  - `phone_number` → `{{DL - Phone Number}}`
- **Acionador:** `Trigger - WhatsApp Click`

#### Tag 2: Form Success Event
- **Nome:** `GA4 - Form Success`
- **Tipo de tag:** Evento do Google Analytics: GA4
- **Tag de configuração:** Selecione sua tag de configuração GA4
- **Nome do evento:** `form_submission_success`
- **Parâmetros:**
  - `form_type` → `{{DL - Form Type}}`
  - `form_location` → `{{DL - Form Location}}`
  - `has_name` → `{{DL - Has Name}}`
  - `has_email` → `{{DL - Has Email}}`
  - `has_phone` → `{{DL - Has Phone}}`
  - `has_message` → `{{DL - Has Message}}`
  - `message_length` → `{{DL - Message Length}}`
- **Acionador:** `Trigger - Form Success`

### 1.4 Testar no GTM
1. Clique em **Visualizar**
2. Acesse seu site
3. Teste clicando nos botões do WhatsApp
4. Teste enviando o formulário
5. Verifique se os eventos aparecem no Debug do GTM
6. **Publique** quando estiver funcionando

---

## 📊 PARTE 2: Configuração no Google Analytics 4

### 2.1 Verificar Eventos
Acesse **Configure > Events** no GA4 para confirmar que os eventos estão chegando:
- `whatsapp_click`
- `form_submission_success`

*Pode levar até 24h para aparecer*

### 2.2 Criar Dimensões Personalizadas

Acesse **Configure > Custom definitions > Custom dimensions**

#### Para evento `whatsapp_click`:
| Nome da Dimensão | Nome do parâmetro | Escopo | Descrição |
|------------------|-------------------|---------|-----------|
| `WhatsApp Button Location` | `button_location` | Event | Localização do botão WhatsApp clicado |
| `WhatsApp Button Text` | `button_text` | Event | Texto do botão WhatsApp |
| `Contact Method` | `contact_method` | Event | Método de contato usado |

#### Para evento `form_submission_success`:
| Nome da Dimensão | Nome do parâmetro | Escopo | Descrição |
|------------------|-------------------|---------|-----------|
| `Form Type` | `form_type` | Event | Tipo de formulário enviado |
| `Form Location` | `form_location` | Event | Localização do formulário |
| `Form Has Name` | `has_name` | Event | Se formulário incluiu nome |
| `Form Has Email` | `has_email` | Event | Se formulário incluiu email |
| `Form Has Phone` | `has_phone` | Event | Se formulário incluiu telefone |
| `Form Has Message` | `has_message` | Event | Se formulário incluiu mensagem |

### 2.3 Criar Métricas Personalizadas

Acesse **Configure > Custom definitions > Custom metrics**

| Nome da Métrica | Nome do parâmetro | Unidade | Escopo | Descrição |
|-----------------|-------------------|---------|--------|-----------|
| `Message Length` | `message_length` | Standard | Event | Tamanho da mensagem enviada |

### 2.4 Configurar Conversões

Acesse **Configure > Events** e marque como conversão:
- ✅ `form_submission_success` (conversão principal)
- ✅ `whatsapp_click` (micro-conversão - opcional)

---

## 📈 PARTE 3: Relatórios Úteis no GA4

### 3.1 Relatório de WhatsApp
**Configure > Explorar > Exploration em branco**
- **Dimensões:** Event name, WhatsApp Button Location, WhatsApp Button Text
- **Métricas:** Event count, Users
- **Filtro:** Event name = whatsapp_click

### 3.2 Relatório de Formulários
**Configure > Explorar > Exploration em branco**
- **Dimensões:** Event name, Form Type, Form Has Name, Form Has Email
- **Métricas:** Event count, Users, Message Length
- **Filtro:** Event name = form_submission_success

### 3.3 Relatório Geral de Conversões
**Reports > Monetization > Conversions**
- Vai mostrar quantas conversões de `form_submission_success` você teve

---

## 🔍 PARTE 4: Debug e Validação

### 4.1 No Navegador
1. Abra o Console do Navegador (F12)
2. Clique em botões do WhatsApp - deve aparecer log: `DataLayer Event: whatsapp_click`
3. Envie formulário - deve aparecer log: `DataLayer Event: form_submission_success`

### 4.2 No GTM Preview
1. GTM > Visualizar
2. Vá para seu site
3. Execute as ações
4. Verifique se eventos aparecem no painel

### 4.3 GA4 DebugView
1. GA4 > Configure > DebugView
2. Teste no site
3. Eventos devem aparecer em tempo real

### 4.4 GA4 Realtime
1. GA4 > Reports > Realtime
2. Execute as ações no site
3. Eventos devem aparecer em "Events"

---

## 📝 PARTE 5: Checklist de Implementação

### Google Tag Manager:
- [ ] Variáveis do Data Layer criadas
- [ ] Acionadores configurados
- [ ] Tags GA4 criadas
- [ ] Testado no Preview Mode
- [ ] Container publicado

### Google Analytics 4:
- [ ] Eventos aparecendo em Events
- [ ] Dimensões personalizadas criadas
- [ ] Métricas personalizadas criadas (se aplicável)
- [ ] Conversões configuradas
- [ ] Relatórios personalizados criados

### Testes Funcionais:
- [ ] Clique no WhatsApp do cabeçalho (contato)
- [ ] Clique no WhatsApp do menu
- [ ] Clique no WhatsApp da seção de contato
- [ ] Envio do formulário com sucesso
- [ ] Dados aparecendo no GA4 (aguardar até 24h)

---

## 🚨 Troubleshooting

### Problema: Eventos não aparecem no GTM
**Solução:** 
- Verifique o Console do navegador
- Confirme que dataLayer.js está carregando antes do bundle.min.js
- Teste em modo incógnito

### Problema: Eventos não chegam no GA4
**Solução:**
- Verifique se o ID do GA4 está correto no GTM
- Confirme se a tag de configuração está disparando em "All Pages"
- Aguarde até 24h para processamento

### Problema: Dimensões não aparecem nos relatórios
**Solução:**
- Aguarde até 48h após criação das dimensões
- Confirme que os nomes dos parâmetros estão exatamente iguais
- Verifique se há dados suficientes (pelo menos 1 evento)

### Problema: Button location aparece como "unknown"
**Solução:**
- Verifique se os botões do WhatsApp estão dentro dos elementos corretos:
  - `.header-contact`
  - `.header-menu` 
  - `.card-2`

---

## 📞 Suporte

Para dúvidas sobre esta implementação, verifique:
1. Console do navegador para erros JavaScript
2. GTM Preview Mode para debug
3. GA4 DebugView para eventos em tempo real

**Arquivos modificados nesta implementação:**
- `src/js/dataLayer.js` (criado)
- `index.html` (script adicionado)
- `src/js/main.js` (evento de sucesso adicionado)