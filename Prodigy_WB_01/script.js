document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector("#menu");
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector("header");

    // Toggle navigation menu on mobile
    menuIcon.addEventListener("click", () => {
        // Toggle the 'open' class for the navbar
        navbar.classList.toggle("open");

        // Toggle display fallback if needed
        if (navbar.style.display === "flex") {
            navbar.style.display = "none";
        } else {
            navbar.style.display = "flex";
        }
    });

    // Add blur effect on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) { // Add blur if scrolled more than 50px
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    const blurEffect = document.querySelector(".blur-effect");

    // Update the position of the blur-effect based on mouse movement
    document.addEventListener("mousemove", (event) => {
        const x = event.pageX;
        const y = event.pageY;

        // Move the blur effect to follow the mouse
        blurEffect.style.left = `${x}px`;
        blurEffect.style.top = `${y}px`;
    });
});
