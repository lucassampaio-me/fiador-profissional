document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        effect: 'cards',
        grabCursor: true,
        speed: 600,
        cardsEffect: {
            perSlideOffset: 8,
            perSlideRotate: 2,
            slideShadows: false,
        },
    });
});