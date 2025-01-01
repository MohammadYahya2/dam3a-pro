// counters.js

const counters = document.querySelectorAll('.counter');
const speed = 200; // كلما زادت القيمة، كان العد أبطأ

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        const count = parseInt(counter.innerText) || 0; // استخدام parseInt لتجاهل الأحرف غير الرقمية
        
        const inc = target / speed;
        
        if(count < target){
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCount();
});
