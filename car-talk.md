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
            display: flex;
            justify-content: space-between;
            align-items: center;
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

        .edit-button, .delete-button {
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 0.9em;
            transition: background-color 0.3s;
        }

        .edit-button:hover, .delete-button:hover {
            background-color: #0056b3;
        }

        .delete-button {
            background-color: #dc3545;
        }

        .delete-button:hover {
            background-color: #c82333;
        }

        .button-container {
            display: flex;
            gap: 10px;
            margin-left: 10px;
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
                
                // Create message container with appropriate class based on message type (sent or received)
                messageDiv.className = type === 'sent' ? 'sent-message' : 'received-message';
                
                // Add message content with user ID, time, and buttons
                messageDiv.innerHTML = `
                    <div class="message-header">
                        <span class="user-id">${userId}</span>
                        <span class="timestamp">${timeString}</span>
                        ${type === 'sent' ? `
                            <div class="button-container">
                                <button class="edit-button" data-id="${id}">Edit</button>
                                <button class="delete-button" data-id="${id}">Delete</button>
                            </div>
                        ` : ''}
                    </div>
                    <div class="message-text">${text}</div>
                `;
                
                chatBox.appendChild(messageDiv);
                chatBox.scrollTop = chatBox.scrollHeight;

                // Add event listener for the edit button if the message is sent by the user
                if (type === 'sent') {
                    messageDiv.querySelector('.edit-button').addEventListener('click', () => {
                        editMessage(id, text);
                    });

                    // Add event listener for the delete button
                    messageDiv.querySelector('.delete-button').addEventListener('click', () => {
                        deleteMessage(id, messageDiv);
                    });
                }
            }

            function deleteMessage(id, messageDiv) {
                if (confirm("Are you sure you want to delete this message?")) {
                    fetch(`http://127.0.0.1:8887/car_chat/${id}`, {
                        method: 'DELETE' // Specify the HTTP method as DELETE
                    })
                    .then(response => {
                        if (response.ok) {
                            // Remove the message from the chat display
                            messageDiv.remove();
                            console.log('Message deleted successfully');
                        } else {
                            console.error('Error deleting message:', response.statusText);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            }

            // Function to fetch messages on page load
            function fetchMessages() {
                fetch('http://127.0.0.1:8887/car_chat', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Parse the JSON response
                    } else {
                        throw new Error('Failed to fetch messages');
                    }
                })
                .then(messages => {
                    messages.forEach(msg => {
                        displayMessage({
                            text: msg.message,
                            type: msg.user_id === 1 ? 'sent' : 'received', // Adjust based on your user ID logic
                            time: msg.timestamp || new Date(),
                            userId: msg.user_id || 'Unknown User',
                            id: msg.id // Include message ID
                        });
                    });
                })
                .catch(error => console.error('Error:', error));
            }

            // Call fetchMessages on page load
            fetchMessages(); // Fetch messages when the page loads

            function editMessage(id, currentText) {
                const newText = prompt("Edit your message:", currentText);
                
                if (newText !== null && newText.trim() !== "") {
                    fetch(`http://127.0.0.1:8887/car_chat/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ message: newText })
                    })
                    .then(response => {
                        if (response.ok) {
                            const messageDiv = document.querySelector(`.edit-button[data-id="${id}"]`).closest('div');
                            messageDiv.querySelector('.message-text').textContent = newText; // Update the displayed text
                        } else {
                            console.error('Error updating message:', response.statusText);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            }
        });
    </script>
</body>
</html>