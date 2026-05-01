import { Spinner } from "./spin.js";

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