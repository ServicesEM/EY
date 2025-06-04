(function () {
    function applyFlightsBookingStyles() {
        const mainElement = document.getElementById("main");
        if (
            mainElement &&
            mainElement.firstElementChild &&
            mainElement.firstElementChild.classList.contains("FlightsBooking")
        ) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://servicesem.github.io/EY/CSS/BMredesign.css";
            link.type = "text/css";
            document.head.appendChild(link);
        }
    }
    if (document.readyState === "complete" || document.readyState === "interactive") {
        applyFlightsBookingStyles();
    } else {
        document.addEventListener("DOMContentLoaded", applyFlightsBookingStyles);
    }
})();
