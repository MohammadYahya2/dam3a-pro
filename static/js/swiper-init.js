// swiper-init.js

// تهيئة Swiper لأقسام مختلفة

// Swiper لقسم About
const aboutSwiper = new Swiper('.about-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    centeredSlides: false,
    grabCursor: true,
    pagination: {
        el: '.about-swiper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.about-swiper .swiper-button-next',
        prevEl: '.about-swiper .swiper-button-prev',
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        520: { slidesPerView: 2 },
        950: { slidesPerView: 3 },
    },
});

// Swiper لقسم Testimonials
const testimonialsSwiper = new Swiper('.testimonials-slider.swiper-container', {
    loop: true,
    pagination: {
        el: '.testimonials-slider .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.testimonials-slider .swiper-button-next',
        prevEl: '.testimonials-slider .swiper-button-prev',
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// Swiper لقسم Projects & Experience
const projectsExperienceSwiper = new Swiper('.projects-experience-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    pagination: {
        el: '.projects-experience-swiper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.projects-experience-swiper .swiper-button-next',
        prevEl: '.projects-experience-swiper .swiper-button-prev',
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        520: { slidesPerView: 2 },
        950: { slidesPerView: 3 },
    },
});
portfolio-filter.js