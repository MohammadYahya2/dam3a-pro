// smooth-scrolling.js

// التمرير السلس لروابط التنقل
document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            window.scrollTo({
                top: target.offsetTop - 80, // تعديل بناءً على ارتفاع الـ header
                behavior: 'smooth'
            });
        }
    });
});
