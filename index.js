// notification.js
// <script src="https://cdn.jsdelivr.net/gh/FrostFoe/localhost/index.js"></script>
// Immediately Invoked Function Expression (IIFE) to encapsulate the code and prevent global scope pollution.
(function () {
  /**
   * Dynamically loads an external CSS file into the document's head.
   * @param {string} href - The URL of the CSS file to load.
   */
  function loadCSS(href) {
    const link = document.createElement('link'); // Create a new <link> element.
    link.rel = 'stylesheet'; // Set the 'rel' attribute to 'stylesheet' to indicate it's a CSS file.
    link.href = href; // Set the 'href' attribute to the URL of the CSS file.
    document.head.appendChild(link); // Append the <link> element to the <head> of the document, triggering the CSS to load.
  }

  /**
   * Dynamically loads an external JavaScript file into the document's head.
   * @param {string} src - The URL of the JavaScript file to load.
   * @param {function} [callback] - An optional function to execute after the script has loaded.
   */
  function loadJS(src, callback) {
    const script = document.createElement('script'); // Create a new <script> element.
    script.src = src; // Set the 'src' attribute to the URL of the JavaScript file.
    script.onload = callback; // Set the 'onload' event handler to the provided callback function, which will be executed once the script has finished loading.
    document.head.appendChild(script); // Append the <script> element to the <head> of the document, triggering the JavaScript to load and execute.
  }

  // Load required CSS files from CDNs (Content Delivery Networks) for better performance and wider availability.
  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'); // Loads Font Awesome icons.
  loadCSS('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;700&display=swap'); // Loads the Hind Siliguri font from Google Fonts.

  // Create and append custom inline styles to the document's head.
  const style = document.createElement('style'); // Create a new <style> element.
  style.textContent = `
    body {
      font-family: 'Hind Siliguri', sans-serif; /* Sets the default font for the entire body. */
    }
    /* Add your custom CSS styles here if needed. For more complex styling, consider using a separate CSS file. */
  `;
  document.head.appendChild(style); // Append the <style> element to the <head>, applying the defined styles.

  // Create the HTML structure for the notification.
  const notificationHTML = `
    <div id="notification-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5); justify-content:center; align-items:center; z-index:10000;">
      <div style="background-color:#fff; border-radius:8px; padding:24px; max-width:520px; width:100%; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <div style="display:flex; align-items:center; margin-bottom:16px;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg" alt="বাংলাদেশ সরকারের প্রতীক" style="width:40px; height:40px; border-radius:50%; margin-right:12px;" />
          <div>
            <h2 style="margin:0; font-size:1.25rem; font-weight:700;">স্বাধীন বাংলা হ্যাকারস সঙ্ঘ</h2>
            <p style="margin:0; font-size:0.75rem; color:#718096;"><i class="fa-solid fa-user-lock"></i> সাইবার নিরাপত্তা বিভাগ</p>
          </div>
        </div>
        <div style="font-size:0.9rem; line-height:1.5; color:#4a5568; margin-bottom:20px;">
          <p><strong>জরুরি ঘোষণা:</strong> বাংলাদেশ সরকারের সাইবার নিরাপত্তা বিভাগ সম্প্রতি অনলাইন কার্যক্রমে অনাকাঙ্ক্ষিত বৃদ্ধি পর্যবেক্ষণ করেছে। এই প্রেক্ষাপটে, সকল সম্মানিত নাগরিককে তাদের ডিজিটাল সম্পদ এবং ব্যক্তিগত তথ্যের সুরক্ষা নিশ্চিত করার জন্য বিশেষভাবে অনুরোধ জানানো হচ্ছে।</p>
          <p>সাম্প্রতিক সময়ে <span style="font-weight:600; color:#e53e3e;"><i class="fa-solid fa-fire"></i> ফিশিং আক্রমণ, ক্ষতিকর সফটওয়্যার (ম্যালওয়্যার) বিতরণ এবং অবৈধ অনুপ্রবেশের</span> অপচেষ্টা পরিলক্ষিত হচ্ছে।</p>
          <p>সাইবার নিরাপত্তা সম্পর্কিত আরও গুরুত্বপূর্ণ তথ্যের জন্য, আমাদের অফিসিয়াল টেলিগ্রাম চ্যানেলে যুক্ত হওয়ার জন্য অনুরোধ করা হচ্ছে:</p>
        </div>
        <div style="display:flex; gap:12px; margin-top:16px;">
          <a href="https://t.me/thnbangladesh" target="_blank" style="flex:1; text-align:center; background-color:#3182ce; color:#fff; padding:12px 16px; border-radius:6px; text-decoration:none; font-weight:600;"><i class="fa-brands fa-telegram"></i> অফিসিয়াল টেলিগ্রাম চ্যানেল</a>
          <button id="dismiss-notification" style="flex:1; background-color:#3182ce; color:#fff; padding:12px 16px; border:none; border-radius:6px; font-weight:600; cursor:pointer;"><i class="fa-solid fa-check"></i> অবহিত হয়েছি</button>
        </div>
        <div style="position:absolute; top:12px; right:12px; background-color:#f6ad55; color:#fff; padding:0.4rem 0.6rem; font-size:0.65rem; font-weight:600; border-radius:4px;">
          <i class="fa-solid fa-fire-flame-curved"></i> জরুরি বিজ্ঞপ্তি
        </div>
        <footer style="margin-top:18px; font-size:0.75rem; color:#718096; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-terminal"></i> <span>কর্তৃক পরিচালিত</span>
          <a href="#" style="color:#2c5282; font-weight:500;">The Hacker News - বাংলাদেশ</a>
        </footer>
      </div>
    </div>
  `;

  // Append the generated HTML structure to the document's body.
  const div = document.createElement('div'); // Create a new <div> element.
  div.innerHTML = notificationHTML; // Set the inner HTML of the <div> to the notification HTML.
  document.body.appendChild(div); // Append the <div> (containing the notification) to the end of the document's body.

  // Logic to show and dismiss the notification.
  window.addEventListener('DOMContentLoaded', () => {
    // This event listener ensures that the code inside it runs only after the entire HTML document has been fully loaded and parsed.

    const overlay = document.getElementById('notification-overlay'); // Get a reference to the notification overlay element by its ID.
    const dismissBtn = document.getElementById('dismiss-notification'); // Get a reference to the dismiss button element by its ID.

    // Initially show the notification overlay.
    if (overlay) {
      overlay.style.display = 'flex'; // Set the display style to 'flex' to make the overlay visible and center its content.
    }

    // Add an event listener to the dismiss button to hide the notification when clicked.
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        if (overlay) {
          overlay.style.display = 'none'; // Set the display style to 'none' to hide the overlay.
        }
      });
    }

    // Add an event listener to the overlay itself to allow closing the notification by clicking outside the main content area.
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          // If the clicked element is the overlay itself (and not its children), hide the overlay.
          overlay.style.display = 'none';
        }
      });
    }
  });
})();
