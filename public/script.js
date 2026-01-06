/* =========================================================
   MIT FGC CHATBOT — FRONTEND CONTROLLER
   FULL UI TRANSLATION + STOCK RESPONSES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENT REFERENCES
  ===================================================== */

  const toggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const closeBtn = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");
  const typing = document.getElementById("typing-indicator");
  const langSelect = document.getElementById("chat-lang");

  chatbox.style.display = "none";

  /* =====================================================
     LANGUAGE STATE
  ===================================================== */

  let currentLang = "en";

  /* =====================================================
     UI TRANSLATION DICTIONARY (I18N)
     EVERYTHING STATIC IS HERE
  ===================================================== */

  const I18N = {
    en: {
      ask_ai: "Ask MIT AI",
      chat_title: "MIT FGC AI",
      greeting:
        "Hello 👋 I’m the MIT First Grade College chatbot. You can ask about admissions, courses, eligibility, faculty, campus life, or anything related to studies.",
      admissions: "Admissions",
      courses: "Courses",
      typing: "AI is thinking…",
      input_placeholder: "Ask about admissions, courses, campus life…",

      stock: {
        admissions:
          "📝 Admissions at MIT First Grade College are based on merit as per University of Mysore guidelines.",
        courses:
          "🎓 MIT First Grade College offers undergraduate programs such as BCA, B.Com, and BBA under the University of Mysore."
      },

      errors: {
        server: "Server error. Please try again.",
        empty: "Please type your question."
      }
    },

    kn: {
      ask_ai: "MIT AI ಅನ್ನು ಕೇಳಿ",
      chat_title: "MIT FGC AI",
      greeting:
        "ನಮಸ್ಕಾರ 👋 ನಾನು MIT ಫಸ್ಟ್ ಗ್ರೇಡ್ ಕಾಲೇಜ್ ಚಾಟ್‌ಬಾಟ್. ಪ್ರವೇಶ, ಕೋರ್ಸ್‌ಗಳು, ಅರ್ಹತೆ, ಅಧ್ಯಾಪಕರು, ಕ್ಯಾಂಪಸ್ ಜೀವನ ಅಥವಾ ಅಧ್ಯಯನಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಬಹುದು.",
      admissions: "ಪ್ರವೇಶ",
      courses: "ಕೋರ್ಸ್‌ಗಳು",
      typing: "AI ಯೋಚಿಸುತ್ತಿದೆ…",
      input_placeholder: "ಪ್ರವೇಶ, ಕೋರ್ಸ್‌ಗಳು, ಕ್ಯಾಂಪಸ್ ಜೀವನದ ಬಗ್ಗೆ ಕೇಳಿ…",

      stock: {
        admissions:
          "📝 MIT ಫಸ್ಟ್ ಗ್ರೇಡ್ ಕಾಲೇಜ್‌ನಲ್ಲಿ ಪ್ರವೇಶವು ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯದ ಮಾರ್ಗಸೂಚಿಗಳ ಪ್ರಕಾರ ಮೆರಿಟ್ ಆಧಾರಿತವಾಗಿರುತ್ತದೆ.",
        courses:
          "🎓 MIT ಫಸ್ಟ್ ಗ್ರೇಡ್ ಕಾಲೇಜ್ ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯದ ಅಡಿಯಲ್ಲಿ BCA, B.Com ಮತ್ತು BBA ಪದವಿ ಕೋರ್ಸ್‌ಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ."
      },

      errors: {
        server: "ಸರ್ವರ್ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
        empty: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ."
      }
    },

    hi: {
      ask_ai: "MIT AI से पूछें",
      chat_title: "MIT FGC AI",
      greeting:
        "नमस्ते 👋 मैं MIT फर्स्ट ग्रेड कॉलेज चैटबॉट हूँ। आप प्रवेश, पाठ्यक्रम, पात्रता, फैकल्टी, कैंपस जीवन या पढ़ाई से जुड़े सवाल पूछ सकते हैं।",
      admissions: "प्रवेश",
      courses: "कोर्स",
      typing: "AI सोच रहा है…",
      input_placeholder: "प्रवेश, कोर्स, कैंपस जीवन के बारे में पूछें…",

      stock: {
        admissions:
          "📝 MIT फर्स्ट ग्रेड कॉलेज में प्रवेश मैसूर विश्वविद्यालय के दिशा-निर्देशों के अनुसार मेरिट के आधार पर होता है।",
        courses:
          "🎓 MIT फर्स्ट ग्रेड कॉलेज मैसूर विश्वविद्यालय के अंतर्गत BCA, B.Com और BBA स्नातक कोर्स प्रदान करता है।"
      },

      errors: {
        server: "सर्वर त्रुटि। कृपया पुनः प्रयास करें।",
        empty: "कृपया अपना प्रश्न दर्ज करें।"
      }
    }
  };

  /* =====================================================
     UI TRANSLATION ENGINE
  ===================================================== */

  function translateUI(lang) {
    const dict = I18N[lang] || I18N.en;

    // text nodes
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });

    // placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) el.placeholder = dict[key];
    });
  }

  /* =====================================================
     CHAT VISIBILITY
  ===================================================== */

  toggle.onclick = () => {
    chatbox.style.display =
      chatbox.style.display === "none" ? "flex" : "none";
  };

  closeBtn.onclick = () => {
    chatbox.style.display = "none";
  };

  /* =====================================================
     LANGUAGE CHANGE
  ===================================================== */

  langSelect.onchange = () => {
    currentLang = langSelect.value;
    translateUI(currentLang);
  };

  translateUI(currentLang);

  /* =====================================================
     MESSAGE HANDLING
  ===================================================== */

  sendBtn.onclick = sendMessage;
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) {
      addMessage(I18N[currentLang].errors.empty, "bot");
      return;
    }

    addMessage(text, "user");
    input.value = "";
    setLoading(true);

    // send to backend (AI will translate + answer later)
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        language: currentLang
      })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        addMessage(data.reply || I18N[currentLang].errors.server, "bot", data.links || []);
      })
      .catch(() => {
        setLoading(false);
        addMessage(I18N[currentLang].errors.server, "bot");
      });
  }

  /* =====================================================
     QUICK ACTIONS (STOCK RESPONSES)
  ===================================================== */

  document.addEventListener("click", e => {
    const btn = e.target.closest(".quick-btn");
    if (!btn) return;

    const action = btn.dataset.action;
    const reply = I18N[currentLang].stock[action];

    if (reply) {
      addMessage(reply, "bot");
    }
  });

  /* =====================================================
     UI HELPERS
  ===================================================== */

  function setLoading(state) {
    typing.classList.toggle("hidden", !state);
    sendBtn.disabled = state;
    input.disabled = state;
  }

  function addMessage(text, type, links = []) {
    const div = document.createElement("div");
    div.className = `message ${type}`;

    const textNode = document.createElement("div");
    textNode.className = "message-text";
    textNode.textContent = text;

    div.appendChild(textNode);

    if (links.length) {
      const wrap = document.createElement("div");
      wrap.className = "quick-actions";

      links.forEach(l => {
        const b = document.createElement("button");
        b.className = "quick-btn";
        b.textContent = l.label;
        b.onclick = () => window.open(l.url, "_blank");
        wrap.appendChild(b);
      });

      div.appendChild(wrap);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

});
