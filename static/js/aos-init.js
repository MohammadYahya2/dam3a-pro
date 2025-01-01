// aos-init.js

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS === 'undefined') {
        console.error('AOS غير محمل بشكل صحيح.');
        return;
    }

    AOS.init({
        duration: 1000, // مدة الرسوم المتحركة بالمللي ثانية
        easing: 'ease-in-out', // نوع التسهيل
        once: true, // الرسوميات تتحرك مرة واحدة عند التمرير
        mirror: false, // الرسوميات لا تتحرك عند التمرير للأعلى
    });
});
