lucide.createIcons();

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successModal = document.getElementById('success-modal');
    const timerCount = document.getElementById('timer-count');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };

            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;

            try {
                // Send form data to API
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    // Success - show modal and reset form
                    contactForm.reset();
                    showSuccessModal();
                } else {
                    // Error
                    alert(result.message || 'Erro ao enviar mensagem. Tente novamente.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao enviar mensagem. Verifique sua conexão e tente novamente.');
            } finally {
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    function showSuccessModal() {
        successModal.style.display = 'flex';
        let countdown = 10;
        timerCount.textContent = countdown;

        const timer = setInterval(() => {
            countdown--;
            timerCount.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(timer);
                successModal.style.display = 'none';
            }
        }, 1000);

        // Allow manual close by clicking overlay
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                clearInterval(timer);
                successModal.style.display = 'none';
            }
        });
    }
});