document.addEventListener("DOMContentLoaded", (event) => {
    // 1. Lenis Smooth Scroll Initialization
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    window.lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 1.5 Smooth scroll for anchor tags
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement, { offset: -80 });
                }
            }
        });
    });

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    if (cursor && cursorFollower && window.innerWidth > 768) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        let followerX = mouseX;
        let followerY = mouseY;

        // Track Mouse
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Add hover state to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, .cursor-pointer, .glass-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        // Animation Loop using GSAP ticker
        gsap.ticker.add(() => {
            // Crisp movement for center dot
            cursorX += (mouseX - cursorX) * 0.5;
            cursorY += (mouseY - cursorY) * 0.5;
            
            // Lagged movement for follower
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            gsap.set(cursor, { x: cursorX, y: cursorY });
            gsap.set(cursorFollower, { x: followerX, y: followerY });
        });
    }

    // 3. Hero Animation
    function initHeroAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        
        // Split text into words, but protect the glowing span
        // We'll manually split text nodes to preserve HTML structure if needed,
        // but SplitType handles basic spans well.
        
        const split = new SplitType('.hero-title', { types: 'words, lines' });
        
        const tl = gsap.timeline();
        
        // Make elements visible before animating
        gsap.set('.hero-subtitle', { opacity: 0, y: 30 });
        gsap.set('.hero-buttons', { opacity: 0, y: 30 });
        
        tl.from(split.words, {
            y: 50,
            opacity: 0,
            rotationX: -45,
            transformOrigin: "0% 50% -50",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        })
        .to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .to('.hero-buttons', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6");
        
        // Specific parallax for background
        gsap.to('.hero-gradient-bg, .absolute.inset-0.z-0 img', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: "section.relative.h-screen",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    initHeroAnimation();

    // 3.5 Particles Background
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#00f2ff", "#95d1d6", "#ffffff"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#00f2ff", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false } }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": false },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.5 } }
                }
            },
            "retina_detect": true
        });
    }
    
    // Expose for language switcher
    window.runHeroAnimation = function() {
        // Simple re-run is complex due to structure changes. 
        // Best approach for lang-switch is just fade in.
        gsap.fromTo('.hero-title, .hero-subtitle, .hero-buttons', 
            { opacity: 0, y: 10 }, 
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
    };

    // 4. Portfolio Grid Entrance (Staggered Fade + TranslateY)
    const portfolioItems = gsap.utils.toArray('.portfolio-item');
    if (portfolioItems.length > 0) {
        ScrollTrigger.batch(portfolioItems, {
            start: "top 85%",
            onEnter: batch => gsap.fromTo(batch, 
                { opacity: 0, y: 50 },
                { opacity: 0.7, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out", overwrite: true }
            ),
            // Revert opacity to 0.7 as per CSS class standard, though on hover we need 1
            // Actually, wait, class has opacity-70. GSAP sets inline styles.
            // Better to animate the container instead of the image/video if possible.
        });
        
        // Ensure child opacity resets correctly if hovering
        portfolioItems.forEach(item => {
            const media = item.querySelector('img, video');
            if(media) {
                item.addEventListener('mouseenter', () => gsap.to(media, {opacity: 1, duration: 0.3}));
                item.addEventListener('mouseleave', () => gsap.to(media, {opacity: 0.7, duration: 0.3}));
            }
        });
    }

    // 5. Services Fade Up
    const serviceCards = gsap.utils.toArray('.g-service-card');
    if (serviceCards.length > 0) {
        gsap.fromTo(serviceCards,
            { opacity: 0, y: 60 },
            {
                opacity: 1, y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#services",
                    start: "top 70%"
                }
            }
        );
    }
    
    const turnKeyItems = gsap.utils.toArray('#services .group');
    if (turnKeyItems.length > 0) {
        gsap.fromTo(turnKeyItems,
            { opacity: 0, x: -30 },
            {
                opacity: 1, x: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#services",
                    start: "top 60%"
                }
            }
        );
    }

    // 6. Pricing Number Count Up
    const pricingItems = document.querySelectorAll('.pricing-number');
    pricingItems.forEach(item => {
        const targetAttr = item.getAttribute('data-target');
        if (!targetAttr) return;
        const targetValue = parseInt(targetAttr, 10);
        
        ScrollTrigger.create({
            trigger: item,
            start: "top 85%",
            once: true,
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: targetValue,
                    duration: 2,
                    ease: "power3.out",
                    onUpdate: () => {
                        // Format correctly
                        item.textContent = Math.floor(obj.val).toLocaleString('ru-RU') + ' ₽';
                    }
                });
            }
        });
    });

    // 7. Team Grayscale/Color Animation (Viewport Entrance)
    const teamMembers = gsap.utils.toArray('#team .group');
    if(teamMembers.length > 0) {
        gsap.fromTo(teamMembers, 
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#team",
                    start: "top 70%"
                }
            }
        );
    }

    // 8. Reviews Auto-Drag / Horizontal Scroll setup
    // For a simple premium feel, dragging horizontally using mouse events or a GSAP Draggable wrapper.
    const reviewsTrack = document.querySelector('.reviews-track');
    if (reviewsTrack) {
        let isDown = false;
        let startX;
        let scrollLeft;

        reviewsTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            reviewsTrack.classList.add('active');
            startX = e.pageX - reviewsTrack.offsetLeft;
            scrollLeft = reviewsTrack.parentElement.scrollLeft;
        });
        reviewsTrack.addEventListener('mouseleave', () => {
            isDown = false;
            reviewsTrack.classList.remove('active');
        });
        reviewsTrack.addEventListener('mouseup', () => {
            isDown = false;
            reviewsTrack.classList.remove('active');
        });
        reviewsTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reviewsTrack.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            reviewsTrack.parentElement.scrollLeft = scrollLeft - walk;
        });
        
        // Allow wheel horizontal
        reviewsTrack.parentElement.style.overflowX = 'auto';
        reviewsTrack.parentElement.style.scrollbarWidth = 'none'; // hide scrollbar
        reviewsTrack.parentElement.addEventListener('wheel', (evt) => {
            // Optional: convert vertical wheel to horizontal if mouse is over it
            // Disabled for now to prevent breaking vertical scroll
        });
    }

    // 9. Contact Form Entrance
    const contactWrapper = document.querySelector('.contact-wrapper');
    if (contactWrapper) {
        gsap.fromTo(contactWrapper.children,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#contact",
                    start: "top 70%"
                }
            }
        );
    }
});
