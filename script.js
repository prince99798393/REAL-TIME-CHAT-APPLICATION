// Connect to WebSocket server
const socket = new WebSocket("ws://localhost:3000");

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

// Add message to the chat box
function addMessage(message, sender = "you") {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("message", sender === "you" ? "you" : "other");
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Listen for incoming messages
socket.addEventListener("message", (event) => {
  addMessage(event.data, "other");
});

// Send message
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.send(message);
    addMessage(message, "you");
    messageInput.value = "";
  }
});

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});