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
      .then(data => addMessage(data.reply, "bot"))
      .catch(() => addMessage("Server error.", "bot"));
  }

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
});

