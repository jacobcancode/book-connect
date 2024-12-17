---
layout: base
title: Car Talk
search_exclude: true
menu: nav/home.html
permalink: /Chat
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .chat-container {
            width: 400px;
            margin: 0 auto;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            display: flex;
            flex-direction: column;
        }

        .chat-box {
            flex: 1;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
            overflow-y: auto;
            max-height: 500px;
        }

        .chat-box div {
            margin: 5px 0;
        }

        form {
            display: flex;
        }

        input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            padding: 10px;
            border: none;
            background-color: #28a745;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-box" id="chatBox"></div>
        <form id="chatForm">
            <input type="text" id="messageInput" placeholder="Type your message..." required>
            <button type="submit">Send</button>
        </form>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const chatForm = document.getElementById('chatForm');
            const messageInput = document.getElementById('messageInput');
            const chatBox = document.getElementById('chatBox');

            // Use localhost for local testing
            const apiUrl = 'http://localhost:5000/api/chat'; // Adjust the port as necessary

            // Display a welcoming message in the chat history
            displayMessage("Welcome to the chat! Feel free to send a message.", 'received');

            chatForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const message = messageInput.value;

                console.log('Sending message:', message); // Debug log

                // Send message to backend
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ message }),
                    });

                    console.log('Response status:', response.status); // Debug log

                    if (response.ok) {
                        const data = await response.json();
                        displayMessage(data.message, 'sent');
                        messageInput.value = '';
                    } else {
                        console.error('Error sending message:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            function displayMessage(message, type) {
                const messageDiv = document.createElement('div');
                messageDiv.textContent = message;
                messageDiv.className = type === 'sent' ? 'sent-message' : 'received-message';
                chatBox.appendChild(messageDiv);
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
            }

            // Function to fetch messages (optional)
            async function fetchMessages() {
                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const messages = await response.json();
                        messages.forEach(msg => displayMessage(msg.message, 'received'));
                    }
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            }

            // Fetch messages on load (optional)
            fetchMessages();
        });
    </script>
</body>
</html>