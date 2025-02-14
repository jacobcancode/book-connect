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
</body>

<script type="module">
    import { getAllChat, postChat, deleteChat, updateChat } from "{{site.baseurl}}/assets/js/api/carChat.js";

    // Function to create a chat message display with delete and edit buttons
    function createMessageDisplay(message) {
        const messageBox = document.createElement("div");
        messageBox.className = "message-box";

        const messageContent = document.createElement("p");
        messageContent.innerHTML = `<strong>Message:</strong> ${message.message}`;
        messageBox.appendChild(messageContent);

        const messageUID = document.createElement("p");
        messageUID.innerHTML = `UID: ${message.user_id}`;
        messageBox.appendChild(messageUID);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "Delete Message";
        deleteButton.addEventListener("click", async () => {
            const result = await deleteChat(message.id);
            if (result.success) {
                alert("Message deleted successfully!");
                messageBox.remove(); // Remove the message box immediately
            } else {
                alert("Failed to delete message.");
            }
        });
        messageBox.appendChild(deleteButton);

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerHTML = "Edit Message";
        editButton.addEventListener("click", () => {
            const newContent = prompt("Edit your message:", message.content);
            if (newContent !== null) {
                updateChat(message.id, newContent).then(result => {
                    if (result.success) {
                        alert("Message updated successfully!");
                        messageContent.innerHTML = `<strong>Message:</strong> ${newContent}`; // Update the message content immediately
                    } else {
                        alert("Failed to update message.");
                    }
                });
            }
        });
        messageBox.appendChild(editButton);

        return messageBox;
    }

    // Display all messages
    async function displayMessages() {
        const messages = await getAllChat();
        const chatBox = document.getElementById("chatBox");
        chatBox.innerHTML = ""; // Clear existing content
        if (messages && messages.length > 0) {
            messages.forEach(message => {
                const newMessageDisplay = createMessageDisplay(message);
                chatBox.appendChild(newMessageDisplay);
            });
            // Scroll to the bottom of the chat
            chatBox.scrollTop = chatBox.scrollHeight;
        } else {
            chatBox.innerHTML = "<p>No messages available.</p>";
        }
    }

    // Submit a new message
    async function submitMessage() {
        const messageInput = document.getElementById("messageInput");
        const messageContent = messageInput.value.trim();
        console.log(messageContent)
        if (messageContent) {
            const result = await postChat(messageContent);
            if (result.success) {
                messageInput.value = "";
                displayMessages(); // Refresh the messages
            } else {
                console.error('Failed to submit message:', result);
                alert("Failed to submit message.");
            }
        } else {
            alert("Message cannot be empty.");
        }
    }

    // Event listeners
    document.addEventListener("DOMContentLoaded", () => {
        const chatForm = document.getElementById("chatForm");
        chatForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent page refresh
            await submitMessage();
        });
        
        // Initial display of messages
        displayMessages();
    });
</script>