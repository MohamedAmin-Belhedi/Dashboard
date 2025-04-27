//Menu Toggle
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');
toggle.onclick = function(){
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}
//add hovered class in selected list item
let list = document.querySelectorAll('.navigation li');
function activeLink(){
    list.forEach((item) =>
    item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) =>
item.addEventListener('mouseover', activeLink));

// Handle "Enable Notifications" buttons
const enableNotificationsYes = document.getElementById('enableNotificationsYes');
const enableNotificationsNo = document.getElementById('enableNotificationsNo');

enableNotificationsYes.addEventListener('click', () => {
    enableNotificationsYes.classList.add('btn-primary');
    enableNotificationsNo.classList.remove('btn-primary');
    enableNotificationsNo.classList.add('btn-secondary');
    console.log('Notifications Enabled: Yes');
});

enableNotificationsNo.addEventListener('click', () => {
    enableNotificationsNo.classList.add('btn-primary');
    enableNotificationsYes.classList.remove('btn-primary');
    enableNotificationsYes.classList.add('btn-secondary');
    console.log('Notifications Enabled: No');
});

// Handle "Enable Notifications" toggle
const enableNotificationsToggle = document.getElementById('enableNotifications');
enableNotificationsToggle.addEventListener('change', () => {
    if (enableNotificationsToggle.checked) {
        console.log('Notifications Enabled');
    } else {
        console.log('Notifications Disabled');
    }
});

// Handle "Allow Data Sharing" buttons
const allowDataSharingYes = document.getElementById('allowDataSharingYes');
const allowDataSharingNo = document.getElementById('allowDataSharingNo');

allowDataSharingYes.addEventListener('click', () => {
    allowDataSharingYes.classList.add('btn-primary');
    allowDataSharingNo.classList.remove('btn-primary');
    allowDataSharingNo.classList.add('btn-secondary');
    console.log('Data Sharing Allowed: Yes');
});

allowDataSharingNo.addEventListener('click', () => {
    allowDataSharingNo.classList.add('btn-primary');
    allowDataSharingYes.classList.remove('btn-primary');
    allowDataSharingYes.classList.add('btn-secondary');
    console.log('Data Sharing Allowed: No');
});

// Handle "Allow Data Sharing" toggle
const allowDataSharingToggle = document.getElementById('allowDataSharing');
allowDataSharingToggle.addEventListener('change', () => {
    if (allowDataSharingToggle.checked) {
        console.log('Data Sharing Allowed');
    } else {
        console.log('Data Sharing Disallowed');
    }
});

// Handle dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');

// Check saved dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedSettings = JSON.parse(localStorage.getItem('userSettings'));
    if (savedSettings && savedSettings.theme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Listen for dark mode toggle changes
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            saveThemePreference('dark');
        } else {
            document.body.classList.remove('dark-mode');
            saveThemePreference('light');
        }
    });
});

