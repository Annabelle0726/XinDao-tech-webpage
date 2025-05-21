// scroll top

window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        header.classList.remove("transparent");
    } else {
        header.classList.remove("scrolled");
        header.classList.add("transparent");
    }
});