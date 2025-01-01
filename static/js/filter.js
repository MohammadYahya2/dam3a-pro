// filter.js

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة للزر الحالي
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.transition = 'all 0.3s ease';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    card.style.transition = 'all 0.3s ease';
                }
            });
        });
    });
});
