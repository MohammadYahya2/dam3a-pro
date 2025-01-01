// back-to-top.js

const backToTopButton = document.getElementById('back-to-top');

// إظهار الزر عند التمرير أكثر من 300px
window.addEventListener('scroll', () => {
    if(window.pageYOffset > 300){
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// التمرير السلس إلى الأعلى عند النقر على الزر
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
