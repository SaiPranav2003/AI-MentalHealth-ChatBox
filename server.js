const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Basic route to serve the chat interface
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Chat endpoint
const getBotResponse = (message) => {
  // Simple response logic (replace with AI/ML model)
  if (message.toLowerCase().includes('happy')) {
    return "I'm glad to hear that!";
  } else if (message.toLowerCase().includes('sad')) {
    return "I'm sorry to hear that. How can I help?";
  } else {
    return 'Hello! How can I assist you today?';
  }
};

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  const botResponse = getBotResponse(userMessage);
  res.json({ response: botResponse });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
