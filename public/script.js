document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const closeBtn = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");
  const typing = document.getElementById("typing-indicator");
  const langSelect = document.getElementById("chat-lang");

  let selectedLang = langSelect.value;

  langSelect.onchange = () => {
    selectedLang = langSelect.value;
  };

  chatbox.style.display = "none";

  toggle.onclick = () => {
    chatbox.style.display =
      chatbox.style.display === "none" ? "flex" : "none";
  };

  closeBtn.onclick = () => chatbox.style.display = "none";

  sendBtn.onclick = sendMessage;
  input.addEventListener("keydown", e => e.key === "Enter" && sendMessage());

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    setLoading(true);

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        language: selectedLang
      })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        addMessage(data.reply, "bot", data.links || []);
      })
      .catch(() => {
        setLoading(false);
        addMessage("Server error. Please try again.", "bot");
      });
  }

  function setLoading(state) {
    typing.classList.toggle("hidden", !state);
    sendBtn.disabled = state;
    input.disabled = state;
  }

  function addMessage(text, type, links = []) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.textContent = text;

    if (links.length) {
      const wrap = document.createElement("div");
      wrap.className = "link-wrap";

      links.forEach(l => {
        const btn = document.createElement("button");
        btn.textContent = l.label;
        btn.onclick = () => window.open(l.url, "_blank");
        wrap.appendChild(btn);
      });

      div.appendChild(wrap);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

});
