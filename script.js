// Signup Page
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!fullName || !email || !password || !confirmPassword) {
        document.getElementById("message").textContent = "All fields are mandatory.";
    } else if (password !== confirmPassword) {
        document.getElementById("message").textContent = "Passwords do not match.";
    } else {
        const accessToken = generateRandomToken(16);
        const user = {
            fullName,
            email,
            accessToken
        };
        localStorage.setItem("user", JSON.stringify(user));
        document.getElementById("message").textContent = "Signup successful!";
        document.getElementById("message").style.color = "green";
        setTimeout(function () {
            window.location.href = "profile.html";
        }, 1000);
    }
});

// Profile Page
document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.accessToken) {
        window.location.href = "index.html";
    } else {
        document.getElementById("fullName").textContent = user.fullName;
        document.getElementById("email").textContent = user.email;
    }
});

// Logout
document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location.href = "index.html";
});

function generateRandomToken(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    return token;
}
