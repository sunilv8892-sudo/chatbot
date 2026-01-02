<script>
  const toggleBtn = document.getElementById("chat-toggle");
  const chatbox   = document.getElementById("chatbox");
  const closeBtn  = document.getElementById("close-chat");
  const messages  = document.getElementById("messages");
  const input     = document.getElementById("input");
  const sendBtn   = document.getElementById("send-btn");

  let isOpen = false;

  function openChat() {
    chatbox.classList.remove("hidden");
    isOpen = true;
  }

  function closeChat() {
    chatbox.classList.add("hidden");
    isOpen = false;
  }

  // 🔵 SAME BUTTON TO OPEN + CLOSE
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  // ❌ CLOSE BUTTON
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeChat();
  });

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
</script>
