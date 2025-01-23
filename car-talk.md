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
            width: 80%;
            max-width: 1200px;
            min-width: 400px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            padding: 20px;
        }

        .chat-box {
            flex: 1;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            overflow-y: auto;
            max-height: 70vh;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .message-header {
            font-size: 0.8em;
            color: #666;
            margin-bottom: 2px;
        }
        .user-id {
            font-weight: bold;
            margin-right: 10px;
        }
        .timestamp {
            color: #999;
        }
        .message-text {
            margin-bottom: 10px;
        }
        .sent-message {
            background-color: #e3f2fd;
            padding: 8px;
            border-radius: 8px;
            margin: 5px 0;
            align-self: flex-end;
        }
        .received-message {
            background-color: #f5f5f5;
            padding: 8px;
            border-radius: 8px;
            margin: 5px 0;
        }

        form {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        input {
            flex: 1;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }

        button {
            padding: 12px 24px;
            border: none;
            background-color: #28a745;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: #218838;
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

            // Generate a random user ID for this session
            const userId = 'User_' + Math.floor(Math.random() * 1000);

            // Use localhost for local testing
            const apiUrl = 'http://127.0.0.1:8887/car_chat'; // Adjust the port as necessary

            // Display a welcoming message in the chat history
            displayMessage({
                text: "Welcome to the chat! Feel free to send a message.",
                type: 'received',
                time: new Date(),
                userId: 'System'
            });

            chatForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const message = messageInput.value;
                const currentTime = new Date();

                // Display message in chat box
                displayMessage({
                    text: message,
                    type: 'sent',
                    time: currentTime,
                    userId: userId
                });

                // Clear input field
                messageInput.value = '';

                // Match the exact format from Postman
                const messageData = {
                    "message": message,
                    "user_id": 1  // Using the same user_id as shown in Postman
                };

                console.log('Sending message data:', messageData); // Debug log

                // Send to backend
                try {
                    const response = await fetch('http://127.0.0.1:8887/car_chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(messageData)
                    });

                    console.log('Response status:', response.status); // Debug log

                    if (response.ok) {
                        console.log('Message sent successfully');
                    } else {
                        console.error('Error sending message:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            function displayMessage({ text, type, time, userId }) {
                const messageDiv = document.createElement('div');
                const timeString = new Date(time).toLocaleTimeString();
                
                // Create message container
                messageDiv.className = type === 'sent' ? 'sent-message' : 'received-message';
                
                // Add message content with user ID and time
                messageDiv.innerHTML = `
                    <div class="message-header">
                        <span class="user-id">${type === 'sent' ? 'You' : userId}</span>
                        <span class="timestamp">${timeString}</span>
                    </div>
                    <div class="message-text">${text}</div>
                `;
                
                chatBox.appendChild(messageDiv);
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
            }

            // Function to fetch messages (optional)
            async function fetchMessages() {
                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const messages = await response.json();
                        messages.forEach(msg => displayMessage({
                            text: msg.message,
                            type: 'received',
                            time: msg.timestamp || new Date(),
                            userId: msg.user_id || 'Unknown User'
                        }));
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