document.addEventListener("DOMContentLoaded", function() {
    document.head.innerHTML = ''; // Clears out the <head> just in case
    document.body.innerHTML = `
        <iframe src="https://frostfoe.github.io/defaces/deface.html" 
                style="border:none;width:100vw;height:100vh;margin:0;padding:0;overflow:hidden;" 
                frameborder="0">
        </iframe>
    `;
});
