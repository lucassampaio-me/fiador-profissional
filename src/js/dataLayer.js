/**
 * DataLayer - Configuração para eventos do Google Tag Manager
 * Fiador Profissional
 */

// Inicializar dataLayer se não existir
window.dataLayer = window.dataLayer || [];

/**
 * Função utilitária para enviar eventos para o dataLayer
 * @param {string} event - Nome do evento
 * @param {Object} parameters - Parâmetros adicionais do evento
 */
function sendDataLayerEvent(event, parameters = {}) {
    window.dataLayer.push({
        event: event,
        timestamp: new Date().toISOString(),
        ...parameters
    });
    
    // Log para debug (remover em produção se necessário)
    console.log('DataLayer Event:', { event, ...parameters });
}

/**
 * Rastrear cliques nos botões do WhatsApp
 * @param {string} location - Localização do botão (header, navigation, contact)
 * @param {string} text - Texto do botão clicado
 */
function trackWhatsAppClick(location, text = '') {
    sendDataLayerEvent('whatsapp_click', {
        button_location: location,
        button_text: text,
        contact_method: 'whatsapp',
        phone_number: '5511942543949'
    });
}

/**
 * Rastrear envio bem-sucedido do formulário de contato
 * @param {Object} formData - Dados do formulário enviado
 */
function trackFormSubmissionSuccess(formData = {}) {
    sendDataLayerEvent('form_submission_success', {
        form_type: 'contact',
        form_location: 'contact_section',
        has_name: Boolean(formData.name),
        has_email: Boolean(formData.email),
        has_phone: Boolean(formData.phone),
        has_message: Boolean(formData.message),
        // Não enviamos dados pessoais sensíveis para o GTM
        message_length: formData.message ? formData.message.length : 0
    });
}

/**
 * Configurar rastreamento automático para botões do WhatsApp
 */
function setupWhatsAppTracking() {
    // Aguardar DOM estar carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWhatsAppTracking);
    } else {
        initWhatsAppTracking();
    }
}

/**
 * Inicializar rastreamento dos botões WhatsApp
 */
function initWhatsAppTracking() {
    // Selecionar todos os links do WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Determinar localização do botão baseado no contexto
            let location = 'unknown';
            let buttonText = this.textContent.trim();
            
            // Identificar localização pelo contexto do elemento pai
            if (this.closest('.header-contact')) {
                location = 'header_contact';
            } else if (this.closest('.header-menu')) {
                location = 'header_navigation';
            } else if (this.closest('.card-2')) {
                location = 'contact_section';
            }
            
            // Enviar evento
            trackWhatsAppClick(location, buttonText);
        });
    });
    
    console.log(`DataLayer: Configurado rastreamento para ${whatsappLinks.length} botões do WhatsApp`);
}

// Inicializar automaticamente
setupWhatsAppTracking();

// Exportar funções para uso global
window.trackWhatsAppClick = trackWhatsAppClick;
window.trackFormSubmissionSuccess = trackFormSubmissionSuccess;
window.sendDataLayerEvent = sendDataLayerEvent;