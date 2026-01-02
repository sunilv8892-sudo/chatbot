const toggle = document.getElementById("chat-toggle");
const chatbox = document.getElementById("chatbox");
const closeBtn = document.getElementById("close-chat");
const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send-btn");
const typing = document.getElementById("typing");

toggle.onclick = () => chatbox.classList.toggle("hidden");
closeBtn.onclick = () => chatbox.classList.add("hidden");

sendBtn.onclick = send;
input.addEventListener("keypress", e => e.key === "Enter" && send());

function send() {
  const text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = "";
  typing.classList.remove("hidden");

  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  })
  .then(r => r.json())
  .then(d => {
    typing.classList.add("hidden");
    messages.innerHTML += `<div class="msg bot">${d.reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  });
}
