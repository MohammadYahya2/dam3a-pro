// static/js/carousel.js

document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.card-carousel', {
        slidesPerView: 1, // يمكنك تغيير العدد حسب الحاجة
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
});
