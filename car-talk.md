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

        .chat-box div {
            margin: 10px 0;
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

                // Send message to backend
                const messageData = await sendMessage(message);
                if (messageData) {
                    displayMessage({
                        text: message,
                        type: 'sent',
                        time: currentTime,
                        userId: 'You',
                        id: messageData.id // Store the message ID for future deletes
                    });
                }

                // Clear input field
                messageInput.value = '';
            });

            async function sendMessage(message) {
                const messageData = {
                    "message": message,
                    "user_id": 1  // Using the same user_id as shown in Postman
                };

                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(messageData)
                    });

                    if (response.ok) {
                        return await response.json(); // Return the message data including ID
                    } else {
                        console.error('Error sending message:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
                return null;
            }

            function displayMessage({ text, type, time, userId, id }) {
                const messageDiv = document.createElement('div');
                const timeString = new Date(time).toLocaleTimeString();
                
                // Create message container
                messageDiv.className = type === 'sent' ? 'sent-message' : 'received-message';
                
                // Add message content with user ID, time, and edit/delete buttons
                messageDiv.innerHTML = `
                    <div class="message-header">
                        <span class="user-id">${type === 'sent' ? 'You' : userId}</span>
                        <span class="timestamp">${timeString}</span>
                        ${type === 'sent' ? `<button class="edit-button" data-id="${id}">Edit</button>` : ''}
                        ${type === 'sent' ? `<button class="delete-button" data-id="${id}">Delete</button>` : ''}
                    </div>
                    <div class="message-text">${text}</div>
                `;
                
                chatBox.appendChild(messageDiv);
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

                // Add event listeners for edit and delete buttons
                if (type === 'sent') {
                    messageDiv.querySelector('.edit-button').addEventListener('click', () => {
                        editMessage(id, text);
                    });
                    messageDiv.querySelector('.delete-button').addEventListener('click', () => {
                        deleteMessage(id);
                    });
                }
            }

            function deleteMessage(id) {
                if (confirm("Are you sure you want to delete this message?")) {
                    fetch(`${apiUrl}/${id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log('Message deleted successfully');
                            fetchMessages(); // Re-fetch messages to reflect the deletion
                        } else {
                            console.error('Error deleting message:', response.statusText);
                        }
                    })
                    .catch(error => console.error('Error:', error));
                }
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
                            userId: msg.user_id || 'Unknown User',
                            id: msg.id // Ensure the ID is included
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            }

            // Fetch messages on load (optional)
            fetchMessages();

            function editMessage(id, currentText) {
                const newText = prompt("Edit your message:", currentText);
                if (newText !== null) {
                    // Update the message in the backend
                    fetch(`http://127.0.0.1:8887/car_chat/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ message: newText })
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log('Message updated successfully');
                            fetchMessages(); // Re-fetch messages to get updated data
                        } else {
                            console.error('Error updating message:', response.statusText);
                        }
                    })
                    .catch(error => console.error('Error:', error));
                }
            }
        });
    </script>
</body>
</html>