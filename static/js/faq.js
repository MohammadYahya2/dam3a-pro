// faq.js

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // إغلاق جميع الأجوبة المفتوحة
            faqItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                    i.querySelector('.faq-answer').style.display = 'none';
                }
            });

            // تبديل الفئة النشطة للعنصر الحالي
            item.classList.toggle('active');

            // تبديل عرض الجواب
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });
});
