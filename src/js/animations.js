gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    effects: true
});

gsap.set("html", { scrollBehavior: "auto" });

function initHeroAnimations() {
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-content .content-text h2');
    const heroList = document.querySelector('.hero-content .content-text .list-custom-1');
    const heroButtons = document.querySelector('.hero-group-buttons');
    const heroSwiper = document.querySelector('.hero-swiper');
    
    if (!heroSection) return;
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection,
            start: "top 80%",
            once: true
        }
    });

    if (heroSwiper) {
        tl.from(heroSwiper, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
    
    if (heroTitle) {
        const titleSplit = new SplitText(heroTitle, { type: "lines" });
        
        tl.from(titleSplit.lines, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.5");
    }
    
    if (heroList) {
        const listItems = heroList.querySelectorAll('li');
        
        tl.from(listItems, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.5");
    }
    
    if (heroButtons) {
        
        tl.from(heroButtons, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.5");
    }
}

function initNossosServicosAnimations() {
    const nossosServicosSection = document.querySelector('.nossos-servicos');
    const nossosServicosTitle = document.querySelector('#nossos-servicos .content-text h2');
    const nossosServicosCards = document.querySelectorAll('#nossos-servicos .card-1');
    
    if (!nossosServicosSection) return;
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: nossosServicosSection,
            start: "top 80%",
            once: true
        }
    });

    if (nossosServicosTitle) {
        tl.from(nossosServicosTitle, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }
    
    if (nossosServicosCards.length > 0) {
        tl.from(nossosServicosCards, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.5");
    }
}

function initQuemSomosAnimations() {
    const quemSomosSection = document.querySelector('.quem-somos');
    const quemSomosTitle = document.querySelector('#quem-somos .content-text h2');
    const quemSomosParagraphs = document.querySelectorAll('#quem-somos .content-text p');
    const quemSomosButton = document.querySelector('#quem-somos .content-text .btn-wrapper');
    const quemSomosCard = document.querySelector('#quem-somos .card-1');
    const quemSomosVideo = document.querySelector('#quem-somos .content-video');
    
    if (!quemSomosSection) return;
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: quemSomosSection,
            start: "top 80%",
            once: true
        }
    });

    if (quemSomosTitle) {
        tl.from(quemSomosTitle, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }
    
    if (quemSomosParagraphs.length > 0) {
        tl.from(quemSomosParagraphs, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.5");
    }
    
    if (quemSomosButton) {
        tl.from(quemSomosButton, {
            x: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3");
    }

    if (quemSomosVideo) {
        tl.from(quemSomosVideo, {
            x: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3");
    }
    
    if (quemSomosCard) {
        tl.from(quemSomosCard, {
            x: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.5");
    }
}

function initDepoimentosAnimations() {
    const depoimentosSection = document.querySelector('.depoimentos');
    const depoimentosTitle = document.querySelector('#depoimentos .content-text h2');
    const depoimentosParagraph = document.querySelector('#depoimentos .content-text p');
    const depoimentosListItems = document.querySelectorAll('#depoimentos .list-custom-1 li');
    const depoimentosSwiper = document.querySelector('#depoimentos .swiper-videos');
    
    if (!depoimentosSection) return;
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: depoimentosSection,
            start: "top 80%",
            once: true
        }
    });

    if (depoimentosTitle) {
        tl.from(depoimentosTitle, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }
    
    if (depoimentosParagraph) {
        tl.from(depoimentosParagraph, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.5");
    }
    
    if (depoimentosListItems.length > 0) {
        tl.from(depoimentosListItems, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.3");
    }
    
    if (depoimentosSwiper) {
        tl.from(depoimentosSwiper, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4");
    }
}

function initFaleConoscoAnimations() {
    const faleConoscoSection = document.querySelector('.fale-conosco');
    const faleConoscoTitle = document.querySelector('#fale-conosco .content-text h2');
    const faleConoscoParagraph = document.querySelector('#fale-conosco .content-text p');
    const faleConoscoForm = document.querySelector('#fale-conosco .content-form');
    const faleConoscoCards = document.querySelectorAll('#fale-conosco .card-2');
    
    if (!faleConoscoSection) return;
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: faleConoscoSection,
            start: "top 80%",
            once: true
        }
    });

    if (faleConoscoTitle) {
        tl.from(faleConoscoTitle, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }
    
    if (faleConoscoParagraph) {
        tl.from(faleConoscoParagraph, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.5");
    }
    
    if (faleConoscoForm) {
        tl.from(faleConoscoForm, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3");
    }
    
    if (faleConoscoCards.length > 0) {
        tl.from(faleConoscoCards, {
            x: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.5");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    initNossosServicosAnimations();
    initQuemSomosAnimations();
    initDepoimentosAnimations();
    initFaleConoscoAnimations();
});