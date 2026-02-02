// Constants
const DRIVE_URL = 'https://drive.google.com/drive/folders/1Uh0C6Fz5GwB-LrWESptjTtpynWWqWEXR?usp=sharing';
const MAX_NAME_LENGTH = 20;
const UNLOCK_ANIMATION_DELAY = 1100; // milliseconds

// DOM elements
const greetingEl = document.getElementById('greeting');
const checkboxEl = document.getElementById('confirm-checkbox');
const buttonEl = document.getElementById('unlock-button');
const errorMessageEl = document.getElementById('error-message');

// Parse and sanitize name from URL query params
function getNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (!name) {
        return null;
    }

    // Sanitize: trim, limit length, allow only letters, spaces, and hyphens
    const sanitized = name
        .trim()
        .slice(0, MAX_NAME_LENGTH)
        .replace(/[^a-zA-Z\s-]/g, '');

    // If sanitization removed everything or result is empty, fallback
    if (!sanitized || sanitized.length === 0) {
        return 'there';
    }

    return sanitized;
}

// Escape HTML to prevent XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Initialize greeting
function initGreeting() {
    const name = getNameFromURL();

    if (name) {
        greetingEl.textContent = `Hey ${escapeHTML(name)}!`;
    }
}

// Enable/disable button based on checkbox state
function updateButtonState() {
    if (checkboxEl.checked) {
        buttonEl.disabled = false;
    } else {
        buttonEl.disabled = true;
    }

    // Clear error message when checkbox is checked
    if (checkboxEl.checked) {
        errorMessageEl.textContent = '';
    }
}

// Handle unlock button click
function handleUnlockClick() {
    // Check if checkbox is checked
    if (!checkboxEl.checked) {
        errorMessageEl.textContent = 'One tiny step first: please check the box to confirm.';
        checkboxEl.focus();
        return;
    }

    // Clear error message
    errorMessageEl.textContent = '';

    // Update button state to "unlocking"
    buttonEl.classList.add('unlocking');
    buttonEl.querySelector('.button-text').textContent = 'Unlocking…';
    buttonEl.disabled = true;

    // Add unlocking class to body for lock animation
    document.body.classList.add('unlocking');

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = prefersReducedMotion ? 100 : UNLOCK_ANIMATION_DELAY;

    // After animation, update to "unlocked" state and redirect
    setTimeout(() => {
        buttonEl.classList.remove('unlocking');
        buttonEl.classList.add('unlocked');
        buttonEl.querySelector('.button-text').textContent = 'Unlocked. Redirecting…';

        // Redirect after a brief moment
        setTimeout(() => {
            window.location.href = DRIVE_URL;
        }, 300);
    }, delay);
}

// Event listeners
checkboxEl.addEventListener('change', updateButtonState);
buttonEl.addEventListener('click', handleUnlockClick);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initGreeting();
    updateButtonState();
});
