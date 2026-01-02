document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("chatbox");
  const closeChat = document.getElementById("close-chat");
  const toggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const close = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

  // FORCE INITIAL STATE = CLOSED
  chatBox.style.display = "none";

  // OPEN CHAT
 chatToggle.addEventListener("click", () => {
  if (chatBox.style.display === "none" || chatBox.style.display === "") {
    chatBox.style.display = "flex";
  } else {
    chatBox.style.display = "none";
  }
});
  toggle.addEventListener("click", () => {
    chatbox.style.display =
      chatbox.style.display === "none" || chatbox.style.display === ""
        ? "flex"
        : "none";
  });

  // CLOSE CHAT
  closeChat.addEventListener("click", () => {
    chatBox.style.display = "none";
  close.addEventListener("click", () => {
    chatbox.style.display = "none";
});

  // SEND BUTTON
sendBtn.addEventListener("click", sendMessage);

  // ENTER KEY
input.addEventListener("keydown", (e) => {
if (e.key === "Enter") {
e.preventDefault();
@@ -63,4 +55,3 @@ document.addEventListener("DOMContentLoaded", () => {
return div;
}
});
