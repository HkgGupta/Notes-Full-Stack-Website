// auth.js
let yourToken = '';

// Encode a string using Base64
function encodeBase64(text) {
    return btoa(text);
}

// Decode a Base64-encoded string
function decodeBase64(encodedText) {
    try {
        return atob(encodedText);
    } catch (error) {
        console.error('Decoding Error:', error);
        throw error;
    }
}

function setToken(token) {
    // encode token
    yourToken = encodeBase64(token);
    // save encoded token to localstorage
    localStorage.setItem('user', yourToken);
}

function getToken() {
    // get encoded token from localstorage
    const encodedToken = localStorage.getItem('user');
    if (!encodedToken) {
        // Redirect to the login page if token does not exist
        window.location.href = 'login.html';
    }
    // decode token
    return decodeBase64(encodedToken);
}

export { setToken, getToken };
