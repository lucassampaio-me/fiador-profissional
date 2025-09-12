document.addEventListener('DOMContentLoaded', () => {
    const swiperVideos = new Swiper('.swiper-videos', {
        effect: 'cards',
        grabCursor: true,
        speed: 600,
        navigation: {
            nextEl: '.swiper-videos-next',
            prevEl: '.swiper-videos-prev',
        },
        cardsEffect: {
            perSlideOffset: 12,
            perSlideRotate: 2,
            slideShadows: false,
        },
        on: {
            slideChange: function() {
                pauseAllVideosAndRestoreThumbnails();
            }
        }
    });

    // Função para reproduzir vídeo e remover thumbnail
    function playVideo(videoElement, thumbnailElement) {
        thumbnailElement.style.display = 'none';
        videoElement.controls = true;
        videoElement.play();
    }

    // Função para pausar vídeo e restaurar thumbnail
    function pauseVideoAndRestoreThumbnail(videoElement, thumbnailElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.controls = false;
        thumbnailElement.style.display = 'flex';
    }

    // Função para pausar todos os vídeos e restaurar thumbnails
    function pauseAllVideosAndRestoreThumbnails() {
        const allVideos = document.querySelectorAll('.swiper-videos video');
        const allThumbnails = document.querySelectorAll('.swiper-videos .card-video-thumbnail');
        
        allVideos.forEach((video, index) => {
            if (allThumbnails[index]) {
                pauseVideoAndRestoreThumbnail(video, allThumbnails[index]);
            }
        });
    }

    // Event listeners para botões de play
    const playButtons = document.querySelectorAll('.card-video-thumbnail-button');
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Encontrar o vídeo e thumbnail correspondentes
            const cardVideo = button.closest('.card-video');
            const video = cardVideo.querySelector('video');
            const thumbnail = cardVideo.querySelector('.card-video-thumbnail');
            
            if (video && thumbnail) {
                playVideo(video, thumbnail);
            }
        });
    });
});

// Hero Swiper

const heroSwiper = new Swiper('.hero-swiper', {
    effect: 'cards',
    cardsEffect: {
        perSlideOffset: 6,
        perSlideRotate: 2,
        slideShadows: false,
    },
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: false,
    autoplay: {
        enabled: true,
        delay: 3000,
        disableOnInteraction: false,
    },
});