const toggleBtn = document.getElementById("chat-toggle");
const chatbox = document.getElementById("chatbox");
const closeBtn = document.getElementById("close-chat");
const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send-btn");

let chatOpen = false;

// Toggle open / close
toggleBtn.addEventListener("click", () => {
  if (chatOpen) {
    chatbox.classList.add("hidden");
    chatOpen = false;
  } else {
    chatbox.classList.remove("hidden");
    chatOpen = true;
  }
});

// Close with ❌
closeBtn.addEventListener("click", () => {
  chatbox.classList.add("hidden");
  chatOpen = false;
});

// Send message
sendBtn.addEventListener("click", send);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});

function send() {
  const text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = "";

  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  })
  .then(res => res.json())
  .then(data => {
    messages.innerHTML += `<div class="msg bot">${data.reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  });
}
