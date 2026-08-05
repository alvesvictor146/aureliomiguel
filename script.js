// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ── Contact Video: Slow Motion ──────────────────────────────────────────────
const contactVideo = document.getElementById('contactVideo');
if (contactVideo) {
    // Set slow-motion playback: 0.35x speed (35% of normal)
    contactVideo.playbackRate = 0.35;

    // Guarantee playbackRate persists after browser buffering events
    contactVideo.addEventListener('canplay', () => { contactVideo.playbackRate = 0.35; });
    contactVideo.addEventListener('ratechange', () => {
        if (contactVideo.playbackRate !== 0.35) contactVideo.playbackRate = 0.35;
    });

    // Fade the video in smoothly after metadata loads
    contactVideo.addEventListener('loadedmetadata', () => {
        gsap.fromTo(contactVideo,
            { opacity: 0 },
            { opacity: 0.45, duration: 2.5, ease: 'power2.inOut' }
        );
    });
}
// ──────────────────────────────────────────────────────────────────────────────

// Custom Cursor & Mouse Follow
const cursor = document.querySelector('.cursor');
const hoverElements = document.querySelectorAll('a, button, .service-card, .work-item');

document.addEventListener('mousemove', (e) => {
    // Smooth cursor follow
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
    });
});

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Magnetic Buttons
const magnetics = document.querySelectorAll('.magnetic');

magnetics.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        // Calculate distance from center
        const x = (e.clientX - rect.left) - rect.width / 2;
        const y = (e.clientY - rect.top) - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Text Reveal Animation (Line/Block Reveal)
const revealTexts = document.querySelectorAll('.reveal-text');
revealTexts.forEach(text => {
    // We animate the entire block from the bottom with opacity
    gsap.fromTo(text, 
        { y: 80, opacity: 0 }, 
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
            }
        }
    );
});

// Blur Reveal
const blurElements = document.querySelectorAll('.blur-reveal');
blurElements.forEach(el => {
    gsap.fromTo(el,
        { filter: 'blur(15px)', opacity: 0, y: 40 },
        {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            }
        }
    );
});

// Parallax Scroll Effect
gsap.to('.parallax-img', {
    yPercent: 20, // Move image 20% down during scroll
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// 3D Hover Effect
const cards3d = document.querySelectorAll('.3d-hover');
cards3d.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on cursor position
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
});

// Removed external carousel navigation
