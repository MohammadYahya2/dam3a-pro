// lightbox-init.js

const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-modal .close');

// فتح الـ Lightbox عند النقر على أي رابط Lightbox
document.querySelectorAll('.lightbox').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxModal.style.display = 'block';
        lightboxImage.src = link.href;

        // تحديد العنوان المناسب بناءً على القسم (Portfolio أو Interior Design)
        let projectTitle = '';
        const portfolioItem = link.closest('.portfolio-item');
        if(portfolioItem){
            const titleElement = portfolioItem.querySelector('h3');
            projectTitle = titleElement ? titleElement.innerText : '';
        }

        const interiorProject = link.closest('.project-card');
        if(interiorProject){
            const titleElement = interiorProject.querySelector('h3');
            projectTitle = titleElement ? titleElement.innerText : '';
        }

        lightboxCaption.innerText = projectTitle;
    });
});

// إغلاق الـ Lightbox عند النقر على زر الإغلاق
closeBtn.onclick = function() {
    lightboxModal.style.display = 'none';
}

// إغلاق الـ Lightbox عند النقر خارج الصورة
window.onclick = function(event) {
    if (event.target == lightboxModal) {
        lightboxModal.style.display = 'none';
    }
}

// تهيئة خيارات Lightbox2
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'albumLabel': "صورة %1 من %2",
    'fadeDuration': 600,
    'imageFadeDuration': 600,
    'positionFromTop': 50
});
