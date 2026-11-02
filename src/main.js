// import { Spinner } from "./spin.js";

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        e.preventDefault();
        previousPage();
    }

    if (e.code === "ArrowRight") {
        e.preventDefault();
        nextPage();
    }
});

const pages = [
    "index.html",
    "aboutme.html",
    "portfolio.html",
    "resume.html",
    "contact.html"
];

function getCurrentPage() {
    return window.location.pathname.split("/").pop();
}

function nextPage() {
    const currentPage = pages.indexOf(getCurrentPage());

    if (currentPage < pages.length - 1) {
        window.location.href = pages[currentPage + 1];
    }
}

function previousPage() {
    const currentPage = pages.indexOf(getCurrentPage());

    if (currentPage > 0) {
        window.location.href = pages[currentPage - 1];
    }
}


window.addEventListener("DOMContentLoaded", () => {

    const overlay = document.querySelector(".g-loading-overlay");
    const page = document.querySelector("#p-page");

    let spinner = new Spinner({
        color: "#ffffff",
        lines: 10
    }).spin(overlay);

    function hideLoading() {
        spinner.stop();
        overlay.style.display = "none";
        page.classList.add("loaded");
    }

    function showLoading() {
        overlay.style.display = "block";

        spinner = new Spinner({
            color: "#ffffff",
            lines: 10
        }).spin(overlay);

        page.classList.remove("loaded");
    }

    window.addEventListener("load", hideLoading);

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", showLoading);
    });

});