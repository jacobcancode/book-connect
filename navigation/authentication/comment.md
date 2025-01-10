---
layout: base
title: Comment
permalink: /comment
menu: nav/home.html
---


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Comments</title>
    <style>
        /* Styling */
        .comment-box {
            max-width: 500px;
            margin: 20px auto;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #f9f9f9;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        .fetch-button {
            display: block;
            margin: 10px auto;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            background: linear-gradient(45deg, #007bff, #00d4ff);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s ease-in-out;
        }
        .fetch-button:hover {
            background: linear-gradient(45deg, #0056b3, #0094cc);
            transform: scale(1.05);
        }
    </style>
</head>
<body>

 <!-- Comment Display Box -->
 <div class="comment-box" id="commentBox">
        <p><strong>Latest Comment:</strong></p>
        <p id="commentText">Click the button to fetch a comment.</p>
        <p id="commentUID"></p>
    </div>

<!-- Fetch Button -->
<button id="fetchCommentButton" class="fetch-button">Fetch Comment</button>

<script type="module">
    import { getAllComments } from "{{site.baseurl}}/assets/js/api/comments.js"
    const commentText = document.getElementById("commentText")
    const uidText = document.getElementById("commentUID")

    async function displayComment() {
        const comments = await getAllComments()
        console.log(comments[0])
        commentText.innerHTML = comments[0].content
        uidText.innerHTML = `UID: ${comments[0].uid}`
    }

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById('fetchCommentButton').addEventListener('click', displayComment);
        });
 </script>

</body>
