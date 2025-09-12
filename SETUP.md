# 📧 Configuração do Envio de Emails - Resend

## 1. Criar conta no Resend

1. Acesse [resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Confirme seu email

## 2. Obter API Key

1. No dashboard do Resend, vá em **API Keys**
2. Clique em **Create API Key**
3. Dê um nome (ex: "Fiador Profissional")
4. Copie a API key gerada (começa com `re_`)
<!-- re_TerjGRJ7_9t7TLhRBn2uoMeWzLZeFi79M -->

## 3. Configurar Variáveis de Ambiente na Vercel

### Via Dashboard da Vercel:
1. Vá no seu projeto na Vercel
2. **Settings** → **Environment Variables**
3. Adicione as variáveis:

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxx (sua API key do Resend)
CONTACT_EMAIL = seuemail@gmail.com (email que receberá os contatos)
```

### Via CLI da Vercel:
```bash
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
```

## 4. Domínio Personalizado (Opcional)

**Inicialmente:** Os emails serão enviados de `contato@resend.dev`

**Para usar seu domínio:**
1. No Resend, vá em **Domains**
2. Adicione seu domínio (ex: `fiadorprofissional.com.br`)
3. Configure os registros DNS conforme instruções
4. Atualize o código em `api/contact.js`:
   ```js
   from: 'Fiador Profissional <contato@fiadorprofissional.com.br>'
   ```

## 5. Testar a Implementação

### Localmente (opcional):
```bash
# Instalar dependências
npm install

# Executar localmente
vercel dev
```

### Na produção:
1. Faça o deploy na Vercel
2. Teste o formulário de contato
3. Verifique se recebeu o email
4. Verifique se o cliente recebeu a confirmação

## 6. Emails que serão enviados

### Para você (admin):
- **Assunto:** "🏠 Novo contato: [Nome do Cliente]"
- **Conteúdo:** Dados completos do formulário
- **Design:** Template profissional com os dados organizados

### Para o cliente:
- **Assunto:** "Obrigado pelo seu contato - Fiador Profissional"
- **Conteúdo:** Confirmação de recebimento + botões para WhatsApp/telefone
- **Design:** Template responsivo e profissional

## 7. Limites do Plano Gratuito

- **3.000 emails/mês** (mais que suficiente para um formulário de contato)
- Sem limite de tempo
- Sem cobrança adicional

## 8. Monitoramento

No dashboard do Resend você pode:
- Ver emails enviados
- Taxa de entrega
- Relatórios de erros
- Logs detalhados

## ✅ Checklist de Deploy

- [ ] Conta criada no Resend
- [ ] API key obtida
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Deploy realizado
- [ ] Teste do formulário concluído
- [ ] Emails sendo recebidos corretamente

---

**Importante:** Mantenha sua API key em segurança e nunca a publique no código!