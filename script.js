const toggleBtn = document.getElementsByClassName("toggle-btn")[0];
const mobileNav = document.getElementsByClassName("nav-container")[0];

toggleBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active")

    toggleBtn.innerHTML = mobileNav.classList.contains("active")
        ? '<i class="fa fa-times"></i>'
    : '<i class="fa fa-bars"></i>';
})
