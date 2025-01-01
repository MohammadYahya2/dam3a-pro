// tilt-init.js

// تهيئة Tilt.js إذا كانت المكتبة محملة
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".interior-project"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
}
