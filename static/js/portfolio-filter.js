// portfolio-filter.js

const portfolioFilterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // إزالة الفئة النشطة من جميع الأزرار
        portfolioFilterButtons.forEach(btn => btn.classList.remove('active'));
        // إضافة الفئة النشطة إلى الزر الذي تم النقر عليه
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if(filter === 'all' || item.getAttribute('data-category') === filter){
                item.style.display = 'block';
                item.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                item.style.display = 'none';
                item.classList.remove('animate__animated', 'animate__fadeIn');
            }
        });
    });
});
