lucide.createIcons();

// Mobile Menu Management
class MobileMenu {
    constructor() {
        this.headerMenu = document.querySelector('.header-menu');
        this.menuList = this.headerMenu ? this.headerMenu.querySelector('ul') : null;
        this.toggleButton = document.getElementById('mobile-menu-toggle');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.headerMenu || !this.menuList || !this.toggleButton) return;
        
        // Set initial state
        this.updateMenuState();
        
        // Event listeners
        window.addEventListener('resize', () => this.updateMenuState());
        this.toggleButton.addEventListener('click', () => this.toggle());
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.headerMenu.contains(e.target)) {
                this.close();
            }
        });
        
        // Close menu on scroll
        window.addEventListener('scroll', () => {
            if (this.isOpen) {
                this.close();
            }
        });
        
        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Close menu when clicking on menu items
        this.menuList.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                this.close();
            }
        });
    }
    
    updateMenuState() {
        const isDesktop = window.innerWidth >= 1280;
        
        if (isDesktop) {
            // Desktop: remove mobile class and close menu
            this.menuList.classList.remove('menu-mobile', 'show');
            this.isOpen = false;
        } else {
            // Mobile: add mobile class
            this.menuList.classList.add('menu-mobile');
            // Keep current open/closed state
            if (this.isOpen) {
                this.menuList.classList.add('show');
            } else {
                this.menuList.classList.remove('show');
            }
        }
    }
    
    toggle() {
        if (window.innerWidth >= 1280) return; // Don't toggle on desktop
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.open();
        } else {
            this.close();
        }
    }
    
    open() {
        this.isOpen = true;
        this.menuList.classList.add('show');
    }
    
    close() {
        this.isOpen = false;
        this.menuList.classList.remove('show');
    }
}

// Initialize mobile menu
const mobileMenu = new MobileMenu();

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