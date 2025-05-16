// notification.js
(function () {
  // Function to dynamically load external CSS
  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  // Function to dynamically load external JS
  function loadJS(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Load required CSS files
  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
  loadCSS('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;700&display=swap');

  // Create and append custom styles
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-family: 'Hind Siliguri', sans-serif;
    }
    /* Add your custom CSS styles here */
  `;
  document.head.appendChild(style);

  // Create notification HTML structure
  const notificationHTML = `
    <div id="notification-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5); justify-content:center; align-items:center; z-index:10000;">
      <div style="background-color:#fff; border-radius:8px; padding:24px; max-width:520px; width:100%; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <div style="display:flex; align-items:center; margin-bottom:16px;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg" alt="logo" style="width:40px; height:40px; border-radius:50%; margin-right:12px;" />
          <div>
            <h2 style="margin:0; font-size:1.25rem; font-weight:700;">স্বাধীন বাংলা হ্যাকারস সঙ্ঘ</h2>
            <p style="margin:0; font-size:0.75rem; color:#718096;"><i class="fa-solid fa-user-lock"></i> সাইবার নিরাপত্তা বিভাগ</p>
          </div>
        </div>
        <div style="font-size:0.9rem; line-height:1.5; color:#4a5568; margin-bottom:20px;">
          <p><strong>গুরুত্বপূর্ণ সতর্কতা:</strong> বাংলাদেশ সরকারের সাইবার নিরাপত্তা বিভাগ সম্প্রতি সাইবার কার্যক্রমের বৃদ্ধি লক্ষ্য করেছে। সকল নাগরিককে তাদের ডিজিটাল সম্পদ এবং ব্যক্তিগত তথ্যের নিরাপত্তা নিশ্চিত করার জন্য বিশেষভাবে অনুরোধ করা হচ্ছে।</p>
          <p>সাম্প্রতিককালে <span style="font-weight:600; color:#e53e3e;"><i class="fa-solid fa-fire"></i> ফিশিং আক্রমণ, ম্যালওয়্যার বিতরণ এবং অননুমোদিত অ্যাক্সেসের</span> প্রচেষ্টা পরিলক্ষিত হচ্ছে।</p>
          <p>সাইবার নিরাপত্তা সংক্রান্ত আরও তথ্যের জন্য আমাদের অফিসিয়াল টেলিগ্রাম চ্যানেলে যুক্ত হোন:</p>
        </div>
        <div style="display:flex; gap:12px; margin-top:16px;">
          <a href="https://t.me/thnbangladesh" target="_blank" style="flex:1; text-align:center; background-color:#3182ce; color:#fff; padding:12px 16px; border-radius:6px; text-decoration:none; font-weight:600;"><i class="fa-brands fa-telegram"></i> অফিসিয়াল টেলিগ্রাম চ্যানেল</a>
          <button id="dismiss-notification" style="flex:1; background-color:#3182ce; color:#fff; padding:12px 16px; border:none; border-radius:6px; font-weight:600; cursor:pointer;"><i class="fa-solid fa-check"></i> আমি অবহিত হয়েছি</button>
        </div>
        <div style="position:absolute; top:12px; right:12px; background-color:#f6ad55; color:#fff; padding:0.4rem 0.6rem; font-size:0.65rem; font-weight:600; border-radius:4px;">
          <i class="fa-solid fa-fire-flame-curved"></i> জরুরি বিজ্ঞপ্তি
        </div>
        <footer style="margin-top:18px; font-size:0.75rem; color:#718096; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-terminal"></i> <span>কর্তৃক পরিচালিত</span>
          <a href="#" style="color:#2c5282; font-weight:500;">The Hacker News - Bangladesh</a>
        </footer>
      </div>
    </div>
  `;

  // Append notification to body
  const div = document.createElement('div');
  div.innerHTML = notificationHTML;
  document.body.appendChild(div);

  // Show and dismiss logic
  window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('notification-overlay');
    const dismissBtn = document.getElementById('dismiss-notification');
    overlay.style.display = 'flex';

    dismissBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });
})();
