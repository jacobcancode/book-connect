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
       <label for="newUid">Enter New UID:</label>
       <input type="text" id="newUid" placeholder="New UID">
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


<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Ignition Unlock</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
            background: #111;
            color: white;
        }

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
            background: radial-gradient(circle, #333, #000);
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
            width: 100px;
            height: auto;
            position: absolute;
            top: 75%;
            left: 10%;
            cursor: grab;
            transition: transform 0.5s ease;
        }

        .key:active {
            cursor: grabbing;
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

        /* Page Content */
        .content {
            width: 100%;
            min-height: 100vh;
            padding: 40px;
            background: linear-gradient(to bottom, #333, #000);
            color: white;
            position: fixed;
            top: 100vh;
            left: 0;
            z-index: 5;
            overflow-y: auto;
            transition: transform 1s ease-in-out;
        }

        .content h1 {
            margin-bottom: 20px;
            font-size: 36px;
        }

        .content p {
            font-size: 18px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <!-- Lock Screen -->
    <div class="lock-screen" id="lockScreen">
        <div class="ignition-container">
            <div class="ignition">
                <div class="ignition-slot" id="ignitionSlot"></div>
            </div>
        </div>
        <img src="{{site.baseurl}}/images/CARKEY.png" alt="Key" class="key" id="key">
        <div class="instruction">Drag the key into the ignition to unlock!</div>
    </div>

    <!-- Page Content -->
    <div class="content" id="content">
        <h1>Welcome to the Garage!</h1>
        <p>Start your engines and explore a world of cars, customizations, and more. You've unlocked the page with style!</p>
        <p>Scroll down to see the latest updates, car reviews, and tips for car enthusiasts. Enjoy the ride!</p>
    </div>

    <script>
        const key = document.getElementById('key');
        const ignitionSlot = document.getElementById('ignitionSlot');
        const lockScreen = document.getElementById('lockScreen');
        const content = document.getElementById('content');

        let isDragging = false;
        let offsetX, offsetY;

        // Dragging functionality
        key.addEventListener('mousedown', (event) => {
            isDragging = true;
            offsetX = event.offsetX;
            offsetY = event.offsetY;
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

                // Check if key is near ignition slot
                const keyRect = key.getBoundingClientRect();
                const ignitionSlotRect = ignitionSlot.getBoundingClientRect();

                if (
                    keyRect.right > ignitionSlotRect.left &&
                    keyRect.left < ignitionSlotRect.right &&
                    keyRect.bottom > ignitionSlotRect.top &&
                    keyRect.top < ignitionSlotRect.bottom
                ) {
                    // Snap key into ignition slot
                    key.style.left = `${ignitionSlotRect.left - 50}px`;
                    key.style.top = `${ignitionSlotRect.top - 10}px`;
                    key.style.transform = 'rotate(90deg)';

                    // Unlock animation
                    setTimeout(() => {
                        lockScreen.style.transform = 'translateY(-100vh)';
                        content.style.transform = 'translateY(-100vh)';
                    }, 1000); // Delay for animation
                } else {
                    // Reset key position if not near ignition slot
                    key.style.left = '10%';
                    key.style.top = '75%';
                }
            }
        });
    </script>
</body>
</html>