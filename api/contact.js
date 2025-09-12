import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validação básica
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Campos obrigatórios: nome, email e mensagem' 
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email inválido' 
      });
    }

    // Email de notificação para você
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">🏠 Fiador Profissional</h1>
            <p style="color: #7f8c8d; margin: 5px 0 0 0;">Novo contato recebido</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #2c3e50; margin-top: 0; font-size: 18px;">Dados do Contato:</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #34495e;">Nome:</strong>
              <span style="color: #2c3e50;">${name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #34495e;">Email:</strong>
              <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a>
            </div>
            
            ${phone ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #34495e;">Telefone:</strong>
              <a href="tel:${phone}" style="color: #3498db; text-decoration: none;">${phone}</a>
            </div>
            ` : ''}
            
            <div>
              <strong style="color: #34495e;">Mensagem:</strong>
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #3498db;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ecf0f1;">
            <p style="color: #7f8c8d; margin: 0; font-size: 14px;">
              Recebido em ${new Date().toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    `;

    // Email de confirmação para o cliente
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">🏠 Fiador Profissional</h1>
            <p style="color: #7f8c8d; margin: 5px 0 0 0;">Obrigado pelo seu contato!</p>
          </div>
          
          <div style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; font-size: 18px;">Olá, ${name}!</h2>
            <p style="color: #34495e; line-height: 1.6;">
              Recebemos sua mensagem e entraremos em contato em breve. Nossa equipe está sempre pronta para ajudar você a encontrar o melhor fiador para sua locação.
            </p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #27ae60; margin-bottom: 25px;">
            <h3 style="color: #27ae60; margin-top: 0; font-size: 16px;">✅ Sua mensagem foi recebida</h3>
            <p style="color: #2c3e50; margin: 10px 0 0 0; line-height: 1.5;">
              Tempo de resposta: <strong>até 24 horas</strong><br>
              Status: <strong>Em análise</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-bottom: 25px;">
            <h3 style="color: #2c3e50; font-size: 16px;">Precisa falar conosco agora?</h3>
            <a href="https://wa.me/11999999999" style="display: inline-block; background-color: #25d366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 10px;">
              💬 WhatsApp
            </a>
            <a href="tel:11999999999" style="display: inline-block; background-color: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 10px;">
              📞 Ligar agora
            </a>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ecf0f1;">
            <p style="color: #7f8c8d; margin: 0; font-size: 14px;">
              Fiador Profissional - Sua locação garantida<br>
              <a href="mailto:contato@fiadorprofissional.com.br" style="color: #3498db;">contato@fiadorprofissional.com.br</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Enviar email de notificação para o admin
    await resend.emails.send({
      from: 'Fiador Profissional <contato@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'contato@fiadorprofissional.com.br'],
      subject: `🏠 Novo contato: ${name}`,
      html: adminEmailHtml,
    });

    // Enviar email de confirmação para o cliente
    await resend.emails.send({
      from: 'Fiador Profissional <contato@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'contato@fiadorprofissional.com.br'],
      subject: 'Obrigado pelo seu contato - Fiador Profissional',
      html: clientEmailHtml,
    });

    resend.contacts.create({
      email: email,
      name: name,
      phone: phone,
      message: message,
    });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso!' 
    });

  } catch (error) {
    console.error('Erro ao processar contato:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro ao enviar mensagem. Tente novamente.' 
    });
  }
}