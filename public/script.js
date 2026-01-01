document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const close = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");

  toggle.addEventListener("click", () => {
    chatbox.style.display =
      chatbox.style.display === "none" || chatbox.style.display === ""
        ? "flex"
        : "none";
  });

  close.addEventListener("click", () => {
    chatbox.style.display = "none";
  });

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  async function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, "user");
    input.value = "";

    const typing = addMessage("Typing...", "bot");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    typing.remove();
    addMessage(data.reply, "bot");
  }

  function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `msg ${sender}`;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }
});
