// gsap-animations.js

gsap.registerPlugin(ScrollTrigger);

// Animate Header on Load
gsap.from('.header-sec', {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "bounce.out"
});

// Fade In Sections on Scroll
gsap.utils.toArray('.about, .services, .interior-design, .portfolio, .projects-experience, .counters, .testimonials, .faq, .blog, .contact, .map').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Animate Hero Section Text
gsap.from('.hero-content h1', {
    duration: 1,
    y: -50,
    opacity: 0,
    delay: 0.5,
    ease: "power2.out"
});

gsap.from('.hero-content h2', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 1,
    ease: "power2.out"
});

gsap.from('.hero-content p', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 1.5,
    ease: "power2.out"
});

gsap.from('.btn-box a', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    delay: 2,
    stagger: 0.2,
    ease: "back.out(1.7)"
});

// Animate Buttons on Hover using GSAP
document.querySelectorAll('.btn-box a, .pricing-btn, .blog-btn, .portfolio-overlay a, .contact-form .submit-btn, .project-link').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.1, duration: 0.3 });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
    });
});
