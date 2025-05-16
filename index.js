(function () {
  // Create the style tag
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;700&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

    body {
      font-family: "Hind Siliguri", sans-serif;
    }

    #notification-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }

    #notification-overlay.show {
      display: flex;
    }

    .notification-content {
      background-color: #fff;
      border: 1px solid #cbd5e0;
      border-radius: 8px;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1),
                  0 4px 6px -1px rgba(0, 0, 0, 0.06);
      padding: 24px;
      width: 100%;
      max-width: 520px;
      position: relative;
      animation: zoomFade 0.6s ease-out both;
    }

    @keyframes zoomFade {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }

    .notification-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      animation: slideDown 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header-logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid #e2e8f0;
      margin-right: 12px;
    }

    .header-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 4px;
    }

    .header-subtitle {
      font-size: 0.75rem;
      color: #718096;
      margin: 0;
    }

    .notification-body {
      font-size: 0.9rem;
      line-height: 1.5;
      color: #4a5568;
      margin-bottom: 20px;
    }

    .body-emphasis {
      font-weight: 600;
      color: #e53e3e;
      display: inline-block;
      animation: pulseWarning 1.5s infinite;
    }

    @keyframes pulseWarning {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }

    .button-container {
      margin-top: 16px;
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: #3182ce;
      color: #fff;
      font-size: 0.95rem;
      font-weight: 600;
      padding: 12px 16px;
      border-radius: 6px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      flex: 1;
      text-align: center;
    }

    .action-button:hover {
      background-color: #2c5282;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .action-icon {
      margin-right: 8px;
    }

    .notification-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background-color: #f6ad55;
      color: #fff;
      padding: 0.4rem 0.6rem;
      font-size: 0.65rem;
      font-weight: 600;
      border-radius: 4px;
      animation: blinkWarning 1.8s infinite;
    }

    @keyframes blinkWarning {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.9; }
    }

    .notification-footer {
      margin-top: 18px;
      font-size: 0.75rem;
      color: #718096;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .footer-link {
      color: #2c5282;
      font-weight: 500;
    }
  `;

  // Add style to head
  document.head.appendChild(style);

  // Create popup HTML
  const html = `
    <div id="notification-overlay">
      <div class="notification-content">
        <div class="notification-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg" class="header-logo" alt="logo" />
          <div>
            <h2 class="header-title">স্বাধীন বাংলা হ্যাকারস সঙ্ঘ</h2>
            <p class="header-subtitle"><i class="fa-solid fa-user-lock action-icon"></i> সাইবার নিরাপত্তা বিভাগ</p>
          </div>
        </div>
        <div class="notification-body">
          <p><strong>গুরুত্বপূর্ণ সতর্কতা:</strong> বাংলাদেশ সরকারের সাইবার নিরাপত্তা বিভাগ সম্প্রতি সাইবার কার্যক্রমের বৃদ্ধি লক্ষ্য করেছে। সকল নাগরিককে তাদের ডিজিটাল সম্পদ এবং ব্যক্তিগত তথ্যের নিরাপত্তা নিশ্চিত করার জন্য বিশেষভাবে অনুরোধ করা হচ্ছে।</p>
          <p>সাম্প্রতিককালে <span class="body-emphasis"><i class="fa-solid fa-fire action-icon"></i>ফিশিং আক্রমণ, ম্যালওয়্যার বিতরণ এবং অননুমোদিত অ্যাক্সেসের</span> প্রচেষ্টা পরিলক্ষিত হচ্ছে।</p>
          <p>সাইবার নিরাপত্তা সংক্রান্ত আরও তথ্যের জন্য আমাদের অফিসিয়াল টেলিগ্রাম চ্যানেলে যুক্ত হোন:</p>
        </div>
        <div class="button-container">
          <a href="https://t.me/thnbangladesh" target="_blank" class="action-button"><i class="fa-brands fa-telegram action-icon"></i>অফিসিয়াল টেলিগ্রাম চ্যানেল</a>
          <button class="action-button" id="dismiss-notification"><i class="fa-solid fa-check action-icon"></i>আমি অবহিত হয়েছি</button>
        </div>
        <div class="notification-badge"><i class="fa-solid fa-fire-flame-curved action-icon fa-shake"></i> জরুরি বিজ্ঞপ্তি</div>
        <footer class="notification-footer">
          <i class="fa-solid fa-terminal"></i> <span>কর্তৃক পরিচালিত</span>
          <a href="#" class="footer-link">The Hacker News - Bangladesh</a>
        </footer>
      </div>
    </div>
  `;

  // Inject HTML into body
  const div = document.createElement("div");
  div.innerHTML = html;
  document.body.appendChild(div);

  // Show and dismiss logic
  window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("notification-overlay");
    const dismissBtn = document.getElementById("dismiss-notification");
    overlay.classList.add("show");

    dismissBtn.addEventListener("click", () => {
      overlay.classList.remove("show");
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("show");
      }
    });
  });
})();
