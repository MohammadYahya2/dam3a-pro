// tilt-init.js

document.addEventListener('DOMContentLoaded', () => {
    VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
    });
});
