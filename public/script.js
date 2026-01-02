document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const closeBtn = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");

  // initial state
  chatbox.style.display = "none";

  // toggle open/close
  toggle.addEventListener("click", () => {
    chatbox.style.display =
      chatbox.style.display === "none" ? "flex" : "none";
  });

  // close button
  closeBtn.addEventListener("click", () => {
    chatbox.style.display = "none";
  });

  // send message
  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    })
      .then(res => res.json())
      .then(data => {
        addMessage(data.reply, "bot", data.links || []);
      })
      .catch(() => addMessage("Server error.", "bot"));
  }

  // 🔥 FIXED: SUPPORTS CLICKABLE BUTTONS
  function addMessage(text, type, links = []) {
    const div = document.createElement("div");
    div.className = type;
    div.textContent = text;

    if (Array.isArray(links) && links.length > 0) {
      const btnWrap = document.createElement("div");
      btnWrap.style.marginTop = "8px";
      btnWrap.style.display = "flex";
      btnWrap.style.flexWrap = "wrap";
      btnWrap.style.gap = "6px";

      links.forEach(link => {
        const btn = document.createElement("button");
        btn.textContent = link.label;
        btn.style.background = "#002147";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.padding = "6px 10px";
        btn.style.borderRadius = "6px";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "13px";

        btn.onclick = () => {
          window.open(link.url, "_blank");
        };

        btnWrap.appendChild(btn);
      });

      div.appendChild(btnWrap);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
});
