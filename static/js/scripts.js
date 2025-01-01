// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
    });

    // Toggle Navbar with GSAP Animation
    const checkBox = document.getElementById('check');
    const navLinks = document.querySelectorAll('nav ul li a');

    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            gsap.to('nav ul', { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' });
        } else {
            gsap.to('nav ul', { duration: 0.5, opacity: 0, y: -20, ease: 'power2.in' });
        }
    });

    // Close Navbar on Link Click with GSAP Animation
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 858) {
                gsap.to('nav ul', { duration: 0.5, opacity: 0, y: -20, ease: 'power2.in' });
                checkBox.checked = false;
            }
        });
    });

    // Animate Progress Bars in About Me & Team Section with GSAP
    const aboutSection = document.querySelector('.about-container');
    const progressBars = document.querySelectorAll('.progress');

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100
        );
    };

    const handleScroll = () => {
        if (isInViewport(aboutSection)) {
            // Animate the progress bars
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                gsap.to(bar, { width: progress, duration: 2, ease: 'power2.out' });
            });

            // Remove the scroll event listener after animation
            window.removeEventListener('scroll', handleScroll);
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger the function on load in case the section is already in view
    handleScroll();

    // Initialize Swiper for Projects with Coverflow Effect
    const projectsSwiper = new Swiper('.projects-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
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

    // Experience Timeline Animation with GSAP
    const timelineItems = document.querySelectorAll('.experience-timeline ul li');

    timelineItems.forEach(item => {
        gsap.from(item, {
            opacity: 0,
            x: item.dataset.aos === 'fade-right' ? -100 : 100,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });
    });

    // Contact Form Submission (Optional Enhancement)
    const contactForm = document.querySelector('.contact-form form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // يمكنك إضافة منطق التحقق من صحة النموذج وإرساله هنا
        alert('Thank you for contacting us!');
        contactForm.reset();
    });

    // Initialize AOS (مكرر في نهاية الكود)
    // AOS.init(); // تم تهيئتها في البداية
});

// Language Toggle Script
const toggleButton = document.getElementById('language-toggle');
const htmlElement = document.documentElement;

// تحديد اللغة الافتراضية
let currentLanguage = 'en'; // 'en' للإنجليزية، 'ar' للعربية

// دالة لتغيير اللغة
function switchLanguage() {
    if (currentLanguage === 'en') {
        currentLanguage = 'ar';
        toggleButton.textContent = 'English';
        toggleButton.classList.add('active');
        htmlElement.setAttribute('lang', 'ar');
        htmlElement.setAttribute('dir', 'rtl');
    } else {
        currentLanguage = 'en';
        toggleButton.textContent = 'العربية';
        toggleButton.classList.remove('active');
        htmlElement.setAttribute('lang', 'en');
        htmlElement.setAttribute('dir', 'ltr');
    }

    // تحديث جميع العناصر ذات البيانات النصية
    document.querySelectorAll('[data-en][data-ar]').forEach(element => {
        // تحديث النصوص داخل العناصر
        if(element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
            // تحديث placeholders
            if(element.placeholder) {
                element.placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`) || element.placeholder;
            }
        }

        if(element.tagName.toLowerCase() === 'img') {
            // تحديث alt attributes
            if(element.alt) {
                element.alt = element.getAttribute(`data-${currentLanguage}-alt`) || element.alt;
            }
        }

        // تحديث النصوص داخل العناصر
        element.textContent = element.getAttribute(`data-${currentLanguage}`) || element.textContent;

        // تحديث النصوص داخل العناصر التي تحتوي على HTML (مثل الفقرات مع الروابط)
        if(element.tagName.toLowerCase() === 'p' || element.tagName.toLowerCase() === 'a') {
            const childLinks = element.querySelectorAll('a');
            childLinks.forEach(link => {
                link.textContent = link.getAttribute(`data-${currentLanguage}`) || link.textContent;
            });
        }
    });
}

// إضافة مستمع للزر
toggleButton.addEventListener('click', () => {
    switchLanguage();
    // حفظ اللغة المختارة في localStorage
    localStorage.setItem('language', currentLanguage);
});

// تحميل اللغة المحفوظة في localStorage إذا كانت موجودة
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        if (currentLanguage === 'ar') {
            toggleButton.textContent = 'English';
            toggleButton.classList.add('active');
            htmlElement.setAttribute('lang', 'ar');
            htmlElement.setAttribute('dir', 'rtl');
        } else {
            toggleButton.textContent = 'العربية';
            toggleButton.classList.remove('active');
            htmlElement.setAttribute('lang', 'en');
            htmlElement.setAttribute('dir', 'ltr');
        }

        // تحديث النصوص
        document.querySelectorAll('[data-en][data-ar]').forEach(element => {
            // تحديث النصوص داخل العناصر
            if(element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                // تحديث placeholders
                if(element.placeholder) {
                    element.placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`) || element.placeholder;
                }
            }

            if(element.tagName.toLowerCase() === 'img') {
                // تحديث alt attributes
                if(element.alt) {
                    element.alt = element.getAttribute(`data-${currentLanguage}-alt`) || element.alt;
                }
            }

            // تحديث النصوص داخل العناصر
            element.textContent = element.getAttribute(`data-${currentLanguage}`) || element.textContent;

            // تحديث النصوص داخل العناصر التي تحتوي على HTML (مثل الفقرات مع الروابط)
            if(element.tagName.toLowerCase() === 'p' || element.tagName.toLowerCase() === 'a') {
                const childLinks = element.querySelectorAll('a');
                childLinks.forEach(link => {
                    link.textContent = link.getAttribute(`data-${currentLanguage}`) || link.textContent;
                });
            }
        });
    }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
button.addEventListener('click', () => {
// إزالة الحالة النشطة عن الأزرار
filterButtons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');

const filterValue = button.getAttribute('data-filter');

projectCards.forEach(card => {
    const category = card.getAttribute('data-category');
    if (filterValue === 'all' || category === filterValue) {
    card.style.display = 'block';
    } else {
    card.style.display = 'none';
    }
});
});
});

document.addEventListener('DOMContentLoaded', function() {

    // 1) الحصول على الأزرار
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 2) الحصول على جميع الكروت
    const projectCards = document.querySelectorAll('.project-card');

    // 3) حدث الضغط على الزر
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {

        // أ) إزالة active من كل الأزرار
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // ب) إضافة active للزر الذي تم الضغط عليه
        button.classList.add('active');

        // ج) معرفة قيمة الفلتر لهذا الزر
        const filterValue = button.getAttribute('data-filter');

        // د) التكرار على الكروت لمقارنتها
        projectCards.forEach(card => {
          // قراءة التصنيف من الكرت
          const category = card.getAttribute('data-category');

          // إذا كان الفلتر = all أو كان يطابق التصنيف -> نظهر
          if (filterValue === 'all' || filterValue === category) {
            card.style.display = 'block';
          } else {
            // خلاف ذلك -> نخفي
            card.style.display = 'none';
          }
        });
      });
    });
    
  });

  // scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // الحصول على عناصر المودال
    const modal = document.getElementById('memberModal');
    const closeButton = document.querySelector('.close-button');
    const modalName = document.getElementById('modalName');
    const modalEducationLabel = document.getElementById('modalEducationLabel');
    const modalEducation = document.getElementById('modalEducation');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalImage');
    const modalFacebook = document.getElementById('modalFacebook');
    const modalLinkedin = document.getElementById('modalLinkedin');
    const modalInstagram = document.getElementById('modalInstagram');
    const modalTwitter = document.getElementById('modalTwitter');
    
    // تحديد لغة الموقع
    const isEnglish = document.documentElement.lang === 'en';
    modalEducationLabel.textContent = isEnglish ? 'Education:' : 'التعليم:';
    
    // الحصول على جميع أزرار "View More"
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');
    
    viewMoreButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // الحصول على البيانات من الزر
            const name = isEnglish ? this.dataset.nameEn : this.dataset.nameAr;
            const education = isEnglish ? this.dataset.educationEn : this.dataset.educationAr;
            const description = isEnglish ? this.dataset.descriptionEn : this.dataset.descriptionAr;
            const socialFacebook = this.dataset.socialFacebook;
            const socialLinkedin = this.dataset.socialLinkedin;
            const socialInstagram = this.dataset.socialInstagram;
            const socialTwitter = this.dataset.socialTwitter;
            const imageSrc = this.parentElement.parentElement.querySelector('.card-img').getAttribute('src');
            const imageAlt = isEnglish ? this.dataset.nameEn : this.dataset.nameAr;
            
            // تعبئة بيانات المودال
            modalName.textContent = name;
            modalEducation.textContent = education;
            modalDescription.textContent = description;
            modalImage.src = imageSrc;
            modalImage.alt = imageAlt;
            
            // تعبئة روابط التواصل الاجتماعي
            if(socialFacebook) {
                modalFacebook.href = socialFacebook;
                modalFacebook.style.display = 'inline-block';
            } else {
                modalFacebook.style.display = 'none';
            }
            
            if(socialLinkedin) {
                modalLinkedin.href = socialLinkedin;
                modalLinkedin.style.display = 'inline-block';
            } else {
                modalLinkedin.style.display = 'none';
            }
            
            if(socialInstagram) {
                modalInstagram.href = socialInstagram;
                modalInstagram.style.display = 'inline-block';
            } else {
                modalInstagram.style.display = 'none';
            }
            
            if(socialTwitter) {
                modalTwitter.href = socialTwitter;
                modalTwitter.style.display = 'inline-block';
            } else {
                modalTwitter.style.display = 'none';
            }
            
            // عرض المودال
            modal.style.display = 'flex';
        });
    });
    
    // إغلاق المودال عند النقر على زر الإغلاق
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // إغلاق المودال عند النقر خارج محتوى المودال
    window.addEventListener('click', function(event) {
        if(event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
