document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const messages = document.querySelector('.messages');
    const typingIndicator = document.getElementById('typing-indicator');
  
    sendButton.addEventListener('click', sendMessage);
  
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      } else {
        typingIndicator.style.display = 'block';
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          typingIndicator.style.display = 'none';
        }, 1000);
      }
    });
  
    function sendMessage() {
      const messageText = chatInput.value.trim();
      if (messageText !== '') {
        addMessage(messageText, 'user');
        chatInput.value = '';
  
        typingIndicator.style.display = 'block';
  
        fetch('/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: messageText }),
        })
        .then(response => response.json())
        .then(data => {
          typingIndicator.style.display = 'none';
          addMessage(data.response, 'bujji');
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }
  
    function addMessage(text, sender) {
      const message = document.createElement('div');
      message.classList.add('message', sender);
  
      const avatar = document.createElement('img');
      avatar.src = sender === 'user' ? 'user-avatar.png' : 'bujji-avatar.png';
      avatar.classList.add('avatar');
  
      const messageText = document.createElement('span');
      messageText.textContent = text;
  
      const timestamp = document.createElement('span');
      timestamp.classList.add('timestamp');
      timestamp.textContent = new Date().toLocaleTimeString();
  
      message.appendChild(avatar);
      message.appendChild(messageText);
      message.appendChild(timestamp);
      messages.appendChild(message);
  
      messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom
    }
  
    let typingTimeout;
  });
  