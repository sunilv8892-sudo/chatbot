document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("chatbox");
  const closeChat = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");

  // FORCE INITIAL STATE = CLOSED
  chatBox.style.display = "none";

  // OPEN CHAT
  chatToggle.addEventListener("click", () => {
    chatBox.style.display = "flex";
  });

  // CLOSE CHAT
  closeChat.addEventListener("click", () => {
    chatBox.style.display = "none";
  });

  // SEND BUTTON
  sendBtn.addEventListener("click", sendMessage);

  // ENTER KEY
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
