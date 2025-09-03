document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector("#menu");
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector("header");
    const blurEffect = document.querySelector(".blur-effect");

    // Toggle navigation menu on mobile
    menuIcon.addEventListener("click", (e) => {
        e.preventDefault();
        navbar.classList.toggle("open");
    });

    // Add blur effect on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Update the position of the blur-effect based on mouse movement
    document.addEventListener("mousemove", (event) => {
        const x = event.pageX;
        const y = event.pageY;
        blurEffect.style.left = `${x}px`;
        blurEffect.style.top = `${y}px`;
    });
});
