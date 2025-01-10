---
layout: needsAuth
title: Profile Settings
permalink: /profile
menu: nav/home.html
search_exclude: true
show_reading_time: false
---

<div class="profile-container">
 <div class="card">
   <form>
     <div>
       <label for="newUid">Enter New Username:</label>
       <input type="text" id="newUid" placeholder="New Username">
     </div>
     <div>
       <label for="newName">Enter New Name:</label>
       <input type="text" id="newName" placeholder="New Name">
     </div>
      <div>
       <label for="newPassword">Enter New Password:</label>
       <input type="text" id="newPassword" placeholder="New Password">
     </div>
     <br>
     <br>
     <label for="profilePicture" class="file-icon"> Upload Profile Picture <i class="fas fa-upload"></i> <!-- Replace this with your desired icon -->
     </label>
     <input type="file" id="profilePicture" accept="image/*" onchange="saveProfilePicture()">
     <div class="image-container" id="profileImageBox">
         <!-- Profile picture will be displayed here -->
     </div>
     <p id="profile-message" style="color: red;"></p>
   </form>
 </div>
</div>

<script type="module">
// Import fetchOptions from config.js
import {pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
// Import functions from config.js
import { putUpdate, postUpdate, deleteData, logoutUser } from "{{site.baseurl}}/assets/js/api/profile.js";

// Function to update table with fetched data
function updateTableWithData(data) {
   const tableBody = document.getElementById('profileResult');
   tableBody.innerHTML = '';

   data.sections.forEach((section, index) => {
       const tr = document.createElement('tr');
       const themeCell = document.createElement('td');
       const nameCell = document.createElement('td');

       themeCell.textContent = section.theme;
       nameCell.textContent = section.name;

       const trashIcon = document.createElement('i');
       trashIcon.className = 'fas fa-trash-alt trash-icon';
       trashIcon.style.marginLeft = '10px';
       themeCell.appendChild(trashIcon);

       trashIcon.addEventListener('click', async function (event) {
           event.preventDefault();
           const URL = pythonURI + "/api/user/section";
           // Remove the row from the table
           tr.remove();

           const options = {
               URL,
               body: { sections: [section.theme] },
               message: 'profile-message',
           };

           try {
               await deleteData(options);
           } catch (error) {
               console.error('Error deleting section:', error.message);
               document.getElementById('profile-message').textContent = 'Error deleting section: ' + error.message;
           }
       });

      yearCell.classList.add('editable'); // Make year cell editable
      yearCell.innerHTML = `${section.year} <i class="fas fa-pencil-alt edit-icon" style="margin-left: 10px;"></i>`;

       // Make the year cell editable
       yearCell.addEventListener('click', function () {
           const input = document.createElement('input');
           input.type = 'text';
           input.value = section.year;
           input.className = 'edit-input';
           yearCell.innerHTML = '';
           yearCell.appendChild(input);

           input.focus();

           input.addEventListener('blur', async function () {
               const newYear = input.value;
               const URL = pythonURI + "/api/user/section";
               const options = {
                   URL,
                   body: { section: { theme: section.theme, year: newYear } },
                   message: 'profile-message',
               };

               try {
                   await putUpdate(options);
               } catch (error) {
                   console.error('Error updating year:', error.message);
                   document.getElementById('profile-message').textContent = 'Error updating year: ' + error.message;
               }

               yearCell.textContent = newYear;
           });

           input.addEventListener('keydown', function (event) {
               if (event.key === 'Enter') {
                   input.blur();
               }
           });
       });
       tr.appendChild(themeCell);
       tr.appendChild(nameCell);

       tableBody.appendChild(tr);
   });

}

// Function to fetch user profile data
async function fetchUserProfile() {
    const URL = pythonURI + "/api/id/pfp"; // Endpoint to fetch user profile data

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.status}`);
        }

        const profileData = await response.json();
        displayUserProfile(profileData);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        // Handle error display or fallback mechanism
    }
}

// Function to display user profile data
function displayUserProfile(profileData) {
    const profileImageBox = document.getElementById('profileImageBox');
    if (profileData.pfp) {
        const img = document.createElement('img');
        img.src = `data:image/jpeg;base64,${profileData.pfp}`;
        img.alt = 'Profile Picture';
        profileImageBox.innerHTML = ''; // Clear existing content
        profileImageBox.appendChild(img); // Append new image element
    } else {
        profileImageBox.innerHTML = '<p>No profile picture available.</p>';
    }

    // Display other profile information as needed
    // Example: Update HTML elements with profileData.username, profileData.email
}

// Function to save profile picture
window.saveProfilePicture = async function () {

    const fileInput = document.getElementById('profilePicture');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const profileImageBox = document.getElementById('profileImageBox');
            profileImageBox.innerHTML = `<img src="${reader.result}" alt="Profile Picture">`;
        };
        reader.readAsDataURL(file);
    }

    if (!file) return;

    try {
        const base64String = await convertToBase64(file);
        await sendProfilePicture(base64String);
        console.log('Profile picture uploaded successfully!');

    } catch (error) {
        console.error('Error uploading profile picture:', error.message);
        // Handle error display or fallback mechanism
    }
}

// Function to convert file to base64
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Remove the prefix part of the result
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Function to send profile picture to server
async function sendProfilePicture(base64String) {
   const URL = pythonURI + "/api/id/pfp"; // Adjust endpoint as needed

   // Create options object for PUT request
   const options = {
       URL,
       body: { pfp: base64String },
       message: 'profile-message', // Adjust the message area as needed
       callback: () => {
           console.log('Profile picture uploaded successfully!');
           // Handle success response as needed
       }
   };

   try {
       await putUpdate(options);
   } catch (error) {
       console.error('Error uploading profile picture:', error.message);
       document.getElementById('profile-message').textContent = 'Error uploading profile picture: ' + error.message;
   }
}
  // Function to update UI with new UID and change placeholder
window.updateUidField = function(newUid) {
  const uidInput = document.getElementById('newUid');
  uidInput.value = newUid;
  uidInput.placeholder = newUid;
}

// Function to update UI with new Name and change placeholder
window.updateNameField = function(newName) {
  const nameInput = document.getElementById('newName');
  nameInput.value = newName;
  nameInput.placeholder = newName;
}

// Function to change UID
window.changeUid = async function(uid) {
   if (uid) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { uid },
           message: 'uid-message', // Adjust the message area as needed
           callback: () => {
               alert("You updated your Github ID, so you will automatically be logged out. Be sure to remember your new github id to log in!");
               console.log('UID updated successfully!');
               window.updateUidField(uid);
               window.location.href = '/portfolio_2025/login'
           }
       };

       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating UID:', error.message);
           document.getElementById('uid-message').textContent = 'Error updating UID: ' + error.message;
       }
   }
}

window.changePassword = async function(password) {
   if (password) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { password },
           message: 'password-message', // Adjust the message area as needed
           callback: () => {
               console.log('Password updated successfully!');
               window.location.href = '/portfolio_2025/login'

           }
       };

       try {
            alert("You updated your password, so you will automatically be logged out. Be sure to remember your password!");
           await putUpdate(options);
           await logoutUser();
       } catch (error) {
           console.error('Error updating password:', error.message);
           document.getElementById('password-message').textContent = 'Error updating password: ' + error.message;
       }
   }
}

// Function to change Name
window.changeName = async function(name) {
   if (name) {
       const URL = pythonURI + "/api/user";
       const options = {
           URL,
           body: { name },
           message: 'name-message',
           callback: () => {
               console.log('Name updated successfully!');
               window.updateNameField(name);
           }
       };
       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating Name:', error.message);
           document.getElementById('name-message').textContent = 'Error updating Name: ' + error.message;
       }
   }
}

// Event listener to trigger updateUid function when UID field is changed
document.getElementById('newUid').addEventListener('change', function() {
    const uid = this.value;
    window.changeUid(uid);

});

// Event listener to trigger updateName function when Name field is changed
document.getElementById('newName').addEventListener('change', function() {
    const name = this.value;
    window.changeName(name);

});

document.getElementById('newPassword').addEventListener('change', function() {
    const password = this.value;
    window.changePassword(password);

});

// Function to fetch Name from backend
window.fetchName = async function() {
    const URL = pythonURI + "/api/user"; // Adjusted endpoint

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch Name: ${response.status}`);
        }

        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error fetching Name:', error.message);
        return null;
    }
};

// Function to set placeholders for UID and Name
window.setPlaceholders = async function() {
    const uidInput = document.getElementById('newUid');
    const nameInput = document.getElementById('newName');

    try {
        const uid = await window.fetchUid();
        const name = await window.fetchName();

        if (uid !== null) {
            uidInput.placeholder = uid;
        }
        if (name !== null) {
            nameInput.placeholder = name;
        }
    } catch (error) {
        console.error('Error setting placeholders:', error.message);
    }
};

// Call and initializeProfileSetup when DOM content is loaded
document.addEventListener('DOMContentLoaded', async function () {
    try {
        await fetchUserProfile(); // Fetch user profile data
        await setPlaceholders();
    } catch (error) {
        console.error('Initialization error:', error.message);
        // Handle initialization error gracefully
    }
});

</script>

<style>
   /* Lock Screen */
        .lock-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10;
            background: radial-gradient(circle, #772222, #330000); /* Dark red gradient */
            transition: transform 1s ease-in-out;
        }
    /* Ignition */
        .ignition-container {
            position: relative;
            width: 150px;
            height: 150px;
        }
   .ignition {
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, #555, #222);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            box-shadow: inset 0 0 10px #000, 0 4px 10px rgba(0, 0, 0, 0.5);
        }
 .ignition-slot {
            width: 60px;
            height: 20px; 
            background: #777;
            border-radius: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
        }
  /* Key */
        .key {
            width: 200px; 
            height: auto;
            position: absolute;
            top: 70%;
            left: 10%;
            cursor: grab;
            transition: transform 0.5s ease;
            z-index: 5;
        }
   .key:active {
            cursor: grabbing;
        }
  .key-top-view {
            display: none;
            position: absolute;
            width: 60px; /* Matches ignition slot size */
            height: 20px;
            background: black;
            border-radius: 3px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
            z-index: 10;
            top: 50%;
            left: 50%;
        }
  .instruction {
            margin-top: 20px;
            font-size: 18px;
            color: #bbb;
            animation: pulse 1s infinite;
        }
   @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
</style>
<body>
    <!-- Lock Screen -->
    <div class="lock-screen" id="lockScreen">
        <div class="ignition-container">
            <div class="ignition">
                <div class="ignition-slot" id="ignitionSlot"></div>
            </div>
        </div>
        <div class="key-top-view" id="keyTopView"></div>
        <img src="{{site.baseurl}}/images/CARKEY.png" alt="Key" class="key" id="key">
        <div class="instruction">Drag the key into the ignition to unlock!</div>
    </div>


  <!-- Car Starting Sound -->
 <audio id="carStartSound" src="{{site.baseurl}}/images/CarKeySTART.mp3"></audio>

  <script>
        const key = document.getElementById('key');
        const ignitionSlot = document.getElementById('ignitionSlot');
        const lockScreen = document.getElementById('lockScreen');
        const content = document.getElementById('content');
        const keyTopView = document.getElementById('keyTopView');
        const carStartSound = document.getElementById('carStartSound');

        let isDragging = false;
        let offsetX, offsetY;

        // Prevent default drag behavior
        key.addEventListener('dragstart', (event) => event.preventDefault());

        // Dragging functionality
        key.addEventListener('mousedown', (event) => {
            isDragging = true;
            offsetX = event.offsetX;
            offsetY = event.offsetY;
            key.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (event) => {
            if (isDragging) {
                key.style.left = `${event.clientX - offsetX}px`;
                key.style.top = `${event.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', (event) => {
            if (isDragging) {
                isDragging = false;
                key.style.cursor = 'grab';

                // Check if key is near the ignition slot
                const keyRect = key.getBoundingClientRect();
                const ignitionRect = ignitionSlot.getBoundingClientRect();

                if (
                    keyRect.right > ignitionRect.left &&
                    keyRect.left < ignitionRect.right &&
                    keyRect.bottom > ignitionRect.top &&
                    keyRect.top < ignitionRect.bottom
                ) {
                    // Hide original key and display top view
                    key.style.display = 'none';
                    keyTopView.style.display = 'block';
                    keyTopView.style.left = `${ignitionRect.left}px`;
                    keyTopView.style.top = `${ignitionRect.top}px`;

                    // Play car starting sound
                    carStartSound.play();

                    // Simulate turning the ignition
                    setTimeout(() => {
                        keyTopView.style.transform = 'rotate(90deg)';
                        ignitionSlot.hidden = true;
                    }, 500);

                    // Unlock the page
                    setTimeout(() => {
                        lockScreen.style.transform = 'translateY(-100vh)';
                        content.style.transform = 'translateY(-100vh)';
                    }, 1500); // Delay for rotation and unlock animation
                } else {
                    // Reset key position if not near ignition slot
                    key.style.left = '10%';
                    key.style.top = '70%';
                }
            }
        });
    </script>
</body>


<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | CarConnect</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">


<nav class="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-600">CarConnect</h1>
        <div class="flex space-x-4">
            <a href="#" class="text-gray-600 hover:text-blue-500">Chats</a>
            <a href="#" class="text-gray-600 hover:text-blue-500">Posts</a>
            <a href="settings.html" class="text-gray-600 hover:text-blue-500">Settings</a>
        </div>
    </nav>

 <div class="flex">
        <!-- Quick Navigation Sidebar -->
        <aside class="w-64 bg-white p-4 shadow-lg h-screen">
            <ul class="space-y-4">
                <li>
                    <a href="profile.html" class="block p-2 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white">
                        🚗 Profile
                    </a>
                </li>
                <li>
                    <a href="garage.html" class="block p-2 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white">
                        🔧 My Garage
                    </a>
                </li>
                <li>
                    <a href="explore.html" class="block p-2 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white">
                        🌎 Explore
                    </a>
                </li>
                <li>
                    <a href="messages.html" class="block p-2 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white">
                        💬 Messages
                    </a>
                </li>
                <li>
                    <a href="settings.html" class="block p-2 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white">
                        ⚙️ Settings
                    </a>
                </li>
            </ul>
        </aside>

<!-- Main Content -->
 <main class="flex-1 p-6">
            <h2 class="text-2xl font-semibold text-gray-700">Welcome Back!</h2>

 <!-- Example Post -->
<div class="bg-white p-4 rounded-lg shadow-md mt-6">
                <h3 class="text-lg font-semibold">User123’s New Ride</h3>
                <img src="https://source.unsplash.com/800x400/?car" alt="Car Post" class="rounded-lg mt-2">
                <p class="mt-2 text-gray-600">Just picked up this beauty! What do you guys think?</p>
                <div class="mt-4 flex space-x-4">
                    <button class="text-blue-500 hover:underline">Like</button>
                    <button class="text-gray-500 hover:underline">Comment</button>
                </div>
            </div>

 </main>
 </div>

</body>
</html>


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stylish Button</title>
    <style>
        /* Styling for the button */
        .custom-button {
            display: inline-block;
            padding: 12px 24px;
            font-size: 18px;
            font-weight: bold;
            color: white;
            background: linear-gradient(45deg, #007bff, #00d4ff);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            text-decoration: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .custom-button:hover {
            background: linear-gradient(45deg, #0056b3, #0094cc);
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .custom-button:active {
            transform: scale(0.98);
        }
    </style>
</head>
<body>

<!-- Stylish Button -->
 <a href="comment" class="custom-button">Comment Test</a>

</body>
</html>
